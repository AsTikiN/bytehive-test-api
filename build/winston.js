"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var winston_1 = __importStar(require("winston"));
var axios_1 = __importDefault(require("axios"));
var winston_transport_1 = __importDefault(require("winston-transport"));
var getEnvConfig_1 = require("./getEnvConfig");
var datadog_winston_1 = __importDefault(require("datadog-winston"));
var DATADOG_API_KEY = (0, getEnvConfig_1.getDataDogApiKey)();
var APPLICATION_NAME = (0, getEnvConfig_1.getApplicationName)();
var LOG_HOST_NAME = (0, getEnvConfig_1.getLogHostName)();
var ENV = (0, getEnvConfig_1.getEnv)();
var ENABLE_LOGS = (0, getEnvConfig_1.getEnableLogs)();
var PATH = "/api/v2/logs?dd-api-key=".concat(DATADOG_API_KEY, "&ddsource=nodejs&service=").concat(APPLICATION_NAME);
var httpTransportOptions = {
    host: "https://agent-http-intake.logs.us5.datadoghq.com",
    path: PATH,
    ssl: true,
    hostname: LOG_HOST_NAME,
    service: APPLICATION_NAME,
    ddsource: "nodejs",
    ddtags: "env:".concat(ENV),
};
var combine = winston_1.format.combine, timestamp = winston_1.format.timestamp, json = winston_1.format.json, errors = winston_1.format.errors;
var errorsFormat = errors({ stack: true });
var datadogTransporter = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var level, message, timestamp, metadata, sendLog, messageDate, data;
    return __generator(this, function (_a) {
        if (ENABLE_LOGS === false) {
            return [2 /*return*/];
        }
        level = payload.level, message = payload.message, timestamp = payload.timestamp, metadata = payload.metadata, sendLog = payload.sendLog;
        messageDate = "[".concat(APPLICATION_NAME, "]").concat(message, "[").concat(new Date().toISOString(), "]");
        data = [
            {
                level: level,
                message: messageDate,
                service: httpTransportOptions.service,
                metadata: metadata,
                ddsource: httpTransportOptions.ddsource,
                ddtags: httpTransportOptions.ddtags,
                timestamp: timestamp,
            },
        ];
        return [2 /*return*/, axios_1.default
                .post("".concat(httpTransportOptions.host).concat(httpTransportOptions.path), data, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(function (response) {
                console.log("Response on transport success", response);
            })
                .catch(function (error) {
                console.log("Error on transport", error);
            })];
    });
}); };
var CustomTransport = /** @class */ (function (_super) {
    __extends(CustomTransport, _super);
    function CustomTransport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomTransport.prototype.log = function (payload, cb) {
        //Call datadog messages
        datadogTransporter(payload);
        cb(null);
    };
    return CustomTransport;
}(winston_transport_1.default));
var logFormat = winston_1.default.format.printf(function (_a) {
    var level = _a.level, message = _a.message;
    return "".concat(level, ": ").concat(message);
});
var logger = (0, winston_1.createLogger)({
    level: "info",
    exitOnError: false,
    format: json(),
    transports: [
        new winston_1.transports.Console({ format: winston_1.default.format.combine(winston_1.default.format.colorize(), logFormat) }),
        new datadog_winston_1.default({
            apiKey: process.env.DATADOG_API_KEY || "",
            service: "booklab-local",
        }),
        new CustomTransport({
            format: combine(timestamp(), json(), errorsFormat),
        }),
    ],
});
exports.logger = logger;
