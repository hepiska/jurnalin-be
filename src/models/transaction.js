/* eslint-disable no-invalid-this */

import { Schema, model } from "mongoose"


const $ = {
  name: "Transaction",
}

$.schema = new Schema({
  transaction_type: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  month_subscription: Number,
  cust_id: String,
  cust_msisdn: String,
  invoice: { type: String, required: true, unique: true },
  payment_method: {
    type: String,
  },
  desc: {
    type: String,
  },
  reference: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
    enum: ["sucess", "fail", "pending"],
  },
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

