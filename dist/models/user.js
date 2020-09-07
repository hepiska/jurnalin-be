"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable func-style */
const saltRounds = Number(process.env.SALTROUND);
const userSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone_number: String,
  email: {
    type: String,
    required: true,
    index: true,
    trim: true,
    unique: true
  },
  telegram: String,
  active_company: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Company"
  },
  password: String,
  social_auth: {
    type: _mongoose.default.Schema.Types.Map,
    of: String
  },
  subcribe_endat: {
    type: Date
  },
  roles: [String],
  profile_picture: String,
  guide: {
    account_no: String,
    company: String,
    balance: Number
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

function saltpassword(next) {
  // eslint-disable-next-line no-invalid-this
  const pswdHashed = _bcryptjs.default.hashSync(this.password, saltRounds); // eslint-disable-next-line no-invalid-this


  this.password = pswdHashed;
  return next();
}

userSchema.pre("save", saltpassword);

const $model = _mongoose.default.model("User", userSchema);

$model.createIndexes();
var _default = $model;
exports.default = _default;