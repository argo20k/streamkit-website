$(document).ready(function () {
	document.head.innerHTML +=
		'<link rel="stylesheet" href="styles/streamkit/test1.css" />';

	var links = document.getElementsByTagName('link');

	for (let i = 0; i < links.length; i++) {
		console.log(`jimmy`, links[i].href);
	}
});
