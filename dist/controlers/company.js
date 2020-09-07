"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jwt = require("libs/jwt");

var _company = _interopRequireDefault(require("dataAccess/company"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const companySchema = _joi.default.object().keys({
  user: _joi.default.string().email({
    minDomainSegments: 2
  }).required(),
  status: _joi.default.string(),
  name: _joi.default.string().min(1).required()
});

const companyControler = {
  post: async (req, res, next) => {
    try {
      const validatedInput = await _joi.default.validate(req.body, companySchema, {
        stripUnknown: true
      });
      const company = await _company.default.create({ ...validatedInput,
        user: req.user._id
      });
      return res.json({
        message: "create article company",
        company
      });
    } catch (error) {
      return next(error);
    }
  },
  put: async (req, res, next) => {
    try {
      const validatedInput = await _joi.default.validate(req.body, companySchema, {
        stripUnknown: true
      });
      const company = await _company.default.update({
        _id: req.params.id
      }, { ...validatedInput,
        user: req.user._id
      });
      return res.json({
        message: "update article company",
        company
      });
    } catch (error) {
      return next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const company = await _company.default.delete(req.params.id);
      return res.json({
        message: "update article company",
        company
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
      const companies = await _company.default.find(query, {
        skip,
        limit,
        sort
      });
      return res.json(companies);
    } catch (error) {
      return next(error);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const companies = await _company.default.findOneByID(req.params.id);
      return res.json(companies);
    } catch (error) {
      return next(error);
    }
  }
};
var _default = companyControler;
exports.default = _default;