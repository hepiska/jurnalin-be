"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorMidleware = void 0;
const ENV = process.env.NODE_ENV;

const errorMidleware = (err, req, res, next) => {
  if (!err) {
    return next;
  }

  err.stack = ENV.toLowerCase() === "production" ? () => {} : err.stack;
  return res.status(err.statusCode || 500).json({
    time: new Intl.DateTimeFormat(["en"], {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timezone: "Asia/Jakarta",
      timezoneName: "short"
    }).format(new Date()),
    message: err.message,
    stack: err.stack
  });
};

exports.errorMidleware = errorMidleware;