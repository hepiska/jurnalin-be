"use strict";

var _company = _interopRequireDefault(require("controlers/company"));

var _jwt = require("libs/jwt");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = express => new express.Router().use(_jwt.reqUserFromToken).post("", _company.default.post).put("/:id", _company.default.put).delete("/:id", _company.default.delete).get("/:id", _company.default.getOne).get("", _company.default.get);