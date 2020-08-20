import { mongo } from "models"

const jurnalDa = {
  create: data => {
    return mongo.jurnal.create(data).then(res => {
      return res ? res.toObject() : null
    })
  },
  update: (q, data) => {
    return mongo.jurnal.findOneAndUpdate(q, { ...data }, { new: true, upsert: true })
  },
  delete: _id => {
    return mongo.jurnal.deleteById(_id)
  },
  findOneByID: _id => {
    const condition = { _id }

    return mongo.jurnal.findOne(condition).then(res => res ? res.toObject() : null)
  },

  find: async (query, { skip = 0, limit = 15, sort }, fields) => {
    const total = await mongo.jurnal.find(query, fields).countDocuments()
    const jurnals = await mongo.jurnal.find(query, fields, { skip, limit, sort })

    return {
      total,
      jurnals
    }
  },
  findOne: async query => {
    const city = await mongo.jurnal.findOne(query).then(res => res ? res.toObject() : null)

    return city
  },
}

export default jurnalDa
