import axios from "axios"
import qs from "qs"

const telkomapiKei = process.env.TELKOMAPI_KEI

export const finpayGenerateSignature = data => {
  const parseData = qs.stringify(data)


  return axios({ url: "https://api.thebigbox.id/finpay/2.0.1-sandbox/generate",
    method: "POST",
    data: parseData,
    headers: {
      "x-api-key": telkomapiKei, "Content-Type": "application/x-www-form-urlencoded"
    } })
}

export const finpayTransaction = data => {
  const parseData = qs.stringify(data)


  return axios({ url: "https://api.thebigbox.id/finpay/2.0.1-sandbox",
    method: "POST",
    data: parseData,
    headers: {
      "x-api-key": telkomapiKei, "Content-Type": "application/x-www-form-urlencoded"
    } })
}

