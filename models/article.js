const Sequelize = require("sequelize");
const sql = require("../util/sql");
const Comment = require("./comment");
const Tag = require("./tag");

const Article = sql.define("article", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	title: {
		type: Sequelize.STRING(200),
		notNull: true,
	},
	body: {
		type: Sequelize.TEXT,
		notNull: true,
	},
});

// Relations
Article.hasMany(Comment);
Tag.belongsToMany(Article, { through: "article_tags" });
Article.belongsToMany(Tag, { through: "article_tags" });

module.exports = Article;
