"use strict";

var _category = _interopRequireDefault(require("controlers/category"));

var _jwt = require("libs/jwt");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = express => new express.Router().use(_jwt.reqUserFromToken).post("", _category.default.post).put("/:id", _category.default.put).delete("/:id", _category.default.delete).get("/:id", _category.default.getOne).get("", _category.default.get);