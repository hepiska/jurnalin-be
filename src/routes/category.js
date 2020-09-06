import category from "controlers/category"
import { reqUserFromToken } from "libs/jwt"


module.exports = express =>
  new express.Router()
    .use(reqUserFromToken)
    .post("", category.post)
    .put("/:id", category.put)
    .delete("/:id", category.delete)
    .get("/:id", category.getOne)
    .get("", category.get)


