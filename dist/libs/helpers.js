"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringToQueryObj = exports.parseSort = void 0;

const parseSort = sort => {
  const result = {};

  if (sort) {
    const [param, value] = sort.split(":");
    result[param] = value;
  }

  return result;
};

exports.parseSort = parseSort;

const stringToQueryObj = queries => {
  if (queries) {
    return queries.split(",").reduce((sum, queriPair) => {
      const [keyConstraint, value] = queriPair.split(":");
      const [key, constrain] = keyConstraint.split("-");

      if (value && constrain) {
        const que = {};

        if (constrain === "regex") {
          que[`$${constrain}`] = new RegExp(value);
        } else {
          que[`$${constrain}`] = value;
        }

        sum[key] = que;
      }

      return sum;
    }, {});
  }

  return {};
};

exports.stringToQueryObj = stringToQueryObj;