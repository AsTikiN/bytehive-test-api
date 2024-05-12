"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPayloadFromToken = exports.generateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var secretKey = "O27cu0XqK2";
var generateToken = function (payload, expiresIn) {
    return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: expiresIn, algorithm: "HS256" });
};
exports.generateToken = generateToken;
var extractPayloadFromToken = function (token) {
    try {
        var decoded = jsonwebtoken_1.default.verify(token, secretKey);
        return decoded;
    }
    catch (err) {
        return null;
    }
};
exports.extractPayloadFromToken = extractPayloadFromToken;
