import OpenAIApi from "openai";
import { logger } from "..";
import { calcOutlinePrice, pricesConfig } from "../pricesConfig";

const OUTLINE_MODEL = "gpt-3.5-turbo";
const API_KEY = "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";

const openai = new OpenAIApi({
  apiKey: API_KEY,
});

interface GenerateOutlineProps {
  chaptersNum: number;
  topicsNum: number;
  description: string;
  tone: string;
  title: string;
}

export const generateOutlineUtils = async ({
  chaptersNum,
  topicsNum,

  description,
  tone,
  title,
}: GenerateOutlineProps) => {
  const system = `You need to write a professional-style book. Book title is ${title}. Prepare list of ${chaptersNum} chapters that contains chapter title (up to 50 characters) on the subject of ${description} write in ${tone} tone with ${chaptersNum} chapters that cover unique themes or topics without repeating information from previous chapters. Also each chapter should contain a list that consist from ${topicsNum} topic names that will follow all the chapter. Example of response in json format:[{ "title": "The Magic of Leadership", subtitle: "Unveiling the Artistry and Alchemy of Effective Leadership", description: "In "The Magic of Leadership," readers delve into the intricate craft of effective leadership, uncovering the artistry and alchemy that underpin extraordinary leadership journeys. Through compelling narratives and actionable insights, this chapter illuminates the essential qualities and strategies that empower leaders to inspire, innovate, and transform organizations and communities.", "topicNames": [{"name": "The Role of a QA Leader"}, {"name": "Building Trust in Your Team"}] }]`;

  const response = await openai.chat.completions.create({
    messages: [{ role: "system", content: system }],
    model: OUTLINE_MODEL,
    temperature: 0,
  });

  logger.info(
    "⚡️ GENERATED OUTLINE for book ",
    title,
    ` CHARGED - ${calcOutlinePrice({ topicsNum, chaptersNum })} REAL COST - ${response.usage?.total_tokens}`,
  );

  const { prompt_tokens, total_tokens, completion_tokens } = response?.usage || {};

  return {
    outline: response?.choices?.[0]?.message?.content?.replace(/(\r\n|\n|\r)/gm, "") || "",
    price: {
      creditsPrice: topicsNum * pricesConfig.topic + chaptersNum * pricesConfig.chapter,
      openAI: total_tokens || 0,
      openAIPrompt: prompt_tokens || 0,
      openAIResponse: completion_tokens || 0,
    },
  };
};
