async function getConfig(url) {
	const response = await fetch(url);
	return response.json();
}

async function getCSSText(url) {
	const response = await fetch(url);
	return response.text();
}

$(document).ready(async function () {
	const tempalte_list = await getConfig('config.json');
	const css = await getCSSText(tempalte_list[0].file_path);
	$('#result_css').val(css);
	tempalte_list.forEach((template) => {
		// populates selectTemplate dropdown
		// adds all streamkit css files to page, so they are saved an accessible
		document.head.innerHTML += `<link rel="stylesheet" href=${template.file_path} />`;
		var select = document.getElementById('selectTemplate');
		var element = document.createElement('option');
		element.textContent = template.name; // name as name so easy to read ui
		element.value = template.file_path; // value as file_path so can be linked easy later
		select.appendChild(element); // adds html element to index.html
	});

	// event catcher for selectTemplate dropdown
	$('#selectTemplate').change(async function () {
		// 'this' keyword refers to selectTemplate dropdown - line above
		// this.name would be the text in the selectTemplate
		// this.value is like the id - and was also set as the file_path
		var template_file_path = this.value;
		const css = await getCSSText(template_file_path);
		// updates result_css with appropriate file
		$('#result_css').val(css);
		// updates preview_html with appropriate file
		$('#iframe')
			.contents()
			.find('#streamkit_css')
			.attr('href', template_file_path);
	});
});
