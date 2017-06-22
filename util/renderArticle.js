const Article = require("../models/article");
const renderTemplate = require("./renderTemplate");
const render404 = require("./render404");

function renderArticle(res, articleId) {
	let article;
	let comments;

	Article.findById(articleId)
		// First make sure we got the article
		.then(function(art) {
			if (art) {
				article = art;
				return article.getComments();
			}
			else {
				throw new Error("Missing article!");
			}
		})
		// Then grab its comments
		.then(function(com) {
			comments = com;
			return article.getTags();
		})
		// Finally grab its tags, then we can render with all 3
		.then(function(tags) {
			renderTemplate(res, article.get("title"), "article", {
				article: article,
				comments: comments,
				tags: tags,
			});
		})
		// If anything goes wrong, 404 and log an error
		.catch(function(err) {
			console.log(err);
			render404(res);
		});
}

module.exports = renderArticle;
