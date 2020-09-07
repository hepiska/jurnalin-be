"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jwt = require("libs/jwt");

var _user = _interopRequireDefault(require("dataAccess/user"));

var _shortid = _interopRequireDefault(require("shortid"));

var _mail = require("../libs/mail");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const web_uri = process.env.WEB_URI;
const saltRounds = Number(process.env.SALTROUND); // import { user as userDa } from "dataAccess"

const registerSchema = _joi.default.object().keys({
  email: _joi.default.string().email({
    minDomainSegments: 2
  }).required(),
  password: _joi.default.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  name: _joi.default.string().min(1).required()
});

const loginSchema = _joi.default.object().keys({
  email: _joi.default.string().email({
    minDomainSegments: 2
  }).required(),
  password: _joi.default.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
});

const userControler = {
  register: async (req, res, next) => {
    try {
      await _joi.default.validate(req.body, registerSchema, {
        stripUnknown: true
      });
      const userData = { ...req.body
      };
      const user = await _user.default.create(userData);
      Reflect.deleteProperty(user, "password");
      const token = (0, _jwt.signJwt)(user);
      return res.json({
        token
      });
    } catch (error) {
      return next(error);
    }
  },
  syncTelegram: async (req, res, next) => {
    try {
      const {
        user
      } = req;

      if (!req.body.telegram) {
        throw new Error("there is no telegram");
      }

      const checktele = await _user.default.find({
        telegram: req.body.telegram
      }, {
        skip: 0,
        limit: 5
      });

      if (checktele.total) {
        throw new Error("telegram telah di gunakan oleh akun lain");
      }

      const userRes = await _user.default.findOneByID(user._id);
      await _user.default.update({
        _id: userRes._id
      }, { ...userRes,
        telegram: req.body.telegram
      });
      return res.json({
        message: "menghubungkan telegram berhasil"
      });
    } catch (error) {
      return next(error);
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      if (!req.body.password || !req.body.email) {
        throw new Error("email atau password kosong");
      }

      const user = await _user.default.findOneByEmail(req.body.email);

      const isPasswordMatch = _bcryptjs.default.compareSync(req.body.oldPassword, user.password);

      if (!isPasswordMatch) {
        throw new Error("ups ada masalah");
      }

      const hashpassword = _bcryptjs.default.hashSync(req.body.password, saltRounds);

      await _user.default.update({
        _id: user._id
      }, { ...user,
        password: hashpassword
      });
      return res.json({
        message: "ganti password berhasil"
      });
    } catch (error) {
      return next(error);
    }
  },
  forgetPassword: async (req, res, next) => {
    try {
      if (!req.body.email) {
        throw new Error("email kosong");
      }

      const user = await _user.default.findOneByEmail(req.body.email);

      if (!user) {
        throw new Error("tidak ada user dengan email ini");
      }

      const newPassword = _shortid.default.generate();

      const hashpassword = _bcryptjs.default.hashSync(newPassword, saltRounds);

      await _user.default.update({
        _id: user._id
      }, { ...user,
        password: hashpassword
      });
      await (0, _mail.sendMail)({
        recipient: user.email,
        subject: "reset password",
        message: `open this link to reset password ${web_uri}/reset-password?password=${newPassword}&email=${user.email}`
      });
      return res.json({
        message: "kami telah mengirimkan email"
      });
    } catch (error) {
      return next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      await _joi.default.validate(req.body, loginSchema, {
        stripUnknown: true
      });
      const loginData = { ...req.body
      };
      const user = await _user.default.findOneByEmail(loginData.email);

      if (!user) {
        throw new Error("email or password un match");
      }

      const isPasswordMatch = _bcryptjs.default.compareSync(loginData.password, user.password);

      console.log(loginData.password, user.password, isPasswordMatch);

      if (!isPasswordMatch) {
        throw new Error("email or password un match");
      }

      Reflect.deleteProperty(user, "password");
      const token = (0, _jwt.signJwt)(user);
      return res.json({
        token
      });
    } catch (error) {
      return next(error);
    }
  }
};
var _default = userControler;
exports.default = _default;