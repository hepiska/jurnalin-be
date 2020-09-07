"use strict";

var _account = _interopRequireDefault(require("controlers/account"));

var _jwt = require("libs/jwt");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = express => new express.Router().use(_jwt.reqUserFromToken).post("", _account.default.post).put("/:id", _account.default.put).delete("/:id", _account.default.delete).get("/:id", _account.default.getOne).get("", _account.default.get);