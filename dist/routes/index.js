"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createRouter = express => {
  const router = new express.Router();

  _fs.default.readdirSync(`${__dirname}/`).filter(file => file.indexOf(".js") >= 0 && file !== "index.js").forEach(route => {
    const routeName = route.replace(".js", "");

    const routeFunction = require(`${__dirname}/${route}`)(express);

    router.use(`/${routeName}`, routeFunction);
  });

  return router;
};

var _default = createRouter;
exports.default = _default;