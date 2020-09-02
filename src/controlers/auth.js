import joi from "@hapi/joi"
import bcrypt from "bcryptjs"
import { signJwt } from "libs/jwt"
import userDa from "dataAccess/user"
import shortid from "shortid"
import { sendMail } from "../libs/mail"
const web_uri = process.env.WEB_URI

// import { user as userDa } from "dataAccess"

const registerSchema = joi.object().keys({
  email: joi.string().email({ minDomainSegments: 2 })
    .required(),
  password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  name: joi.string().min(1)
    .required()
})

const loginSchema = joi.object().keys({
  email: joi.string().email({ minDomainSegments: 2 })
    .required(),
  password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
})

const userControler = {
  register: async (req, res, next) => {
    try {
      await joi.validate(req.body, registerSchema, { stripUnknown: true })
      const userData = { ...req.body }

      const user = await userDa.create(userData)

      Reflect.deleteProperty(user, "password")
      const token = signJwt(user)

      return res.json({ token })
    } catch (error) {
      return next(error)
    }
  },
  syncTelegram: async (req, res, next) => {
    try {
      const { user } = req

      if (!req.body.telegram) {
        throw new Error("there is no telegram")
      }

      const checktele = await userDa.find({ telegram: req.body.telegram }, { skip: 0, limit: 5 })

      if (checktele.total) {
        throw new Error("telegram telah di gunakan oleh akun lain")
      }

      const userRes = await userDa.findOneByID(user._id)

      await userDa.update({ _id: userRes._id }, { ...userRes, telegram: req.body.telegram })

      return res.json({ message: "menghubungkan telegram berhasil" })
    } catch (error) {
      return next(error)
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      const { user } = req

      if (!req.body.password) {
        throw new Error("password kosong")
      }

      const userRes = await userDa.findOneByID(user._id)

      const isPasswordMatch = bcrypt.compareSync(req.body.oldPassword, user.password)

      if (!isPasswordMatch) {

        throw new Error("ups ada masalah")
      }

      await userDa.update({ _id: userRes._id }, { ...userRes, password: req.body.password })

      return res.json({ message: "ganti password berhasil" })
    } catch (error) {
      return next(error)
    }
  },
  forgetPassword: async (req, res, next) => {
    try {
      if (!req.body.email) {
        throw new Error("email kosong")
      }
      const user = await userDa.findOneByEmail(req.body.email)

      if (!user) {
        throw new Error("tidak ada user dengan email ini")
      }
      const newPassword = shortid.generate()

      await userDa.update({ _id: user._id }, { ...user, password: newPassword })

      await sendMail({ recipient: user.email,
        subject: "reset password",
        message: `open this link to reset password ${web_uri}/reset-password?password=${newPassword}` })

      return res.json({ message: "kami telah mengirimkan email" })
    } catch (error) {
      console.log("=====", error)

      return next(error)
    }
  },
  login: async (req, res, next) => {
    try {
      await joi.validate(req.body, loginSchema, { stripUnknown: true })
      const loginData = { ...req.body }
      const user = await userDa.findOneByEmail(loginData.email)

      if (!user) {
        throw new Error("email or password un match")
      }
      const isPasswordMatch = bcrypt.compareSync(loginData.password, user.password)

      if (!isPasswordMatch) {

        throw new Error("email or password un match")
      }
      Reflect.deleteProperty(user, "password")
      const token = signJwt(user)

      return res.json({ token })

    } catch (error) {
      return next(error)
    }
  }

}

export default userControler
