import auth from "controlers/auth"
import { reqUserFromToken } from "libs/jwt"


module.exports = express =>
  new express.Router()
    .post("/register", auth.register)
    .post("/login", auth.login)
    .post("/forget-password", auth.forgetPassword)
    .post("/reset-password", auth.resetPassword)
    .use(reqUserFromToken)
    .post("/sync/telegram", auth.syncTelegram)


