import winston, { createLogger, format, transports } from "winston";
import axios from "axios";
import Transport from "winston-transport";
import { getDataDogApiKey, getApplicationName, getLogHostName, getEnv, getEnableLogs } from "./getEnvConfig";
import DatadogWinston from "datadog-winston";

const DATADOG_API_KEY = getDataDogApiKey();
const APPLICATION_NAME = getApplicationName();
const LOG_HOST_NAME = getLogHostName();
const ENV = getEnv();
const ENABLE_LOGS = getEnableLogs();
const PATH = `/api/v2/logs?dd-api-key=${DATADOG_API_KEY}&ddsource=nodejs&service=${APPLICATION_NAME}`;

const httpTransportOptions = {
  host: "https://agent-http-intake.logs.us5.datadoghq.com",
  path: PATH,
  ssl: true,
  hostname: LOG_HOST_NAME,
  service: APPLICATION_NAME,
  ddsource: "nodejs",
  ddtags: `env:${ENV}`,
};

const { combine, timestamp, json, errors } = format;
const errorsFormat = errors({ stack: true });

const datadogTransporter = async (payload: any) => {
  if (ENABLE_LOGS === false) {
    return;
  }

  const { level, message, timestamp, metadata, sendLog } = payload;
  const messageDate = `[${APPLICATION_NAME}]${message}[${new Date().toISOString()}]`;

  // if (sendLog || level === "error" || level === "warn") {
  const data = [
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

  return axios
    .post(`${httpTransportOptions.host}${httpTransportOptions.path}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("Response on transport success", response);
    })
    .catch((error) => {
      console.log("Error on transport", error);
    });
  // }
};

class CustomTransport extends Transport {
  log(payload: any, cb: any) {
    //Call datadog messages
    datadogTransporter(payload);
    cb(null);
  }
}

const logFormat = winston.format.printf(({ level, message }) => {
  return `${level}: ${message}`;
});

const logger = createLogger({
  level: "info",
  exitOnError: false,
  format: json(),
  transports: [
    new transports.Console({ format: winston.format.combine(winston.format.colorize(), logFormat) }),
    new DatadogWinston({
      apiKey: process.env.DATADOG_API_KEY || "",
      service: "booklab-local",
    }),

    new CustomTransport({
      format: combine(timestamp(), json(), errorsFormat),
    }),
  ],
});

export { logger };
