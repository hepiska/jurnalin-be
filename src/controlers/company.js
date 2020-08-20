import joi from "@hapi/joi"
import bcrypt from "bcryptjs"
import { signJwt } from "libs/jwt"
import companyDa from "dataAccess/company"


const companySchema = joi.object().keys({
  user: joi.string().email({ minDomainSegments: 2 })
    .required(),
  status: joi.string(),
  name: joi.string().min(1)
    .required()
})


const companyControler = {
  post: async (req, res, next) => {
    try {
      const validatedInput = await joi.validate(req.body, companySchema, { stripUnknown: true })
      const company = await companyDa.create({ ...validatedInput, user: req.user._id })

      return res.json({ message: "create article company", company })


    } catch (error) {
      return next(error)
    }

  },
  put: async (req, res, next) => {
    try {
      const validatedInput = await joi.validate(req.body, companySchema, { stripUnknown: true })
      const company = await companyDa.update({ _id: req.params.id }, { ...validatedInput, user: req.user._id })

      return res.json({ message: "update article company", company })

    } catch (error) {
      return next(error)
    }

  },
  delete: async (req, res, next) => {
    try {
      const company = await companyDa.delete(req.params.id)

      return res.json({ message: "update article company", company })


    } catch (error) {
      return next(error)
    }

  },
  get: async (req, res, next) => {
    try {
      const { skip, limit, sort, query } = req.qObj
      const companies = await companyDa.find(query, { skip, limit, sort })


      return res.json(companies)

    } catch (error) {
      return next(error)
    }

  },
  getOne: async (req, res, next) => {
    try {
      const companies = await companyDa.findOneByID(req.params.id)

      return res.json(companies)
    } catch (error) {
      return next(error)
    }
  }
}


export default companyControler
