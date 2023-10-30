async function getConfig(url) {
	const response = await fetch(url);
	return response.json();
}

async function getCSSText(url) {
	const response = await fetch(url);
	return response.text();
}

$(document).ready(async function () {
	const config = await getConfig('config.json');
	var tempalte_list = config;
	document.head.innerHTML += `<link rel="stylesheet" id="default_template_streamkit_css" href=${tempalte_list[0].file_path} />`;
	document.head.innerHTML += `<link rel="stylesheet" id="streamkit_css" href=${tempalte_list[0].file_path} />`;
});
