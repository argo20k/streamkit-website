//
//	foundational functions
//

// adds streamkit css styles to index.html, so the styles, and text in the files are accessible to fetch later
function ApplyStylesToIndex(config_template_list) {
	config_template_list.forEach((template) => {
		document.head.innerHTML += `<link rel="stylesheet" href=${template.file_path} />`;
	});
}

//
//	main functions
//

// will run once the entire page (images or iframes), not just the DOM, is ready
$(document).ready(async function () {
	const config_file = await getFile('config.json');
	const config_json = await config_file.json();
	const html_config = generateHTMLConfig();

	const default_css_file = await getFile(config_json[0].file_path);
	const default_css_text = await default_css_file.text();
	ApplyStylesToIndex(config_json);

	async function getFile(url) {
		const response = await fetch(url);
		return response;
	}

	function isModCheckbox(html_element_id) {
		return /^mod_checkbox/.test(html_element_id);
	}

	function getInputValues() {
		let option_values = [];
		html_config.forEach((element) => {
			if (!isModCheckbox(element['html_element_id'])) {
				let html_value = $(`input[id=${element['html_element_id']}]`).val();
				let option_value = {
					id: element['id'],
					html_element_id: element['html_element_id'],
					html_value: html_value,
				};
				option_values.push(option_value);
			}
		});
		return option_values;
	}

	function getModCheckboxElement(html_element) {
		let mod_checkbox_element = '';
		$('form input, form select').each(function (index) {
			let input = $(this);
			if (input.attr('name') === html_element.attr('id') && isModCheckbox(input.attr('id'))) {
				mod_checkbox_element = input;
			}
		});
		return mod_checkbox_element;
	}
	html_config;
	function generateHTMLConfig(default_css_text) {
		let html_config = [];
		$('form input, form select').each(function (index) {
			let input = $(this);
			let mod_checkbox_element = getModCheckboxElement(input);
			let mod_checkbox_id = 'none';
			if (mod_checkbox_element) {
				mod_checkbox_id = mod_checkbox_element.attr('id');
			}

			html_config.push({
				id: index,
				html_element_id: input.attr('id'),
				mod_checkbox_id: mod_checkbox_id,
				default_base_value: 'none',
				default_mod_value: 'none',
			});
		});
		return html_config;
	}

	async function generateCSS() {
		// 50 is hard coded, make sure this default value is grabbed from the original template instead
		// return adjusted_css_text;
		let adjusted_css_text = default_css_text;
		option_values = getInputValues();
		option_values.forEach((element) => {
			adjusted_css_text = adjusted_css_text.replace(new RegExp(`--${element.html_element_id}:[^;]*;`), `--${element.html_element_id}: ${element.html_value};`);
		});
		return adjusted_css_text;
	}

	function updateCSSPreview(css_text) {
		// update result_css
		$('#result_css').val(css_text);

		//update result_preview
		let streamkit_css_exists = $('#result_preview').contents().find('#streamkit_css').length; // element.length is 0 if not found, 1 if found
		if (streamkit_css_exists) {
			$('#result_preview').contents().find('#streamkit_css').remove();
		}
		$('#result_preview').contents().find('head').append(`<style id='streamkit_css'>${css_text}</style>`);
	}

	function updateModOptions() {
		// read only and mod option reset
		html_config.forEach((element) => {
			checkbox_element = $(`input[id=${element['mod_checkbox_id']}]`);
			if (checkbox_element.is(':checked')) {
				$(`input[id=${element['html_element_id']}]`).attr('readonly', false);
			} else {
				$(`input[id=${element['html_element_id']}]`).attr('readonly', true);
			}
		});
	}

	//
	//	inital
	//

	let css_text = await generateCSS();
	updateCSSPreview(css_text);
	updateModOptions();

	//
	//	event handlers
	//

	// form change event handler
	// $('form').on('keyup change paste', 'input, select, textarea', function () {
	$('form').on('input', async function () {
		css_text = await generateCSS();
		updateCSSPreview(css_text);
	});

	// mod check box handler
	html_config.forEach((element) => {
		checkbox_element = $(`input[id=${element['mod_checkbox_id']}]`);
		checkbox_element.change(function () {
			updateModOptions();
		});
	});
});
