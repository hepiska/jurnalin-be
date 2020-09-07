"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

/* eslint-disable no-invalid-this */
const $ = {
  name: "Transaction"
};
$.schema = new _mongoose.Schema({
  transaction_type: {
    type: String
  },
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  month_subscription: Number,
  cust_id: String,
  cust_msisdn: String,
  invoice: {
    type: String,
    required: true,
    unique: true
  },
  payment_method: {
    type: String
  },
  desc: {
    type: String
  },
  reference: {
    type: String
  },
  status: {
    type: String,
    required: true,
    default: "pending",
    enum: ["sucess", "fail", "pending"]
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});
const $model = (0, _mongoose.model)($.name, $.schema);
$model.createIndexes();
var _default = $model;
exports.default = _default;