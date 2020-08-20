import joi from "@hapi/joi"
import { parseSort, stringToQueryObj } from "libs/helpers"


const QSkipLimitSchema = joi.object().keys({
  search: joi.string(),
  skip: joi.number().default(0),
  limit: joi.number().default(10),
  sort: joi.string()
})


export const parseQueryString = async (req, res, next) => {
  try {
    const { skip, limit, sort, search } = await joi.validate(req.query, QSkipLimitSchema, { stripUnknown: true })
    const query = stringToQueryObj(search)
    const sortParsed = parseSort(sort)
    const qObj = { skip, limit, sort: sortParsed, query }

    req.qObj = qObj

    return next()
  } catch (error) {
    return next()
  }
}
