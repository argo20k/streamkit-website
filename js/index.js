async function getConfig(url) {
	const response = await fetch(url);
	return response.json();
}

async function getCSSText(url) {
	const response = await fetch(url);
	return response.text();
}

async function start() {
	// this function runs when the page is ready
	const config = await getConfig('config.json');
	var tempalte_list = config;
	const css = await getCSSText(tempalte_list[0].file_path);
	$('#result_css').val(css);
}

$(document).ready(async function () {
	start();
	const config = await getConfig('config.json');

	var tempalte_list = config;
	tempalte_list.forEach((template) => {
		// adds all streamkit css files to page, so they are saved an accessible
		document.head.innerHTML += `<link rel="stylesheet" href=${template.file_path} />`;
		// populates selectTemplate dropdown
		var select = document.getElementById('selectTemplate');
		var element = document.createElement('option');
		element.textContent = template.name; // name as name so easy to read ui
		element.value = template.file_path; // value as file_path so can be linked easy later
		select.appendChild(element);
	});

	// change events for selectTemplate dropdown
	$('#selectTemplate').change(async function () {
		var template_file_path = this.value;
		const css = await getCSSText(template_file_path);
		// dynamically updates result_css with appropriate template selected from dropdown
		$('#result_css').val(css);
		// $('#iframe').contents().find('head').html('<div> blah </div>');
		$('#iframe')
			.contents()
			.find('#streamkit_css')
			.attr('href', template_file_path);
	});
});
