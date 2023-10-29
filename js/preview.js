$(document).ready(function () {
	document.head.innerHTML +=
		'<link rel="stylesheet" href="styles/test1.css" />';
	// document.head.innerHTML +=
	// 	'<link rel="stylesheet" href="styles/test2.css" />';

	var links = document.getElementsByTagName('link');

	for (let i = 0; i < links.length; i++) {
		// Do stuff
		console.log(`jimmy`, links[i].href);
	}
});
