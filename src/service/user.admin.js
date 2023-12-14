const { QUERY } = require("#config/customQuery.js");

const AdminService = {
	getUserProfile: async (req) => {
		const typeUser = req.query[QUERY.TYPE_USER];
		console.log(typeUser);
	},
};

module.exports = { AdminService };
