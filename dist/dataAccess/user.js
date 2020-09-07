"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("models");

const userDA = {
  create: data => {
    return _models.mongo.user.create(data).then(res => {
      return res ? res.toObject() : null;
    });
  },
  update: (q, data) => {
    return _models.mongo.user.findOneAndUpdate(q, { ...data
    }, {
      new: true,
      upsert: true
    });
  },
  delete: _id => {
    return _models.mongo.user.deleteById(_id);
  },
  findOneByEmail: email => {
    const condition = {
      email
    };
    return _models.mongo.user.findOne(condition).then(res => res ? res.toObject() : null);
  },
  findOneByID: _id => {
    const condition = {
      _id
    };
    return _models.mongo.user.findOne(condition).then(res => res ? res.toObject() : null);
  },
  find: async (query, {
    skip = 0,
    limit = 15,
    sort
  }, fields) => {
    const total = await _models.mongo.user.find(query, fields).countDocuments();
    const users = await _models.mongo.user.find(query, fields, {
      skip,
      limit,
      sort
    });
    return {
      total,
      users
    };
  },
  findOne: async query => {
    const city = await _models.mongo.user.findOne(query).then(res => res ? res.toObject() : null);
    return city;
  }
};
var _default = userDA;
exports.default = _default;