"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = require("body-parser");
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
var swagger_json_1 = __importDefault(require("./swagger.json"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var cors_1 = __importDefault(require("cors"));
var express_rate_limit_1 = require("express-rate-limit");
var Auth_1 = __importDefault(require("./Routes/Auth"));
var Chart_1 = __importDefault(require("./Routes/Chart"));
var SwaggerDoc_1 = __importDefault(require("./Routes/SwaggerDoc"));
var authMiddleware_1 = __importDefault(require("./middleware/authMiddleware"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT;
var db_connection_url = process.env.DB_URL || "";
mongoose_1.default.connect(db_connection_url);
var limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 1 * 60 * 1000,
    limit: 1000,
    standardHeaders: "draft-7",
    legacyHeaders: false,
});
app.use((0, body_parser_1.urlencoded)({ limit: "50mb", extended: true }));
app.use((0, body_parser_1.json)({ limit: "50mb" }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(limiter);
app.use("/api/auth", Auth_1.default);
app.use("/api/chart", authMiddleware_1.default, Chart_1.default);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use("/api-docs-config", SwaggerDoc_1.default);
app.listen(port, function () {
    // logger.info(`⚡️[server]: Server is running at http://localhost:${port}`);
});
app.get("/", function (req, res) {
    // logger.info(`Test log message! ${process.env.OWN_API_URL}`);
    res.send("Express + TypeScript Server v0.0.10");
});
