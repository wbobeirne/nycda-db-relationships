require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const Article = require("./models/article");
const Comments = require("./models/comment");
const Tag = require("./models/tag");

const sql = require("./util/sql");
const createArticle = require("./util/createArticle");
const renderArticle = require("./util/renderArticle");
const renderTemplate = require("./util/renderTemplate");
const render404 = require("./util/render404");

// -------- CONFIG -------- //
const app = express();
app.set("view engine", "ejs");
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({ extended: true }));


// -------- ROUTES -------- //

// Render the homepage, articles most recent at the top
app.get("/", function(req, res) {
	Article.findAll({ order: [['createdAt', 'DESC']] }).then(function(articles) {
		renderTemplate(res, "Home", "home", { articles: articles });
	});
});



// Render the new article form
app.get("/add", function(req, res) {
	renderTemplate(res, "Add an Article", "add", {
		title: "",
		body: "",
		tags: "",
	});
});

// Handle the POST from the new article form in views/pages/add.ejs
app.post("/add", function(req, res) {
	createArticle(req.body).then(function(article) {
		res.redirect("/article/" + article.get("id"));
	})
	.catch(function(err) {
		renderTemplate(res, "Add an Article", "add", {
			title: req.body.title,
			body: req.body.body,
			tags: req.body.tags,
			error: err.message,
		});
	});
});



// Render an individual article
app.get("/article/:articleId", function(req, res) {
	renderArticle(res, req.params.articleId);
});



// Post a new comment about an article
app.post("/comment", function(req, res) {
	if (!req.body.articleId || !req.body.name || !req.body.body) {
		return res.status(500).send("Missing required comment field");
	}

	Article.findById(req.body.articleId).then(function(article) {
		if (article) {
			article.createComment({
				name: req.body.name,
				body: req.body.body,
			})
			.then(function() {
				res.redirect("/article/" + article.get("id"));
			});
		}
		else {
			render404(res);
		}
	});
});


// Catch-all 404 page!
app.all("*", function(req, res) {
	render404(res);
});

// -------- STARTUP -------- //
sql.sync().then(function() {
	const port = process.env.PORT || 3000;
	app.listen(port, function() {
		console.log("App available at http://localhost:" + port);
	});
});
