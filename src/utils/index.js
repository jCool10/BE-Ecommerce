const _ = require("lodash");

const getInfoData = ({ field = [], object = {} }) => _.pick(object, field);

const getSelectData = (select = []) => Object.fromEntries(select.map((el) => [el, 1]));

const unGetSelectData = (select = []) => Object.fromEntries(select.map((el) => [el, 0]));

const removeUndefinedObject = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] == null) {
      delete obj[key];
    }
  });

  return obj;
};

const updateNestedObjectParser = (obj) => {
  console.log("obj", obj);
  const final = {};

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      const response = updateNestedObjectParser(obj[key]);

      Object.keys(response).forEach((keyRes) => {
        final[`${key}.${keyRes}`] = response[keyRes];
      });
    } else {
      final[key] = obj[key];
    }
  });

  console.log("final", final);
  return final;
};

module.exports = { getInfoData, getSelectData, unGetSelectData, removeUndefinedObject, updateNestedObjectParser };
