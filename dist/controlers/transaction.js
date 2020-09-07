"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _transaction = _interopRequireDefault(require("dataAccess/transaction"));

var _user = _interopRequireDefault(require("dataAccess/user"));

var _thirdParty = require("libs/third-party");

var _config = require("libs/config");

var _dayjs = _interopRequireDefault(require("dayjs"));

var _shortid = _interopRequireDefault(require("shortid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const transactionSchema = _joi.default.object().keys({
  payment_method: _joi.default.string().required().required(),
  month_subscription: _joi.default.number().required(),
  cust_id: _joi.default.string().required(),
  cust_msisdn: _joi.default.string().required()
});

const accountControllers = {
  post: async (req, res, next) => {
    try {
      const validatedInput = await _joi.default.validate(req.body, transactionSchema, {
        stripUnknown: true
      });
      const transaction = await _transaction.default.create({ ...validatedInput
      });
      return res.json({
        message: "create transaction success",
        transaction
      });
    } catch (error) {
      return next(error);
    }
  },
  subcribe: async (req, res, next) => {
    try {
      const {
        user
      } = req;
      const validateTrans = await _joi.default.validate(req.body, transactionSchema, {
        stripUnknown: true
      });
      const invoice = (0, _shortid.default)();
      const transaction = await _transaction.default.create({
        payment_method: validateTrans.payment_method,
        cust_msisdn: validateTrans.cust_msisdn,
        cust_id: validateTrans.cust_id,
        user: user._id || user.id,
        invoice,
        amount: _config.jurnalinprice * validateTrans.month_subscription,
        month_subscription: validateTrans.month_subscription
      });
      const finPayPayload = {
        "add_info1": "subscribe jurnalin",
        "amount": transaction.amount,
        "cust_email": user.email,
        "cust_id": transaction.cust_id,
        "cust_msisdn": transaction.cust_msisdn,
        "cust_name": user.name,
        "failed_url": `${process.env.THIS_URI}/transaction/failed`,
        "invoice": transaction.invoice,
        "merchant_id": process.env.FINPATMERCHAN,
        "merchant_password": process.env.FINPAYPASS,
        "return_url": `${process.env.THIS_URI}/transaction/callback`,
        "sof_id": transaction.payment_method,
        "sof_type": "pay",
        "success_url": `${process.env.THIS_URI}/transaction/success`,
        "timeout": "60",
        "trans_date": (0, _dayjs.default)(transaction.createAt).format("YYYYMMDDHHmmss")
      };
      const finPayGenerated = await (0, _thirdParty.finpayGenerateSignature)(finPayPayload);
      const finpayTransRes = await (0, _thirdParty.finpayTransaction)(finPayGenerated.data.data);
      return res.json({ ...finpayTransRes.data
      });
    } catch (error) {
      return next(error);
    }
  },
  callback: (req, res, next) => {
    try {
      return res.json({
        message: "sucess"
      });
    } catch (error) {
      return next(error);
    }
  },
  success: async (req, res, next) => {
    try {
      const transaction = await _transaction.default.update({
        invoice: req.query.invoice
      }, {
        status: "success"
      });
      const suncribeEndAt = (0, _dayjs.default)().add(transaction.month_subscription, "month");
      await _user.default.update({
        _id: transaction.user
      }, {
        subcribe_endat: suncribeEndAt.toISOString()
      });
      return res.redirect(301, `${process.env.WEB_URI}/payment-response/success`);
    } catch (error) {
      return next(error);
    }
  },
  failed: async (req, res, next) => {
    try {
      await _transaction.default.update({
        invoice: req.query.invoice
      }, {
        status: "failed"
      });
      return res.redirect(301, `${process.env.WEB_URI}/payment-response/failed`);
    } catch (error) {
      return next(error);
    }
  },
  put: async (req, res, next) => {
    try {
      const validatedInput = await _joi.default.validate(req.body, transactionSchema, {
        stripUnknown: true
      });
      const transaction = await _transaction.default.update({
        _id: req.params.id
      }, { ...validatedInput
      });
      return res.json({
        message: "update transaction success",
        transaction
      });
    } catch (error) {
      return next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const transaction = await _transaction.default.delete(req.params.id);
      return res.json({
        message: "update transaction success",
        transaction
      });
    } catch (error) {
      return next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      const {
        skip,
        limit,
        sort,
        query
      } = req.qObj;
      const accounts = await _transaction.default.find(query, {
        skip,
        limit,
        sort
      });
      return res.json(accounts);
    } catch (error) {
      return next(error);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const transaction = await _transaction.default.findOneByID(req.params.id);
      return res.json(transaction);
    } catch (error) {
      return next(error);
    }
  }
};
var _default = accountControllers;
exports.default = _default;