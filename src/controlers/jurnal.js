import joi from "@hapi/joi"
import jurnalDA from "dataAccess/jurnal"


const jurnalSchema = joi.object().keys({
  account: joi.string().required()
    .required(),
  value: joi.number().required(),
  possition: joi.string().valid(["debet", "kredit"])
.required(),
  company: joi.string().required(),
  ref: joi.string().required()
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
