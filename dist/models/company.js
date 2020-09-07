"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _moggoseMiddleware = require("libs/moggoseMiddleware");

/* eslint-disable no-invalid-this */
const $ = {
  name: "Company"
};
$.schema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  status: {
    type: String,
    required: true,
    trim: true,
    default: "active"
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});
$.schema.pre(["validate", "findOneAndUpdate"], _moggoseMiddleware.createSlug);
const $model = (0, _mongoose.model)($.name, $.schema);
$model.createIndexes();
var _default = $model;
exports.default = _default;