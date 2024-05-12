"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = require("../lib/tokens");
var authMiddleware = function (req, res, next) {
    var _a;
    try {
        var token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        if (!token) {
            res.status(401).json({ message: "Access denied. Token not provided." });
            return;
        }
        var decoded = (0, tokens_1.extractPayloadFromToken)(token);
        req.id = decoded.id;
        if (!req.id) {
            res.status(401).json({ message: "Access denied. Incorrect token." });
            return;
        }
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid token." });
    }
};
exports.default = authMiddleware;
