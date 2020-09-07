"use strict";

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const controlers = {};

_fs.default.readdirSync(`${__dirname}/`).filter(file => file.indexOf(".js") >= 0 && file !== "index.js").forEach(control => {
  const controlerName = control.replace(".js", "").replace("-", "");

  const controlerFuntions = require(`${__dirname}/${control}`);

  controlers[controlerName] = controlerFuntions.default;
});

module.exports = controlers;