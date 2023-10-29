$(document).ready(async function () {
	async function getData(url) {
		const response = await fetch(url);
		var text = await response.text();
		return text;
	}

	const data = await getData('config.json');

	// jQuery methods go here...
	// $('#selectTemplate').hide();
	var tempalte_list = JSON.parse(data);
	tempalte_list.forEach((template) => {
		document.head.innerHTML += `<link rel="stylesheet" href=${template.file_path} />`;
	});
});
