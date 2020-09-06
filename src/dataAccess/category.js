import { mongo } from "models"

const accountDa = {
  create: data => {
    return mongo.category.create(data).then(res => {
      return res ? res.toObject() : null
    })
  },
  update: (q, data) => {
    return mongo.category.findOneAndUpdate(q, { ...data }, { new: true, upsert: true })
  },
  delete: _id => {
    return mongo.category.deleteById(_id)
  },
  findOneByID: _id => {
    const condition = { _id }

    return mongo.category.findOne(condition).then(res => res ? res.toObject() : null)
  },

  find: async (query, { skip = 0, limit = 15, sort }, fields) => {
    const total = await mongo.category.find(query, fields).countDocuments()
    const categories = await mongo.category.find(query, fields, { skip, limit, sort })

    return {
      total,
      categories
    }
  },
  findOne: async query => {
    const city = await mongo.category.findOne(query).then(res => res ? res.toObject() : null)

    return city
  },
}

export default accountDa
