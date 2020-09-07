"use strict";

var _auth = _interopRequireDefault(require("controlers/auth"));

var _jwt = require("libs/jwt");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = express => new express.Router().post("/register", _auth.default.register).post("/login", _auth.default.login).post("/forget-password", _auth.default.forgetPassword).post("/reset-password", _auth.default.resetPassword).use(_jwt.reqUserFromToken).post("/sync/telegram", _auth.default.syncTelegram);