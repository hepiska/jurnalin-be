/* eslint-disable no-invalid-this */

import { Schema, model } from "mongoose"
import { createSlug } from "libs/moggoseMiddleware"


const $ = {
  name: "Jurnal",
}

$.schema = new Schema({
  desc: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: "Account",
  },
  images: [String],
  value: {
    type: Number,
    required: true,
  },
  ref: {
    type: String,
    required: true,
  },
  possition: {
    type: String,
    enum: ["debet", "kredit"],
  },
  transaction_date: {
    type: Date,
    required: true,
  }
},
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  })


const $model = model($.name, $.schema)

$model.createIndexes()

export default $model

