const Sequelize = require("sequelize");
const sql = require("../util/sql");

const Comment = sql.define("comment", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: Sequelize.STRING(64),
		notNull: true,
	},
	body: {
		type: Sequelize.STRING(500),
		notNull: true,
	},
});

module.exports = Comment;
