"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _moggoseMiddleware = require("libs/moggoseMiddleware");

/* eslint-disable no-invalid-this */
const $ = {
  name: "Jurnal"
};
$.schema = new _mongoose.Schema({
  desc: {
    type: String
  },
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  account: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Account"
  },
  images: [String],
  value: {
    type: Number,
    required: true
  },
  ref: {
    type: String,
    required: true
  },
  possition: {
    type: String,
    enum: ["debet", "kredit"]
  },
  transaction_date: {
    type: Date,
    required: true
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