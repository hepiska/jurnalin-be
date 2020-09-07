"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _category = _interopRequireDefault(require("dataAccess/category"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const categorySchema = _joi.default.object().keys({
  name: _joi.default.string().required().required(),
  possition: _joi.default.string().required()
});

const categoryControllers = {
  post: async (req, res, next) => {
    try {
      const validatedInput = await _joi.default.validate(req.body, categorySchema, {
        stripUnknown: true
      });
      const category = await _category.default.create({ ...validatedInput
      });
      return res.json({
        message: "create category success",
        category
      });
    } catch (error) {
      return next(error);
    }
  },
  put: async (req, res, next) => {
    try {
      const validatedInput = await _joi.default.validate(req.body, categorySchema, {
        stripUnknown: true
      });
      const category = await _category.default.update({
        _id: req.params.id
      }, { ...validatedInput
      });
      return res.json({
        message: "update category success",
        category
      });
    } catch (error) {
      return next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const category = await _category.default.delete(req.params.id);
      return res.json({
        message: "update category success",
        category
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
      const categories = await _category.default.find(query, {
        skip,
        limit,
        sort
      });
      return res.json(categories);
    } catch (error) {
      return next(error);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const category = await _category.default.findOneByID(req.params.id);
      return res.json(category);
    } catch (error) {
      return next(error);
    }
  }
};
var _default = categoryControllers;
exports.default = _default;