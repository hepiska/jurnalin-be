import { mongo } from "models"

const companyDA = {
  create: data => {
    return mongo.company.create(data).then(res => {
      return res ? res.toObject() : null
    })
  },
  update: (q, data) => {
    return mongo.company.findOneAndUpdate(q, { ...data }, { new: true, upsert: true })
  },
  delete: _id => {
    return mongo.company.deleteById(_id)
  },
  findOneByID: _id => {
    const condition = { _id }

    return mongo.company.findOne(condition).then(res => res ? res.toObject() : null)
  },

  find: async (query, { skip = 0, limit = 15, sort }, fields) => {
    const total = await mongo.company.find(query, fields).countDocuments()
    const companies = await mongo.company.find(query, fields, { skip, limit, sort })

    return {
      total,
      companies
    }
  },
  findOne: async query => {
    const city = await mongo.company.findOne(query).then(res => res ? res.toObject() : null)

    return city
  },
}

export default companyDA
