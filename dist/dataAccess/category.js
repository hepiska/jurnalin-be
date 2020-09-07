"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("models");

const accountDa = {
  create: data => {
    return _models.mongo.category.create(data).then(res => {
      return res ? res.toObject() : null;
    });
  },
  update: (q, data) => {
    return _models.mongo.category.findOneAndUpdate(q, { ...data
    }, {
      new: true,
      upsert: true
    });
  },
  delete: _id => {
    return _models.mongo.category.deleteById(_id);
  },
  findOneByID: _id => {
    const condition = {
      _id
    };
    return _models.mongo.category.findOne(condition).then(res => res ? res.toObject() : null);
  },
  find: async (query, {
    skip = 0,
    limit = 15,
    sort
  }, fields) => {
    const total = await _models.mongo.category.find(query, fields).countDocuments();
    const categories = await _models.mongo.category.find(query, fields, {
      skip,
      limit,
      sort
    });
    return {
      total,
      categories
    };
  },
  findOne: async query => {
    const city = await _models.mongo.category.findOne(query).then(res => res ? res.toObject() : null);
    return city;
  }
};
var _default = accountDa;
exports.default = _default;