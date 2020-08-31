import joi from "@hapi/joi"
import bcrypt from "bcryptjs"
import { signJwt } from "libs/jwt"
import userDa from "dataAccess/user"

const web_uri = process.env.WEB_URI


export const handleStart = async (from, message) => {
  try {
    const userBytelegram = await userDa.findOne({ telegram: from.id })

    if (!userBytelegram) {
      return `${web_uri}/auth?telegram=${from.id}`
    }

    return "selamat datang kembali silahkan mulai transaksi"


  } catch (error) {
    throw error
  }

}
