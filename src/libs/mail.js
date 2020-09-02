import axios from "axios"
import qs from "qs"


export const sendMail = ({ subject, message, recipient }) => {
  const data = qs.stringify({
    subject,
    message,
    recipient,
  })


  return axios({ url: "https://api.thebigbox.id/mail-sender/0.0.1/mails",
    method: "POST",
    data,
    headers: {
      "x-api-key": "HKysFy8NzW6lU11DAfXLqt2U4WQisIqQ", "Content-Type": "application/x-www-form-urlencoded"

    } })

}
