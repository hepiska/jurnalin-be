import company from "controlers/company"
import { reqUserFromToken } from "libs/jwt"


module.exports = express =>
  new express.Router()
    .use(reqUserFromToken)
    .post("", company.post)
    .put("/:id", company.put)
    .delete("/:id", company.delete)
    .get("/:id", company.getOne)
    .get("", company.get)


