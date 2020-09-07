"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("models");

const TransactionDa = {
  create: data => {
    return _models.mongo.transaction.create(data).then(res => {
      return res ? res.toObject() : null;
    });
  },
  update: (q, data) => {
    return _models.mongo.transaction.findOneAndUpdate(q, { ...data
    }, {
      new: true,
      upsert: true
    });
  },
  delete: _id => {
    return _models.mongo.transaction.deleteById(_id);
  },
  findOneByID: _id => {
    const condition = {
      _id
    };
    return _models.mongo.transaction.findOne(condition).then(res => res ? res.toObject() : null);
  },
  find: async (query, {
    skip = 0,
    limit = 15,
    sort
  }, fields) => {
    const total = await _models.mongo.transaction.find(query, fields).countDocuments();
    const transaction = await _models.mongo.transaction.find(query, fields, {
      skip,
      limit,
      sort
    });
    return {
      total,
      transaction
    };
  },
  findOne: async query => {
    const city = await _models.mongo.transaction.findOne(query).then(res => res ? res.toObject() : null);
    return city;
  }
};
var _default = TransactionDa;
exports.default = _default;