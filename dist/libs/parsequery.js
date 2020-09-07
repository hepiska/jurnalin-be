"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseQueryString = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _helpers = require("libs/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const QSkipLimitSchema = _joi.default.object().keys({
  search: _joi.default.string(),
  skip: _joi.default.number().default(0),
  limit: _joi.default.number().default(10),
  sort: _joi.default.string()
});

const parseQueryString = async (req, res, next) => {
  try {
    const {
      skip,
      limit,
      sort,
      search
    } = await _joi.default.validate(req.query, QSkipLimitSchema, {
      stripUnknown: true
    });
    const query = (0, _helpers.stringToQueryObj)(search);
    const sortParsed = (0, _helpers.parseSort)(sort);
    const qObj = {
      skip,
      limit,
      sort: sortParsed,
      query
    };
    req.qObj = qObj;
    return next();
  } catch (error) {
    return next();
  }
};

exports.parseQueryString = parseQueryString;