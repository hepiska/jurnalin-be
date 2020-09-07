"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _moggoseMiddleware = require("libs/moggoseMiddleware");

/* eslint-disable no-invalid-this */
const $ = {
  name: "Category"
};
$.schema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    index: true,
    trim: true,
    unique: true
  },
  possition: {
    type: String,
    required: true,
    trim: true
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