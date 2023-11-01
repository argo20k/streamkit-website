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
	async function getFile(url) {
		const response = await fetch(url);
		return response;
	}

	function getModCheckboxID(html_element) {
		return `mod_checkbox_${html_element['css_property_key']}`;
	}

	function generateInputOptions() {
		input_options_config_json.forEach((option) => {
			$('#input_options').append($(`<label for="mod_checkbox_${option['css_property_key']}">${option['label_text']}:</label>`));
			$('#input_options').append($(`<input type="checkbox" name="${option['css_property_key']}" id="mod_checkbox_${option['css_property_key']}" />`));
			$('#input_options').append($(`<input type="text" id="${option['css_property_key']}" value="${option['default_base_value']}" /><br />`));
		});
	}

	async function generateCSS() {
		let adjusted_css_text = default_css_text;
		input_values = getInputValues();
		input_values.forEach((element) => {
			adjusted_css_text = adjusted_css_text.replace(
				new RegExp(`--${element.css_property_key}:[^;]*;`),
				`--${element.css_property_key}: ${element.html_value};`
			);
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
		// read only
		input_options_config_json.forEach((element) => {
			checkbox_element = $(`input[id=${getModCheckboxID(element)}]`);
			if (checkbox_element.is(':checked')) {
				$(`input[id=${element['css_property_key']}]`).attr('readonly', false);
			} else {
				$(`input[id=${element['css_property_key']}]`).attr('readonly', true);
			}
		});
		//	 and mod option reset (not done yet)
	}

	function getInputValues() {
		let input_values = [];
		input_options_config_json.forEach((element) => {
			let html_value = $(`input[id=${element['css_property_key']}]`).val();
			let option_value = {
				id: element['id'],
				css_property_key: element['css_property_key'],
				html_value: html_value,
			};
			input_values.push(option_value);
		});
		return input_values;
	}

	//
	//	inital
	//

	const config_json = await (await getFile('config.json')).json();
	const input_options_config_json = await (await getFile('input-options-config.json')).json();
	// const default_css_text = await (await getFile(config_json[0].file_path)).text();
	const default_css_text = await (await getFile(config_json[1].file_path)).text();
	ApplyStylesToIndex(config_json);

	generateInputOptions();
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

	// mod check box event handler
	input_options_config_json.forEach((element) => {
		checkbox_element = $(`input[id=${getModCheckboxID(element)}]`);
		checkbox_element.change(function () {
			updateModOptions();
		});
	});
});
