"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.reqUserFromToken = exports.decodeJwt = exports.verifyJwt = exports.signJwt = void 0;

var _user = _interopRequireDefault(require("dataAccess/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const jwt = require("jsonwebtoken");

const signJwt = data => {
  return jwt.sign({ ...data
  }, process.env.SECRET);
};

exports.signJwt = signJwt;

const verifyJwt = token => jwt.verify(token, process.env.SECRET);

exports.verifyJwt = verifyJwt;

const decodeJwt = token => jwt.decode(token);

exports.decodeJwt = decodeJwt;

const reqUserFromToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization || req.headers.Authorization;
    let user = verifyJwt(token);
    user = await _user.default.findOneByID(user._id);
    req.user = user;
    return next();
  } catch (err) {
    const error = new Error(err);
    error.statusCode = 401;
    return next(error);
  }
};

exports.reqUserFromToken = reqUserFromToken;
var _default = jwt;
exports.default = _default;