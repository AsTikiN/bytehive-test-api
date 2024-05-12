import { Chapter } from "../Routes/Book";
import { countWords } from "../lib/countWords";
import { uploadTxtToAws } from "../lib/aws";
import * as ChapterService from "../services/Chapter";
import { ObjectId } from "mongodb";
import { logger, openai } from "..";
import { IPrice } from "../types/Price";
import { phrasesToRemove, sanitizeInput } from "../lib/sanitize";
import { removeAndCapitalize } from "../lib/string";
import { getSentryGenerationError, sentryErrors } from "../lib/sentry";

const CHAPTER_MODEL = "gpt-3.5-turbo";

interface GenerateAllChaptersParams {
  bookTitle: string;
  tone: string;
  chapters: Chapter[];
  bookId: string;
  email: string;
}

interface GenerateSingleChapterParams {
  chapters: Chapter[];
  chapterIndex: number;
  tone: string;
}

interface GenerateSingleTopicParams {
  chaptersListJson: string;
  tone: string;
  topic: string;
}

// REGENERATE
export const REgenerateChapterContent = async ({ chapters, chapterIndex, tone }: GenerateSingleChapterParams) => {
  const promises = [];

  for (let j = 0; j < chapters[chapterIndex].topicNames.length; j++) {
    const topicPromise = await generateChapterTopic({
      chaptersListJson: JSON.stringify(chapters),
      tone,
      topic: chapters[chapterIndex].topicNames[j].name,
    });

    promises.push(topicPromise);
  }

  const results: { content: string; price: IPrice }[] = await Promise.all(
    promises.map((promiseFn: any) => promiseFn()),
  );
  const content = results.reduce((acc, el) => acc + el.content, "");

  return content;
};

export const generateChapterTopic = async ({ chaptersListJson, tone, topic }: GenerateSingleTopicParams) => {
  try {
    const system = `You are an award winning non-fiction author. You write books for people. You do not use transitional words or phrases. You do not use first, second, third. You do not make sections or headings. You do not make numbered sections. Refrain from self-referencing, and do not explain what you are doing. You never talk about the next chapter.`;

    const user = `I need you to write the 500 word chapter topic “${topic}” in a ${tone} tone. Here is the book outline: '${chaptersListJson}'.`;

    const assistant = `${topic}`;

    const promise = async () => {
      const response = await openai.chat.completions.create({
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
          { role: "assistant", content: assistant },
        ],
        model: CHAPTER_MODEL,
      });

      const content = removeAndCapitalize(response?.choices?.[0]?.message?.content || "", phrasesToRemove);
      // const paraphrased = await getParaphrasedText(text);
      // const content = `OPENAI: ${text} \n\n\n---------------\n\n\n REPHRASHED: ${paraphrased}`;
      // console.log(content);
      // console.log('=====================================');
      return {
        content,
      };
    };

    return promise;
  } catch (e) {
    logger.error("error while generating topic " + topic, e);
    console.log(e);
  }
};

export const generateAllChapters = async ({ bookTitle, tone, chapters, bookId, email }: GenerateAllChaptersParams) => {
  try {
    const modifiedChapters = [...chapters];
    let totalLength = 0;

    for (let i = 0; i < chapters.length; i++) {
      const promises = [];

      for (let j = 0; j < chapters[i].topicNames.length; j++) {
        const topicPromise = await generateChapterTopic({
          chaptersListJson: JSON.stringify(chapters),
          tone,
          topic: chapters[i].topicNames[j].name,
        });

        promises.push(topicPromise);
      }

      const startTime = new Date();

      const results: { content: string; price: IPrice }[] = await Promise.all(
        promises.map((promiseFn: any) => promiseFn()),
      );

      const endTime = new Date();
      //eslint-disable-next-line
      // @ts-ignore
      const duration = ((endTime - startTime) / 1000).toFixed(2);
      logger.info(
        `BOOK: ${bookTitle} ENDED chapter ${i + 1}/${chapters.length}, topics: ${
          chapters[i].topicNames.length
        } --- ⏱️  duration: ${duration}s`,
      );

      const content = results.reduce((acc, el) => acc + " " + el.content, "");
      totalLength += countWords(content);
      modifiedChapters[i] = { ...modifiedChapters[i], content: [content], currentIndex: 0 } as any;
      const id = `${modifiedChapters[i]._id}_0`;

      await uploadTxtToAws(JSON.stringify(sanitizeInput(content)), id);
      await ChapterService.updateChapter(modifiedChapters[i]._id as ObjectId, { content: [id] });
    }

    return { modifiedChapters, totalLength };
  } catch (e: any) {
    console.log(e);
    logger.error("error while generating all contents " + bookId, e);

    sentryErrors({
      errorType: getSentryGenerationError(e.status),
      details: {
        email,
        bookId,
        bookName: bookTitle,
      },
    });

    return { modifiedChapters: [], totalLength: 0 };
  }
};
