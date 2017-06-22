const renderTemplate = require("./renderTemplate");

function render404(res) {
	res.status(404);
	renderTemplate(res, "Not Found", "404");
}

module.exports = render404;
