import joi from "@hapi/joi"
import accountDa from "dataAccess/account"


const accountSchema = joi.object().keys({
  name: joi.string().required(),
  account_no: joi.string().required(),
  desc: joi.string(),
  action_type: joi.string().required(),
  category: joi.string().required(),
})


const accountControllers = {
  post: async (req, res, next) => {
    try {
      const validatedInput = await joi.validate(req.body, accountSchema, { stripUnknown: true })
      const account = await accountDa.create({ ...validatedInput })

      return res.json({ message: "create account success", account })


    } catch (error) {
      return next(error)
    }

  },
  put: async (req, res, next) => {
    try {
      const validatedInput = await joi.validate(req.body, accountSchema, { stripUnknown: true })
      const account = await accountDa.update({ _id: req.params.id }, { ...validatedInput })

      return res.json({ message: "update account success", account })

    } catch (error) {
      return next(error)
    }

  },
  delete: async (req, res, next) => {
    try {
      const account = await accountDa.delete(req.params.id)

      return res.json({ message: "update account success", account })


    } catch (error) {
      return next(error)
    }

  },
  get: async (req, res, next) => {
    try {
      const { skip, limit, sort, query } = req.qObj
      const accounts = await accountDa.find(query, { skip, limit, sort })


      return res.json(accounts)

    } catch (error) {
      return next(error)
    }

  },
  getOne: async (req, res, next) => {
    try {
      const account = await accountDa.findOneByID(req.params.id)

      return res.json(account)
    } catch (error) {
      return next(error)
    }
  }
}

export default accountControllers
