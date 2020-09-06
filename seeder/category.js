const axios = require("axios")

const categories = [{
  name: "aset",
  possition: "debet",
}, {
  name: "liabilitas",
  possition: "kredit",
}, {
  name: "pendapatan",
  possition: "kredit",
}, {
  name: "biaya",
  possition: "debet",
}]

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6W10sImRlbGV0ZWQiOmZhbHNlLCJfaWQiOiI1ZjRmZDZkYjAxNWVlMDJlZDJkNzI2OGMiLCJuYW1lIjoiaGVwaXNrYSIsImVtYWlsIjoiZWdvMTQwM0BnbWFpbC5jb20iLCJjcmVhdGVkX2F0IjoiMjAyMC0wOS0wMlQxNzozMTowNy4zNzJaIiwidXBkYXRlZF9hdCI6IjIwMjAtMDktMDJUMTg6MTc6MDcuNjQ3WiIsIl9fdiI6MCwiaWF0IjoxNTk5MTQ3NjE4fQ.zYD5O0DjrHckm9CINbD0IAvpjijI8FY1lkm28P9diPo"

const seedCategory = () => {
//   axios({ url: "http://localhost:4000/category", method: "POST", data: categories[0], headers: { Authorization: token } }).then(res => {
//     console.log(res)
//   })
// .catch(err => {
//   console.log(err)
// })
  const promises = categories.map(_data => {
    return axios({ url: "http://localhost:4000/category", method: "POST", data: _data, headers: { Authorization: token } }).then(res => {
      console.log(res)
    })
  .catch(err => {
    console.log(err)
  })
  })

  Promise.all(promises).catch(err => {
    console.log(err)
  })

}

seedCategory()

