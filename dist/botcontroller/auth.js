"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleStart = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jwt = require("libs/jwt");

var _user = _interopRequireDefault(require("dataAccess/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const web_uri = process.env.WEB_URI;

const handleStart = async (from, message) => {
  try {
    const userBytelegram = await _user.default.findOne({
      telegram: from.id
    });

    if (!userBytelegram) {
      return `${web_uri}/auth?telegram=${from.id}`;
    }

    return "selamat datang kembali silahkan mulai transaksi";
  } catch (error) {
    throw error;
  }
};

exports.handleStart = handleStart;