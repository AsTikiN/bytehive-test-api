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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUsers = exports.getUsersStatData = exports.getUserById = exports.getUserByQuery = exports.updateUser = exports.createUser = void 0;
var User_1 = __importDefault(require("../../models/User"));
var createUser = function (userData) { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User_1.default.create(__assign(__assign({}, userData), { lastActiveDate: "test message" }))];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                error_1 = _a.sent();
                throw new Error("Failed to create user");
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
var updateUser = function (userId, updates) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedUser, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User_1.default.findByIdAndUpdate(userId, updates, { new: true })];
            case 1:
                updatedUser = _a.sent();
                if (!updatedUser) {
                    throw new Error("User not found");
                }
                return [2 /*return*/, updatedUser];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                throw new Error("Failed to update user");
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var getUserByQuery = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User_1.default.findOne(query)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                error_3 = _a.sent();
                throw new Error("Failed to fetch user by email");
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserByQuery = getUserByQuery;
var getUserById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User_1.default.findById(id)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                error_4 = _a.sent();
                throw new Error("Failed to fetch user by id");
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserById = getUserById;
var getUsersStatData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User_1.default.aggregate([
                        {
                            $facet: {
                                isWhopUserTrue: [{ $match: { isWhopUser: true } }, { $count: "whop" }],
                                isGoogleUserTrue: [{ $match: { isGoogleUser: true } }, { $count: "google" }],
                                isWhopUserFalse: [{ $match: { isWhopUser: false, isGoogleUser: false } }, { $count: "regular" }],
                                total: [{ $count: "total" }],
                            },
                        },
                        {
                            $project: {
                                whop: { $ifNull: [{ $arrayElemAt: ["$isWhopUserTrue.whop", 0] }, 0] },
                                google: { $ifNull: [{ $arrayElemAt: ["$isGoogleUserTrue.google", 0] }, 0] },
                                regular: { $ifNull: [{ $arrayElemAt: ["$isWhopUserFalse.regular", 0] }, 0] },
                                total: { $ifNull: [{ $arrayElemAt: ["$total.total", 0] }, 0] },
                            },
                        },
                    ])];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result[0]];
            case 2:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUsersStatData = getUsersStatData;
var searchUsers = function (search, page, limit, sort) { return __awaiter(void 0, void 0, void 0, function () {
    var skip, fullNameSearch, query, pipeline, sortDirection, users, totalUsersCount, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                skip = (page - 1) * limit;
                fullNameSearch = new RegExp(search.split(" ").join(""), "i");
                query = {
                    $or: [
                        { email: new RegExp(search, "i") },
                        { firstName: new RegExp(search, "i") },
                        { lastName: new RegExp(search, "i") },
                        {
                            $expr: {
                                $regexMatch: { input: { $concat: ["$firstName", "$lastName"] }, regex: fullNameSearch },
                            },
                        },
                        {
                            $expr: {
                                $regexMatch: { input: { $toString: "$_id" }, regex: new RegExp(search, "i") },
                            },
                        },
                    ],
                };
                pipeline = [
                    { $match: query },
                    {
                        $project: {
                            _id: 1,
                            firstName: 1,
                            lastName: 1,
                            email: 1,
                            balance: 1,
                            spent: 1,
                            bookAmount: 1,
                            limits: 1,
                        },
                    },
                    {
                        $lookup: {
                            from: "books",
                            localField: "books",
                            foreignField: "_id",
                            as: "userBooks",
                        },
                    },
                    {
                        $addFields: {
                            completedBooksCount: {
                                $size: {
                                    $filter: {
                                        input: "$userBooks",
                                        as: "book",
                                        cond: {
                                            $or: [{ $eq: ["$$book.status", "Completed"] }, { $eq: ["$$book.status", "Failed"] }],
                                        },
                                    },
                                },
                            },
                            incompleteBooksCount: {
                                $size: {
                                    $filter: {
                                        input: "$userBooks",
                                        as: "book",
                                        cond: {
                                            $not: {
                                                $or: [{ $eq: ["$$book.status", "Completed"] }, { $eq: ["$$book.status", "Failed"] }],
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    { $skip: skip },
                    { $limit: Number(limit) },
                ];
                sortDirection = !sort || sort.isAscending ? -1 : 1;
                if (!sort) {
                    pipeline.push({ $sort: { _id: sortDirection } });
                }
                else if (sort.sortBy === "balance") {
                    pipeline.push({ $sort: { balance: sortDirection } });
                }
                else if (sort.sortBy === "complete") {
                    pipeline.push({ $sort: { completedBooksCount: sortDirection } });
                }
                else if (sort.sortBy === "incomplete") {
                    pipeline.push({ $sort: { incompleteBooksCount: sortDirection } });
                }
                return [4 /*yield*/, User_1.default.aggregate(pipeline)];
            case 1:
                users = _a.sent();
                return [4 /*yield*/, User_1.default.countDocuments(query)];
            case 2:
                totalUsersCount = _a.sent();
                return [2 /*return*/, { users: users, totalUsersCount: totalUsersCount }];
            case 3:
                e_2 = _a.sent();
                console.log(e_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.searchUsers = searchUsers;
