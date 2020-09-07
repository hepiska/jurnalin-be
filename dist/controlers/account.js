"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _account = _interopRequireDefault(require("dataAccess/account"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const accountSchema = _joi.default.object().keys({
  name: _joi.default.string().required(),
  account_no: _joi.default.string().required(),
  desc: _joi.default.string(),
  action_type: _joi.default.string().required(),
  category: _joi.default.string().required()
});

const accountControllers = {
  post: async (req, res, next) => {
    try {
      const validatedInput = await _joi.default.validate(req.body, accountSchema, {
        stripUnknown: true
      });
      const account = await _account.default.create({ ...validatedInput
      });
      return res.json({
        message: "create account success",
        account
      });
    } catch (error) {
      return next(error);
    }
  },
  put: async (req, res, next) => {
    try {
      const validatedInput = await _joi.default.validate(req.body, accountSchema, {
        stripUnknown: true
      });
      const account = await _account.default.update({
        _id: req.params.id
      }, { ...validatedInput
      });
      return res.json({
        message: "update account success",
        account
      });
    } catch (error) {
      return next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const account = await _account.default.delete(req.params.id);
      return res.json({
        message: "update account success",
        account
      });
    } catch (error) {
      return next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      const {
        skip,
        limit,
        sort,
        query
      } = req.qObj;
      const accounts = await _account.default.find(query, {
        skip,
        limit,
        sort
      });
      return res.json(accounts);
    } catch (error) {
      return next(error);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const account = await _account.default.findOneByID(req.params.id);
      return res.json(account);
    } catch (error) {
      return next(error);
    }
  }
};
var _default = accountControllers;
exports.default = _default;