const axios = require("axios")

const categories = [{
  account_no: "1001",
  name: "kas",
  category: "aset",
  action_type: "sale"
}, {
  account_no: "1002",
  name: "piutang",
  category: "aset",
  action_type: "sale"
}, {
  account_no: "1003",
  name: "persediaan",
  category: "aset",
  action_type: "expense"
}, {
  account_no: "1004",
  category: "aset",
  name: "perlengkapan umum",
  action_type: "expense"
}, {
  account_no: "2000",
  name: "hutang",
  category: "liabilitas",
  action_type: "purchase"
},
{
  account_no: "2001",
  name: "hutang",
  category: "liabilitas",
  action_type: "expense"
},
{
  account_no: "4001",
  name: "pendapatan penjualan",
  category: "pendapatan",
  action_type: "sale"
},
{
  account_no: "5001",
  name: "pembelian bahan baku",
  category: "biaya",
  action_type: "purchase"
},
{
  account_no: "5002",
  name: "pembelian kemasan",
  category: "biaya",
  action_type: "purchase"
},
{
  account_no: "6001",
  name: "beban perlengkapan umum",
  category: "biaya",
  action_type: "expense"
},
{
  account_no: "6002",
  name: "beban gaji",
  category: "biaya",
  action_type: "expense"
},
{
  account_no: "6003",
  name: "beban utilitas",
  category: "biaya",
  action_type: "expense"
},
{
  account_no: "6004",
  name: "beban marketing",
  category: "biaya",
  action_type: "expense"
},
]

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6W10sImRlbGV0ZWQiOmZhbHNlLCJfaWQiOiI1ZjRmZDZkYjAxNWVlMDJlZDJkNzI2OGMiLCJuYW1lIjoiaGVwaXNrYSIsImVtYWlsIjoiZWdvMTQwM0BnbWFpbC5jb20iLCJjcmVhdGVkX2F0IjoiMjAyMC0wOS0wMlQxNzozMTowNy4zNzJaIiwidXBkYXRlZF9hdCI6IjIwMjAtMDktMDJUMTg6MTc6MDcuNjQ3WiIsIl9fdiI6MCwiaWF0IjoxNTk5MTQ3NjE4fQ.zYD5O0DjrHckm9CINbD0IAvpjijI8FY1lkm28P9diPo"

const seedAcount = () => {
//   axios({ url: "http://localhost:4000/category", method: "POST", data: categories[0], headers: { Authorization: token } }).then(res => {
//     console.log(res)
//   })
// .catch(err => {
//   console.log(err)
// })
  const promises = categories.map(_data => {
    return axios({ url: `http://localhost:4000/category?search=name-eq:${_data.category}`, method: "get", data: _data, headers: { Authorization: token } }).then(res => {
      console.log(res.data.data.categories[0])

      return axios({ url: "http://localhost:4000/account", method: "POST", data: { ..._data, category: res.data.data.categories[0]._id, }, headers: { Authorization: token } })
    })
  .catch(err => {
    console.log(err.response.data)
  })
  })

  Promise.all(promises).catch(err => {
    console.log(err)
  })

}

seedAcount()

