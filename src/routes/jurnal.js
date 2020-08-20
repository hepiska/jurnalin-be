import jurnal from "controlers/jurnal"
import { reqUserFromToken } from "libs/jwt"


module.exports = express =>
  new express.Router()
    .use(reqUserFromToken)
    .post("", jurnal.post)
    .put("/:id", jurnal.put)
    .delete("/:id", jurnal.delete)
    .get("/:id", jurnal.getOne)
    .get("", jurnal.get)


