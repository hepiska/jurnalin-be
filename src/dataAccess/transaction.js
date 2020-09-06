import { mongo } from "models"

const TransactionDa = {
  create: data => {
    return mongo.transaction.create(data).then(res => {
      return res ? res.toObject() : null
    })
  },
  update: (q, data) => {
    return mongo.transaction.findOneAndUpdate(q, { ...data }, { new: true, upsert: true })
  },
  delete: _id => {
    return mongo.transaction.deleteById(_id)
  },
  findOneByID: _id => {
    const condition = { _id }

    return mongo.transaction.findOne(condition).then(res => res ? res.toObject() : null)
  },

  find: async (query, { skip = 0, limit = 15, sort }, fields) => {
    const total = await mongo.transaction.find(query, fields).countDocuments()
    const transaction = await mongo.transaction.find(query, fields, { skip, limit, sort })

    return {
      total,
      transaction
    }
  },
  findOne: async query => {
    const city = await mongo.transaction.findOne(query).then(res => res ? res.toObject() : null)

    return city
  },
}

export default TransactionDa
