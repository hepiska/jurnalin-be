import account from "controlers/account"
import { reqUserFromToken } from "libs/jwt"


module.exports = express =>
  new express.Router()
    .use(reqUserFromToken)
    .post("", account.post)
    .put("/:id", account.put)
    .delete("/:id", account.delete)
    .get("/:id", account.getOne)
    .get("", account.get)


