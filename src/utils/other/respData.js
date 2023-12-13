const lodash = require("lodash");
const getInfoData = ({ filed = [], source = {} }) => {
	return lodash.pick(source, filed);
};

module.exports = { getInfoData };
