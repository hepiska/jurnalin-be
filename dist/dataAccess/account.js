"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("models");

const accountDa = {
  create: data => {
    return _models.mongo.account.create(data).then(res => {
      return res ? res.toObject() : null;
    });
  },
  update: (q, data) => {
    return _models.mongo.account.findOneAndUpdate(q, { ...data
    }, {
      new: true,
      upsert: true
    });
  },
  delete: _id => {
    return _models.mongo.account.deleteById(_id);
  },
  findOneByID: _id => {
    const condition = {
      _id
    };
    return _models.mongo.account.findOne(condition).then(res => res ? res.toObject() : null);
  },
  find: async (query, {
    skip = 0,
    limit = 15,
    sort
  }, fields) => {
    const total = await _models.mongo.account.find(query, fields).countDocuments();
    const accounts = await _models.mongo.account.find(query, fields, {
      skip,
      limit,
      sort
    });
    return {
      total,
      accounts
    };
  },
  findOne: async query => {
    const city = await _models.mongo.account.findOne(query).then(res => res ? res.toObject() : null);
    return city;
  }
};
var _default = accountDa;
exports.default = _default;