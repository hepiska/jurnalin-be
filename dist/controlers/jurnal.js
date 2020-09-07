"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _jurnal = _interopRequireDefault(require("dataAccess/jurnal"));

var _account = _interopRequireDefault(require("dataAccess/account"));

var _shortid = _interopRequireDefault(require("shortid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const penjualanACC_NO = "4001";

const jurnalSchema = _joi.default.object().keys({
  account: _joi.default.string().required().required(),
  value: _joi.default.number().required(),
  possition: _joi.default.string().valid(["debet", "kredit"]).required(),
  desc: _joi.default.string().allow(null, ""),
  company: _joi.default.string().required(),
  ref: _joi.default.string().required()
});

const pembelianSchema = _joi.default.object().keys({
  account_debet: _joi.default.string().required().required(),
  desc: _joi.default.string().allow(null, ""),
  account_kredit: _joi.default.string().required().required(),
  value: _joi.default.number().required(),
  transaction_date: _joi.default.date().required()
});

const penjualanSchema = _joi.default.object().keys({
  account: _joi.default.string().required().required(),
  desc: _joi.default.string().allow(null, ""),
  value: _joi.default.number().required(),
  transaction_date: _joi.default.date().required()
});

const jurnalControllers = {
  post: async (req, res, next) => {
    try {
      if (!req.user.company) {
        throw new Error("please create company first");
      }

      const validatedInput = await _joi.default.validate(req.body, jurnalSchema, {
        stripUnknown: true
      });
      const jurnal = await _jurnal.default.create({ ...validatedInput,
        company: req.user.activeCompany
      });
      return res.json({
        message: "create jurnal success",
        jurnal
      });
    } catch (error) {
      return next(error);
    }
  },
  pembelian: async (req, res, next) => {
    try {
      const validatedInput = await _joi.default.validate(req.body, pembelianSchema, {
        stripUnknown: true
      });

      const ref = _shortid.default.generate();

      const generalData = {
        value: validatedInput.value,
        transaction_date: validatedInput.transaction_date,
        ref,
        user: req.user._id
      };
      await _jurnal.default.insert([{ ...generalData,
        possition: "debet",
        account: validatedInput.account_debet
      }, { ...generalData,
        possition: "kredit",
        account: validatedInput.account_kredit
      }]);
      return res.json({
        message: "add jurnal success"
      });
    } catch (error) {
      return next(error);
    }
  },
  penjualan: async (req, res, next) => {
    try {
      const validatedInput = await _joi.default.validate(req.body, penjualanSchema, {
        stripUnknown: true
      });
      const pendapatan = await _account.default.findOne({
        account_no: penjualanACC_NO
      });

      const ref = _shortid.default.generate();

      const generalData = {
        value: validatedInput.value,
        transaction_date: validatedInput.transaction_date,
        ref,
        user: req.user._id
      };
      await _jurnal.default.insert([{ ...generalData,
        possition: "debet",
        account: validatedInput.account
      }, { ...generalData,
        possition: "kredit",
        account: pendapatan._id
      }]);
      return res.json({
        message: "add jurnal success"
      });
    } catch (error) {
      return next(error);
    }
  },
  totalaccounts: async (req, res, next) => {
    try {
      const {
        user
      } = req;

      if (!user.subcribe_endat) {
        throw new Error("tidak punya akses silahkan subribe");
      }

      const now = new Date();
      const subEndat = new Date(user.subcribe_endat);

      if (now > subEndat) {
        throw new Error("tidak punya akses silahkan subribe");
      }

      const accountTotal = await _jurnal.default.totoalByAccount(req.user._id, req.query.start_at, req.query.end_at);
      const accounts = await _account.default.find({}, {
        skip: 0,
        limit: 30
      });
      const newAccounts = accounts.accounts.map(_data => {
        const accountFind = accountTotal.find(_acc => _acc.account_no === _data.account_no);

        if (accountFind) {
          _data.total = accountFind.total;
        }

        return {
          name: _data.name,
          total: _data.total || 0,
          account_no: _data.account_no
        };
      });
      return res.json({
        accounts: newAccounts
      });
    } catch (error) {
      return next(error);
    }
  },
  pembayaran: async (req, res, next) => {
    try {
      const validatedInput = await _joi.default.validate(req.body, pembelianSchema, {
        stripUnknown: true
      });

      const ref = _shortid.default.generate();

      const generalData = {
        value: validatedInput.value,
        transaction_date: validatedInput.transaction_date,
        ref
      };
      await _jurnal.default.insert([{ ...generalData,
        possition: "debet",
        account_no: validatedInput.account_debet
      }, { ...generalData,
        possition: "kredit",
        account_no: validatedInput.account_kredit
      }]);
      return res.json({
        message: "add jurnal success"
      });
    } catch (error) {
      return next(error);
    }
  },
  put: async (req, res, next) => {
    try {
      const validatedInput = await _joi.default.validate(req.body, jurnalSchema, {
        stripUnknown: true
      });
      const jurnal = await _jurnal.default.update({
        _id: req.params.id
      }, { ...validatedInput,
        company: req.user.activeCompany
      });
      return res.json({
        message: "update jurnal success",
        jurnal
      });
    } catch (error) {
      return next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const jurnal = await _jurnal.default.delete(req.params.id);
      return res.json({
        message: "update jurnal success",
        jurnal
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
      const jurnals = await _jurnal.default.find(query, {
        skip,
        limit,
        sort
      });
      return res.json(jurnals);
    } catch (error) {
      return next(error);
    }
  },
  userjurnal: async (req, res, next) => {
    try {
      const {
        skip,
        limit,
        sort,
        query
      } = req.qObj;
      const jurnals = await _jurnal.default.find({ ...query,
        user: req.user._id
      }, {
        skip,
        limit,
        sort: {
          transaction_date: 1
        }
      });
      return res.json(jurnals);
    } catch (error) {
      return next(error);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const jurnal = await _jurnal.default.findOneByID(req.params.id);
      return res.json(jurnal);
    } catch (error) {
      return next(error);
    }
  }
};
var _default = jurnalControllers;
exports.default = _default;