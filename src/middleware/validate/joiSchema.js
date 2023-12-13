const { ROLE } = require("#config/database/userRole.js");
const Joi = require("joi");

const userReqSch = Joi.object({
	fullName: Joi.string(),
	userName: Joi.string().alphanum().min(3).max(30),
	password: Joi.string()
		.pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-_@#$%^*()<>]).{8,}$"))
		.required(),
	birth_year: Joi.number().integer().min(1900).max(new Date().getFullYear()),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] },
		})
		.messages({
			"string.email": `Email không đúng định dạng cần có @ và domain (.com hoặc .net)`,
		}),
	avatar: Joi.string(),
	role: Joi.string().valid(ROLE.ADMIN, ROLE.TEACHER, ROLE.STUDENT),
});

module.exports = { userReqSch };
