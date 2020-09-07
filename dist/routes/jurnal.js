"use strict";

var _jurnal = _interopRequireDefault(require("controlers/jurnal"));

var _jwt = require("libs/jwt");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = express => new express.Router().use(_jwt.reqUserFromToken).post("", _jurnal.default.post).post("/penjualan", _jurnal.default.penjualan).post("/pembelian", _jurnal.default.pembelian).get("/user", _jurnal.default.userjurnal).get("/total-accounts", _jurnal.default.totalaccounts).put("/:id", _jurnal.default.put).delete("/:id", _jurnal.default.delete).get("/:id", _jurnal.default.getOne).get("", _jurnal.default.get);