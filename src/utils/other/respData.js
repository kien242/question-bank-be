const lodash = require('lodash');
const getInfoData = ({filed = [], source = {}}) => {
  return lodash.pick(source, filed);
};
const removeInfoData = ({filed = [], source = {}}) => {
  return lodash.omit(source, filed);
};
module.exports = {getInfoData, removeInfoData};
