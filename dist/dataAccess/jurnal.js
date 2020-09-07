"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = require("models");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dayjs = _interopRequireDefault(require("dayjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const jurnalDa = {
  create: data => {
    return _models.mongo.jurnal.create(data).then(res => {
      return res ? res.toObject() : null;
    });
  },
  insert: data => {
    return _models.mongo.jurnal.insertMany(data).then(res => {
      return res;
    });
  },
  update: (q, data) => {
    return _models.mongo.jurnal.findOneAndUpdate(q, { ...data
    }, {
      new: true,
      upsert: true
    });
  },
  delete: _id => {
    return _models.mongo.jurnal.deleteById(_id);
  },
  findOneByID: _id => {
    const condition = {
      _id
    };
    return _models.mongo.jurnal.findOne(condition).then(res => res ? res.toObject() : null);
  },
  totoalByAccount: (user_id, start_at, end_at) => {
    const match = {
      user: _mongoose.default.Types.ObjectId(user_id)
    };
    let transactionDate = null;

    if (start_at || end_at) {
      transactionDate = {};
    }

    if (start_at) {
      transactionDate.$gte = new Date(start_at);
    }

    if (end_at) {
      transactionDate.$lte = new Date(end_at);
    }

    if (transactionDate) {
      match.transaction_date = transactionDate;
    }

    const aggregateData = [{
      $match: match
    }, {
      $lookup: {
        from: "accounts",
        localField: "account",
        foreignField: "_id",
        as: "data"
      }
    }, {
      $unwind: "$data"
    }, {
      $group: {
        _id: "$account",
        total: {
          $sum: "$value"
        },
        name: {
          $first: "$data.name"
        },
        account_no: {
          $first: "$data.account_no"
        }
      }
    }];
    return _models.mongo.jurnal.aggregate(aggregateData);
  },
  find: async (query, {
    skip = 0,
    limit = 15,
    sort
  }, fields) => {
    const total = await _models.mongo.jurnal.find(query, fields).countDocuments();
    const jurnals = await _models.mongo.jurnal.find(query, fields, {
      skip: skip * limit,
      limit,
      sort
    }).populate("account");
    return {
      total,
      jurnals
    };
  },
  findOne: async query => {
    const city = await _models.mongo.jurnal.findOne(query).then(res => res ? res.toObject() : null);
    return city;
  }
};
var _default = jurnalDa;
exports.default = _default;