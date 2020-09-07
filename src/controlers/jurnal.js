import joi from "@hapi/joi"
import jurnalDA from "dataAccess/jurnal"
import accountData from "dataAccess/account"
import shortid from "shortid"

const penjualanACC_NO = "4001"


const jurnalSchema = joi.object().keys({
  account: joi.string().required()
    .required(),
  value: joi.number().required(),
  possition: joi.string().valid(["debet", "kredit"])
.required(),
  desc: joi.string().allow(null, ""),
  company: joi.string().required(),
  ref: joi.string().required()
})

const pembelianSchema = joi.object().keys({
  account_debet: joi.string().required()
    .required(),
  desc: joi.string().allow(null, ""),

  account_kredit: joi.string().required()
    .required(),
  value: joi.number().required(),
  transaction_date: joi.date()
.required(),
})

const penjualanSchema = joi.object().keys({
  account: joi.string().required()
    .required(),
  desc: joi.string().allow(null, ""),

  value: joi.number().required(),
  transaction_date: joi.date()
.required(),
})


const jurnalControllers = {
  post: async (req, res, next) => {
    try {

      if (!req.user.company) {
        throw new Error("please create company first")
      }

      const validatedInput = await joi.validate(req.body, jurnalSchema, { stripUnknown: true })
      const jurnal = await jurnalDA.create({ ...validatedInput, company: req.user.activeCompany })

      return res.json({ message: "create jurnal success", jurnal })


    } catch (error) {
      return next(error)
    }
  },
  pembelian: async (req, res, next) => {
    try {
      const validatedInput = await joi.validate(req.body, pembelianSchema, { stripUnknown: true })
      const ref = shortid.generate()

      const generalData = { value: validatedInput.value,
        transaction_date: validatedInput.transaction_date,
        ref,
        user: req.user._id }

      await jurnalDA.insert([{ ...generalData, possition: "debet", account: validatedInput.account_debet },
      { ...generalData, possition: "kredit", account: validatedInput.account_kredit }])

      return res.json({ message: "add jurnal success" })


    } catch (error) {
      return next(error)
    }
  },
  penjualan: async (req, res, next) => {
    try {
      const validatedInput = await joi.validate(req.body, penjualanSchema, { stripUnknown: true })
      const pendapatan = await accountData.findOne({ account_no: penjualanACC_NO })
      const ref = shortid.generate()
      const generalData = { value: validatedInput.value,
        transaction_date: validatedInput.transaction_date,
        ref,
        user: req.user._id }

      await jurnalDA.insert([{ ...generalData, possition: "debet", account: validatedInput.account },
      { ...generalData, possition: "kredit", account: pendapatan._id }])

      return res.json({ message: "add jurnal success" })
    } catch (error) {
      return next(error)
    }
  },
  totalaccounts: async (req, res, next) => {
    try {
      const { user } = req

      if (!user.subcribe_endat) {
        throw new Error("tidak punya akses silahkan subribe")
      }

      const now = new Date()
      const subEndat = new Date(user.subcribe_endat)

      if (now > subEndat) {
        throw new Error("tidak punya akses silahkan subribe")

      }


      const accountTotal = await jurnalDA.totoalByAccount(req.user._id, req.query.start_at, req.query.end_at)
      const accounts = await accountData.find({ }, { skip: 0, limit: 30 })

      const newAccounts = accounts.accounts.map(_data => {
        const accountFind = accountTotal.find(_acc => _acc.account_no === _data.account_no)

        if (accountFind) {
          _data.total = accountFind.total
        }

        return { name: _data.name, total: _data.total || 0, account_no: _data.account_no }
      })

      return res.json({ accounts: newAccounts })
    } catch (error) {
      return next(error)
    }

  },
  pembayaran: async (req, res, next) => {
    try {

      const validatedInput = await joi.validate(req.body, pembelianSchema, { stripUnknown: true })
      const ref = shortid.generate()

      const generalData = { value: validatedInput.value, transaction_date: validatedInput.transaction_date, ref }

      await jurnalDA.insert([{ ...generalData, possition: "debet", account_no: validatedInput.account_debet },
      { ...generalData, possition: "kredit", account_no: validatedInput.account_kredit }])

      return res.json({ message: "add jurnal success" })
    } catch (error) {
      return next(error)
    }
  },
  put: async (req, res, next) => {
    try {
      const validatedInput = await joi.validate(req.body, jurnalSchema, { stripUnknown: true })
      const jurnal = await jurnalDA.update({ _id: req.params.id },
         { ...validatedInput, company: req.user.activeCompany })

      return res.json({ message: "update jurnal success", jurnal })

    } catch (error) {
      return next(error)
    }
  },

  delete: async (req, res, next) => {
    try {
      const jurnal = await jurnalDA.delete(req.params.id)

      return res.json({ message: "update jurnal success", jurnal })


    } catch (error) {
      return next(error)
    }

  },
  get: async (req, res, next) => {
    try {
      const { skip, limit, sort, query } = req.qObj
      const jurnals = await jurnalDA.find(query, { skip, limit, sort })


      return res.json(jurnals)

    } catch (error) {
      return next(error)
    }

  },
  userjurnal: async (req, res, next) => {
    try {
      const { skip, limit, sort, query } = req.qObj
      const jurnals = await jurnalDA.find({ ...query, user: req.user._id },
         { skip, limit, sort: { transaction_date: 1, } })


      return res.json(jurnals)

    } catch (error) {
      return next(error)
    }

  },
  getOne: async (req, res, next) => {
    try {
      const jurnal = await jurnalDA.findOneByID(req.params.id)

      return res.json(jurnal)
    } catch (error) {
      return next(error)
    }
  }
}

export default jurnalControllers
