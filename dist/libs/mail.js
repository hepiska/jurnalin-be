"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendMail = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _qs = _interopRequireDefault(require("qs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sendMail = ({
  subject,
  message,
  recipient
}) => {
  const data = _qs.default.stringify({
    subject,
    message,
    recipient
  });

  return (0, _axios.default)({
    url: "https://api.thebigbox.id/mail-sender/0.0.1/mails",
    method: "POST",
    data,
    headers: {
      "x-api-key": "HKysFy8NzW6lU11DAfXLqt2U4WQisIqQ",
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

exports.sendMail = sendMail;