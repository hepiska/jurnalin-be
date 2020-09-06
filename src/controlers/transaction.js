import joi from "@hapi/joi"
import transactionDa from "dataAccess/transaction"
import userDa from "dataAccess/user"
import { finpayGenerateSignature, finpayTransaction } from "libs/third-party"
import { jurnalinprice } from "libs/config"
import dayjs from "dayjs"
import shortid from "shortid"


const transactionSchema = joi.object().keys({
  payment_method: joi.string().required()
    .required(),
  month_subscription: joi.number().required(),
  cust_id: joi.string().required(),
  cust_msisdn: joi.string().required(),
})


const accountControllers = {
  post: async (req, res, next) => {
    try {
      const validatedInput = await joi.validate(req.body, transactionSchema, { stripUnknown: true })
      const transaction = await transactionDa.create({ ...validatedInput })

      return res.json({ message: "create transaction success", transaction })


    } catch (error) {
      return next(error)
    }

  },
  subcribe: async (req, res, next) => {
    try {
      const { user } = req
      const validateTrans = await joi.validate(req.body, transactionSchema, { stripUnknown: true })
      const invoice = shortid()
      const transaction = await transactionDa.create({ payment_method: validateTrans.payment_method,
        cust_msisdn: validateTrans.cust_msisdn,
        cust_id: validateTrans.cust_id,
        user: user._id || user.id,
        invoice,
        amount: jurnalinprice * validateTrans.month_subscription,
        month_subscription: validateTrans.month_subscription })


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
        "trans_date": dayjs(transaction.createAt).format("YYYYMMDDHHmmss")
      }

      const finPayGenerated = await finpayGenerateSignature(finPayPayload)


      const finpayTransRes = await finpayTransaction(finPayGenerated.data.data)


      return res.json({ ...finpayTransRes.data })

    } catch (error) {

      return next(error)
    }

  },
  callback: (req, res, next) => {
    try {
      return res.json({ message: "sucess" })

    } catch (error) {
      return next(error)
    }
  },
  success: async (req, res, next) => {
    try {
      const transaction = await transactionDa.update({ invoice: req.query.invoice, }, { status: "success" })

      const suncribeEndAt = dayjs().add(transaction.month_subscription, "month")

      await userDa.update({ _id: transaction.user }, { subcribe_endat: suncribeEndAt.toISOString() })

      return res.redirect(301, `${process.env.WEB_URI}/payment-response/success`)
    } catch (error) {
      return next(error)
    }
  },
  failed: async (req, res, next) => {
    try {
      await transactionDa.update({ invoice: req.query.invoice, }, { status: "failed" })

      return res.redirect(301, `${process.env.WEB_URI}/payment-response/failed`)


    } catch (error) {
      return next(error)
    }
  },
  put: async (req, res, next) => {
    try {
      const validatedInput = await joi.validate(req.body, transactionSchema, { stripUnknown: true })
      const transaction = await transactionDa.update({ _id: req.params.id }, { ...validatedInput })

      return res.json({ message: "update transaction success", transaction })

    } catch (error) {
      return next(error)
    }

  },
  delete: async (req, res, next) => {
    try {
      const transaction = await transactionDa.delete(req.params.id)

      return res.json({ message: "update transaction success", transaction })


    } catch (error) {
      return next(error)
    }

  },
  get: async (req, res, next) => {
    try {
      const { skip, limit, sort, query } = req.qObj
      const accounts = await transactionDa.find(query, { skip, limit, sort })


      return res.json(accounts)

    } catch (error) {
      return next(error)
    }

  },
  getOne: async (req, res, next) => {
    try {
      const transaction = await transactionDa.findOneByID(req.params.id)

      return res.json(transaction)
    } catch (error) {
      return next(error)
    }
  }
}

export default accountControllers
