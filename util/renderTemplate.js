function renderTemplate(res, title, page, args) {
	res.render("template", {
		title: title,
		page: page,
		pageArgs: args,
	});
}

module.exports = renderTemplate;
