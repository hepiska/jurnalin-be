"use strict";

var _transaction = _interopRequireDefault(require("controlers/transaction"));

var _jwt = require("libs/jwt");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = express => new express.Router().get("/success", _transaction.default.success).get("/failed", _transaction.default.failed).get("/callback", _transaction.default.callback).use(_jwt.reqUserFromToken).post("", _transaction.default.post).post("/subcribe", _transaction.default.subcribe).put("/:id", _transaction.default.put).delete("/:id", _transaction.default.delete).get("/:id", _transaction.default.getOne).get("", _transaction.default.get);