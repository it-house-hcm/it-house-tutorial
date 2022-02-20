import moment from "moment";
import winston from "winston";
import _ from "lodash";
import beautify from "json-beautify";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({ level: "error", filename: "logs/error.log" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.json(),
    winston.format.metadata({
      fillExcept: ["message", "level", "timestamp", "label", "stack", "_reqId"],
    }),
    winston.format.printf(
      ({ timestamp, stack, level, message, metadata, _reqId, ...info }) => {
        let msg = `[${moment(timestamp).format(
          "YYYY-MM-DD HH:mm:ss"
        )}][${level}]${_reqId ? `[${_reqId}]` : ""} ${message}`;
        if (!_.isEmpty(metadata)) {
          msg += `\n${beautify(metadata, null as any, 2, 120)}`;
        }
        if (stack) {
          msg += `\n${_.take(stack.split("\n"), 4).join("\n")}`;
        }
        return msg;
      }
    )
  ),
});

export default logger;
