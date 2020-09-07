"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _moggoseMiddleware = require("libs/moggoseMiddleware");

/* eslint-disable no-invalid-this */
const $ = {
  name: "Account"
};
$.schema = new _mongoose.Schema({
  account_no: {
    type: String
  },
  name: {
    type: String
  },
  category: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  desc: {
    type: String
  },
  action_type: {
    type: String,
    enum: ["sale", "purchase", "expense"]
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