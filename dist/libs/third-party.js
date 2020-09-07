"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.finpayTransaction = exports.finpayGenerateSignature = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _qs = _interopRequireDefault(require("qs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const telkomapiKei = process.env.TELKOMAPI_KEI;

const finpayGenerateSignature = data => {
  const parseData = _qs.default.stringify(data);

  return (0, _axios.default)({
    url: "https://api.thebigbox.id/finpay/2.0.1-sandbox/generate",
    method: "POST",
    data: parseData,
    headers: {
      "x-api-key": telkomapiKei,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

exports.finpayGenerateSignature = finpayGenerateSignature;

const finpayTransaction = data => {
  const parseData = _qs.default.stringify(data);

  return (0, _axios.default)({
    url: "https://api.thebigbox.id/finpay/2.0.1-sandbox",
    method: "POST",
    data: parseData,
    headers: {
      "x-api-key": telkomapiKei,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

exports.finpayTransaction = finpayTransaction;