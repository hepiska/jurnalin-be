import { mongo } from "models"

const accountDa = {
  create: data => {
    return mongo.account.create(data).then(res => {
      return res ? res.toObject() : null
    })
  },
  update: (q, data) => {
    return mongo.account.findOneAndUpdate(q, { ...data }, { new: true, upsert: true })
  },
  delete: _id => {
    return mongo.account.deleteById(_id)
  },
  findOneByID: _id => {
    const condition = { _id }

    return mongo.account.findOne(condition).then(res => res ? res.toObject() : null)
  },

  find: async (query, { skip = 0, limit = 15, sort }, fields) => {
    const total = await mongo.account.find(query, fields).countDocuments()
    const accounts = await mongo.account.find(query, fields, { skip, limit, sort })

    return {
      total,
      accounts
    }
  },
  findOne: async query => {
    const city = await mongo.account.findOne(query).then(res => res ? res.toObject() : null)

    return city
  },
}

export default accountDa
