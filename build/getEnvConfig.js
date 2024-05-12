"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnableLogs = exports.getLogHostName = exports.getApplicationName = exports.getDataDogAppKey = exports.getLogLevel = exports.getEnv = void 0;
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var ENV = process.env.ENV || "DEV";
var getEnv = function () {
    return ENV;
};
exports.getEnv = getEnv;
var getLogLevel = function () {
    return process.env.LOG_LEVEL || "info";
};
exports.getLogLevel = getLogLevel;
var getDataDogAppKey = function () {
    return process.env["DATADOG_APP_KEY_".concat(ENV)] || "";
};
exports.getDataDogAppKey = getDataDogAppKey;
var getApplicationName = function () {
    return "".concat(process.env.APPLICATION_NAME || "", "_").concat(ENV);
};
exports.getApplicationName = getApplicationName;
var getLogHostName = function () {
    if (ENV === "PROD" || ENV === "QA") {
        return "cloud_".concat(ENV);
    }
    if (ENV === "DEV") {
        return "localhost_".concat(ENV);
    }
    return "localhost";
};
exports.getLogHostName = getLogHostName;
var getEnableLogs = function () {
    if (process.env.DATADOG_ENABLED_LOGS === "true") {
        return true;
    }
    return false;
};
exports.getEnableLogs = getEnableLogs;
