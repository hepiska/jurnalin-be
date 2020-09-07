"use strict";

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dataAccess = {};

_fs.default.readdirSync(`${__dirname}/`).filter(file => file.indexOf(".js") >= 0 && file !== "index.js").forEach(access => {
  const accessName = access.replace(".js", "").replace("-", "");

  const accessFuntions = require(`${__dirname}/${access}`);

  dataAccess[accessName] = accessFuntions.default;
});

module.exports = dataAccess;