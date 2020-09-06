import joi from "@hapi/joi"
import categoryDa from "dataAccess/category"


const categorySchema = joi.object().keys({
  name: joi.string().required()
    .required(),
  possition: joi.string().required(),
})


const categoryControllers = {
  post: async (req, res, next) => {
    try {
      const validatedInput = await joi.validate(req.body, categorySchema, { stripUnknown: true })
      const category = await categoryDa.create({ ...validatedInput })

      return res.json({ message: "create category success", category })


    } catch (error) {
      return next(error)
    }

  },
  put: async (req, res, next) => {
    try {
      const validatedInput = await joi.validate(req.body, categorySchema, { stripUnknown: true })
      const category = await categoryDa.update({ _id: req.params.id }, { ...validatedInput })

      return res.json({ message: "update category success", category })

    } catch (error) {
      return next(error)
    }

  },
  delete: async (req, res, next) => {
    try {
      const category = await categoryDa.delete(req.params.id)

      return res.json({ message: "update category success", category })


    } catch (error) {
      return next(error)
    }

  },
  get: async (req, res, next) => {
    try {
      const { skip, limit, sort, query } = req.qObj
      const categories = await categoryDa.find(query, { skip, limit, sort })


      return res.json(categories)

    } catch (error) {
      return next(error)
    }

  },
  getOne: async (req, res, next) => {
    try {
      const category = await categoryDa.findOneByID(req.params.id)

      return res.json(category)
    } catch (error) {
      return next(error)
    }
  }
}

export default categoryControllers
