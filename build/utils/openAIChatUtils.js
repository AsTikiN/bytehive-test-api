"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAllChapters = exports.generateChapterTopic = exports.REgenerateChapterContent = void 0;
var countWords_1 = require("../lib/countWords");
var aws_1 = require("../lib/aws");
var ChapterService = __importStar(require("../services/Chapter"));
var __1 = require("..");
var sanitize_1 = require("../lib/sanitize");
var string_1 = require("../lib/string");
var sentry_1 = require("../lib/sentry");
var CHAPTER_MODEL = "gpt-3.5-turbo";
// REGENERATE
var REgenerateChapterContent = function (_a) {
    var chapters = _a.chapters, chapterIndex = _a.chapterIndex, tone = _a.tone;
    return __awaiter(void 0, void 0, void 0, function () {
        var promises, j, topicPromise, results, content;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    promises = [];
                    j = 0;
                    _b.label = 1;
                case 1:
                    if (!(j < chapters[chapterIndex].topicNames.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, (0, exports.generateChapterTopic)({
                            chaptersListJson: JSON.stringify(chapters),
                            tone: tone,
                            topic: chapters[chapterIndex].topicNames[j].name,
                        })];
                case 2:
                    topicPromise = _b.sent();
                    promises.push(topicPromise);
                    _b.label = 3;
                case 3:
                    j++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, Promise.all(promises.map(function (promiseFn) { return promiseFn(); }))];
                case 5:
                    results = _b.sent();
                    content = results.reduce(function (acc, el) { return acc + el.content; }, "");
                    return [2 /*return*/, content];
            }
        });
    });
};
exports.REgenerateChapterContent = REgenerateChapterContent;
var generateChapterTopic = function (_a) {
    var chaptersListJson = _a.chaptersListJson, tone = _a.tone, topic = _a.topic;
    return __awaiter(void 0, void 0, void 0, function () {
        var system_1, user_1, assistant_1, promise;
        return __generator(this, function (_b) {
            try {
                system_1 = "You are an award winning non-fiction author. You write books for people. You do not use transitional words or phrases. You do not use first, second, third. You do not make sections or headings. You do not make numbered sections. Refrain from self-referencing, and do not explain what you are doing. You never talk about the next chapter.";
                user_1 = "I need you to write the 500 word chapter topic \u201C".concat(topic, "\u201D in a ").concat(tone, " tone. Here is the book outline: '").concat(chaptersListJson, "'.");
                assistant_1 = "".concat(topic);
                promise = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var response, content;
                    var _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0: return [4 /*yield*/, __1.openai.chat.completions.create({
                                    messages: [
                                        { role: "system", content: system_1 },
                                        { role: "user", content: user_1 },
                                        { role: "assistant", content: assistant_1 },
                                    ],
                                    model: CHAPTER_MODEL,
                                })];
                            case 1:
                                response = _d.sent();
                                content = (0, string_1.removeAndCapitalize)(((_c = (_b = (_a = response === null || response === void 0 ? void 0 : response.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content) || "", sanitize_1.phrasesToRemove);
                                // const paraphrased = await getParaphrasedText(text);
                                // const content = `OPENAI: ${text} \n\n\n---------------\n\n\n REPHRASHED: ${paraphrased}`;
                                // console.log(content);
                                // console.log('=====================================');
                                return [2 /*return*/, {
                                        content: content,
                                    }];
                        }
                    });
                }); };
                return [2 /*return*/, promise];
            }
            catch (e) {
                __1.logger.error("error while generating topic " + topic, e);
                console.log(e);
            }
            return [2 /*return*/];
        });
    });
};
exports.generateChapterTopic = generateChapterTopic;
var generateAllChapters = function (_a) {
    var bookTitle = _a.bookTitle, tone = _a.tone, chapters = _a.chapters, bookId = _a.bookId, email = _a.email;
    return __awaiter(void 0, void 0, void 0, function () {
        var modifiedChapters, totalLength, i, promises, j, topicPromise, startTime, results, endTime, duration, content, id, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 11, , 12]);
                    modifiedChapters = __spreadArray([], chapters, true);
                    totalLength = 0;
                    i = 0;
                    _b.label = 1;
                case 1:
                    if (!(i < chapters.length)) return [3 /*break*/, 10];
                    promises = [];
                    j = 0;
                    _b.label = 2;
                case 2:
                    if (!(j < chapters[i].topicNames.length)) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, exports.generateChapterTopic)({
                            chaptersListJson: JSON.stringify(chapters),
                            tone: tone,
                            topic: chapters[i].topicNames[j].name,
                        })];
                case 3:
                    topicPromise = _b.sent();
                    promises.push(topicPromise);
                    _b.label = 4;
                case 4:
                    j++;
                    return [3 /*break*/, 2];
                case 5:
                    startTime = new Date();
                    return [4 /*yield*/, Promise.all(promises.map(function (promiseFn) { return promiseFn(); }))];
                case 6:
                    results = _b.sent();
                    endTime = new Date();
                    duration = ((endTime - startTime) / 1000).toFixed(2);
                    __1.logger.info("BOOK: ".concat(bookTitle, " ENDED chapter ").concat(i + 1, "/").concat(chapters.length, ", topics: ").concat(chapters[i].topicNames.length, " --- \u23F1\uFE0F  duration: ").concat(duration, "s"));
                    content = results.reduce(function (acc, el) { return acc + " " + el.content; }, "");
                    totalLength += (0, countWords_1.countWords)(content);
                    modifiedChapters[i] = __assign(__assign({}, modifiedChapters[i]), { content: [content], currentIndex: 0 });
                    id = "".concat(modifiedChapters[i]._id, "_0");
                    return [4 /*yield*/, (0, aws_1.uploadTxtToAws)(JSON.stringify((0, sanitize_1.sanitizeInput)(content)), id)];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, ChapterService.updateChapter(modifiedChapters[i]._id, { content: [id] })];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9:
                    i++;
                    return [3 /*break*/, 1];
                case 10: return [2 /*return*/, { modifiedChapters: modifiedChapters, totalLength: totalLength }];
                case 11:
                    e_1 = _b.sent();
                    console.log(e_1);
                    __1.logger.error("error while generating all contents " + bookId, e_1);
                    (0, sentry_1.sentryErrors)({
                        errorType: (0, sentry_1.getSentryGenerationError)(e_1.status),
                        details: {
                            email: email,
                            bookId: bookId,
                            bookName: bookTitle,
                        },
                    });
                    return [2 /*return*/, { modifiedChapters: [], totalLength: 0 }];
                case 12: return [2 /*return*/];
            }
        });
    });
};
exports.generateAllChapters = generateAllChapters;
