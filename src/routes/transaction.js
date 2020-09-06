import transaction from "controlers/transaction"
import { reqUserFromToken } from "libs/jwt"


module.exports = express =>
  new express.Router()
    .get("/success", transaction.success)
    .get("/failed", transaction.failed)
    .get("/callback", transaction.callback)
    .use(reqUserFromToken)
    .post("", transaction.post)
    .post("/subcribe", transaction.subcribe)
    .put("/:id", transaction.put)
    .delete("/:id", transaction.delete)
    .get("/:id", transaction.getOne)
    .get("", transaction.get)


