const Sequelize = require("sequelize");
const sql = require("../util/sql");

const Tag = sql.define("tag", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: Sequelize.STRING(64),
		unique: true,
		notNull: true,
	},
});

module.exports = Tag;
