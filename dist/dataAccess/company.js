"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("models");

const companyDA = {
  create: data => {
    return _models.mongo.company.create(data).then(res => {
      return res ? res.toObject() : null;
    });
  },
  update: (q, data) => {
    return _models.mongo.company.findOneAndUpdate(q, { ...data
    }, {
      new: true,
      upsert: true
    });
  },
  delete: _id => {
    return _models.mongo.company.deleteById(_id);
  },
  findOneByID: _id => {
    const condition = {
      _id
    };
    return _models.mongo.company.findOne(condition).then(res => res ? res.toObject() : null);
  },
  find: async (query, {
    skip = 0,
    limit = 15,
    sort
  }, fields) => {
    const total = await _models.mongo.company.find(query, fields).countDocuments();
    const companies = await _models.mongo.company.find(query, fields, {
      skip,
      limit,
      sort
    });
    return {
      total,
      companies
    };
  },
  findOne: async query => {
    const city = await _models.mongo.company.findOne(query).then(res => res ? res.toObject() : null);
    return city;
  }
};
var _default = companyDA;
exports.default = _default;