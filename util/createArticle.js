const Article = require("../models/article");
const Tag = require("../models/tag");

function createArticle(info) {
	// Require title and body
	if (!info.title) {
		return Promise.reject(new Error("Title is required"));
	}
	else if (!info.body) {
		return Promise.reject(new Error("Body is required"));
	}

	// Create the article
	return Article.create({
		title: info.title,
		body: info.body,
	});
}

module.exports = createArticle;
