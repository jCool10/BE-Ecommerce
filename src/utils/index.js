const _ = require("lodash");

const getInfoData = ({ field = [], object = {} }) => _.pick(object, field);

module.exports = { getInfoData };
