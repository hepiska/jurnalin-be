"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.connectDb = exports.mongo = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _fs = _interopRequireDefault(require("fs"));

var _mongooseDelete = _interopRequireDefault(require("mongoose-delete"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable func-style */

/* eslint-disable no-invalid-this */
// eslint-disable-next-line
function toJsonPlugins(schema, options) {
  // eslint-disable-next-line
  schema.methods.toJson = function () {
    return JSON.parse(JSON.stringify(this));
  }; // eslint-disable-next-line


  schema.statics.toJson = function (input) {
    return JSON.parse(JSON.stringify(input));
  };
}

const imageServicesUri = process.env.IMAGE_SERVICE_URI;

function imageUriPlugin(schema, options) {
  // eslint-disable-next-line
  // eslint-disable-next-line
  schema.pre('save', function (next) {
    if (this.images) {
      this.images = this.images.map(im => im.replace(imageServicesUri, ""));
    }

    if (this.image) {
      this.image = this.image.replace(imageServicesUri, "");
    }

    next();
  }); // schema.post('findOne', function(doc){
  //   console.log(doc)
  //     // if(doc.image){
  //     //   doc.image = doc.image.replace(imageServicesUri,'')
  //     //   doc.image = imageServicesUri + doc.image
  //     // }
  // })

  schema.post(["find", "findOne"], docs => {
    if (Array.isArray(docs)) {
      docs = docs.map(doc => {
        if (doc.images) {
          doc.images = doc.images.map(image => {
            image = image.replace(imageServicesUri, "");
            image = imageServicesUri + image;
            return image;
          });
        }

        return doc;
      });
    } else if (docs && docs.image) {
      docs.image = docs.image.replace(imageServicesUri, "");
      docs.image = imageServicesUri + docs.image;
    }
  }); // eslint-disable-next-line

  schema.statics.toJson = function (input) {
    return JSON.parse(JSON.stringify(input));
  };
}

const uri = process.env.NODE_ENV === "test" ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;
const dbConfig = {
  uri: uri,
  options: {
    keepAlive: 1,
    autoIndex: false,
    promiseLibrary: global.Promise,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
};
const db = {
  mongo: {},
  mongoose: _mongoose.default
};

if (process.env.NODE_ENV === "development") {
  _mongoose.default.set("debug", true);
}

_mongoose.default.plugin(toJsonPlugins);

_mongoose.default.plugin(imageUriPlugin);

_mongoose.default.plugin(_mongooseDelete.default, {
  overrideMethods: "all"
});

_mongoose.default.set("useNewUrlParser", true);

_mongoose.default.set("useFindAndModify", false);

_mongoose.default.set("useCreateIndex", true);

_fs.default.readdirSync(`${__dirname}/`).filter(file => file.indexOf(".js") >= 0 && file !== "index.js").forEach(model => {
  const modelName = model.replace(".js", "").replace("-", "");

  const currentModel = require(`${__dirname}/${model}`);

  if (currentModel.default.base instanceof _mongoose.default.Mongoose) {
    // do mongo/mongoose
    db.mongo[modelName] = currentModel.default;
  }
});

const {
  mongo
} = db;
/**
 * connect th db function
 * @return  {void}
 **/

exports.mongo = mongo;

const connectDb = async () => {
  try {
    const connection = await _mongoose.default.connect(dbConfig.uri, dbConfig.options);
    return connection;
  } catch (error) {
    throw error;
  }
};

exports.connectDb = connectDb;
var _default = db;
exports.default = _default;