//
//	main functions
//

// will run once the entire page (images or iframes), not just the DOM, is ready
$(document).ready(async function () {
	async function getFile(url) {
		const response = await fetch(url);
		return response;
	}

	function getModCheckboxDOMID(html_element) {
		return `mod_checkbox_${html_element['css_property_key']}`;
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

	function generateInputOptions() {
		input_options_config_json.forEach((option) => {
			$('#input_options').append($(`<label for="mod_checkbox_${option['css_property_key']}">${option['label_text']}:</label>`));
			$('#input_options').append($(`<input type="checkbox" name="${option['css_property_key']}" id="mod_checkbox_${option['css_property_key']}" />`));
			$('#input_options').append($(`<input type="text" id="${option['css_property_key']}" value="${option['default_base_value']}" /><br />`));
		});
	}

	async function generateCSS() {
		current_css_text = default_css_text;
		let input_values = getInputValues();
		input_values.forEach((element) => {
			current_css_text = current_css_text.replace(new RegExp(`--${element.css_property_key}:[^;]*;`), `--${element.css_property_key}: ${element.html_value};`);
		});
	}

	function updateModOptions(specific_mod_element) {
		// updating because of one element being changed (mod checkbox triggers)
		let temp_input_options_config_json = input_options_config_json;
		if (specific_mod_element) {
			input_options_config_json.forEach((element) => {
				if (element['css_property_key'] === specific_mod_element) {
					temp_input_options_config_json = [element];
				}
			});
		}
		// updating from all elements (initial)
		temp_input_options_config_json.forEach((element) => {
			let mod_checkbox_element = $(`input[id=${getModCheckboxDOMID(element)}]`);
			if (mod_checkbox_element.is(':checked')) {
				$(`input[id=${element['css_property_key']}]`).prop('readonly', false);
				$(`input[id=${element['css_property_key']}]`).val(element['default_mod_value']);
			} else {
				$(`input[id=${element['css_property_key']}]`).prop('readonly', true);
				$(`input[id=${element['css_property_key']}]`).val(element['default_base_value']);
			}
		});
	}

	function updateCSSPreview() {
		// update result_css
		$('#result_css').val(current_css_text);

		//update result_preview
		let streamkit_css_exists = $('#result_preview').contents().find('#streamkit_css').length; // element.length is 0 if not found, 1 if found
		if (streamkit_css_exists) {
			$('#result_preview').contents().find('#streamkit_css').remove();
		}
		$('#result_preview').contents().find('head').append(`<style id='streamkit_css'>${current_css_text}</style>`);
	}

	//
	//	inital
	//

	const input_options_config_json = await (await getFile('input-options-config.json')).json();
	const default_css_text = await (await getFile('styles/streamkit/00-default.css')).text();
	let current_css_text;

	generateInputOptions();
	await generateCSS();
	updateCSSPreview();
	updateModOptions();

	//
	//	event handlers
	//

	// form change event handler
	// $('form').on('keyup change paste', 'input, select, textarea', function () {
	$('form').on('input', async function () {
		await generateCSS();
		updateCSSPreview();
	});

	// mod check box event handler
	input_options_config_json.forEach((element) => {
		let mod_checkbox_element = $(`input[id=${getModCheckboxDOMID(element)}]`);
		mod_checkbox_element.change(async function () {
			updateModOptions(element['css_property_key']);
			await generateCSS();
			updateCSSPreview();
		});
	});
});
