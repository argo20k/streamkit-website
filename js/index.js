$(document).ready(async function () {
	async function getData(url) {
		const response = await fetch(url);
		return response.json();
	}

	const data = await getData('config.json');

	// jQuery methods go here...
	// $('#selectTemplate').hide();
	var tempalte_list = data;
	tempalte_list.forEach((template) => {
		document.head.innerHTML += `<link rel="stylesheet" href=${template.file_path} />`;
	});
});
