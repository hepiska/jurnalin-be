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
  company: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
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

  }
},
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  })


$.schema.pre(["validate", "findOneAndUpdate"], createSlug)
const $model = model($.name, $.schema)

$model.createIndexes()

export default $model

