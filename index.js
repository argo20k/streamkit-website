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
		let html_value = '';
		input_options_config_json.forEach((element) => {
			if (!element['is_mod'] && !element['is_editable']) {
				// iterate through all multiple choice options under that radio group (name), and find which one is checked,
				// and get the id of that option, and set the html_value to the value of that option
				$(`#${element['css_property_key']}`)
					.children()
					.each(function () {
						if ($(this).is(':checked')) {
							html_value = $(this).val();
						}
					});
			} else {
				if (element['is_editable']) {
					html_value = $(`input[id=${element['css_property_key']}]`).val();
				} else {
					html_value = $(`input[id=mod_checkbox_${element['css_property_key']}]`).val();
				}
			}
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
			$('#input_options').append($(`<label for="mod_checkbox_${option['css_property_key']}">${option['label_text']}: </label>`));
			if (option['is_mod']) {
				if (option['is_editable']) {
					// enable/disable - allows editing - mod styles
					$('#input_options').append($(`<input type="checkbox" name="${option['css_property_key']}" id="mod_checkbox_${option['css_property_key']}" />`));
				} else {
					// enable/disable - directly changes - mod styles
					$('#input_options').append($(`<input type="checkbox" name="${option['css_property_key']}" id="mod_checkbox_${option['css_property_key']}" /><br />`));
				}
			} else {
				if (!option['is_editable']) {
					// multiple choice radios styles
					$('#input_options').append($(`<div id="${option['css_property_key']}"></div>`));
					option['multiple_choice_options'].forEach((multiple_choice_option) => {
						$(`#${option['css_property_key']}`).append($(`<input type="radio" name="${option['css_property_key']}" value="${multiple_choice_option}" />`));
					});
				}
			}
			if (option['is_editable']) {
				// text inputs for editable base and mod styles
				$('#input_options').append($(`<input type="text" id="${option['css_property_key']}" /><br />`));
			}
		});
	}

	async function generateCSS() {
		current_css_text = default_css_text;
		let input_values = getInputValues();
		input_values.forEach((element) => {
			current_css_text = current_css_text.replace(new RegExp(`--${element.css_property_key}:[^;]*;`), `--${element.css_property_key}: ${element.html_value};`);
		});
	}

	function updateInputOptions(specific_mod_element) {
		let temp_input_options_config_json = input_options_config_json;
		if (specific_mod_element) {
			// updating a specific element (typically mod element)
			input_options_config_json.forEach((element) => {
				if (element['css_property_key'] === specific_mod_element) {
					temp_input_options_config_json = [element];
				}
			});
		}
		// updating elements
		temp_input_options_config_json.forEach((element) => {
			if (element['is_mod']) {
				// update mod options
				let mod_checkbox_element = $(`input[id=${getModCheckboxDOMID(element)}]`);
				if (!element['is_editable']) {
					if (mod_checkbox_element.is(':checked')) {
						$(`input[id=mod_checkbox_${element['css_property_key']}]`).val(element['default_mod_value']);
					} else {
						$(`input[id=mod_checkbox_${element['css_property_key']}]`).val(element['default_base_value']);
					}
				} else {
					if (mod_checkbox_element.is(':checked')) {
						$(`input[id=${element['css_property_key']}]`).prop('readonly', false);
						$(`input[id=${element['css_property_key']}]`).val(element['default_mod_value']);
					} else {
						$(`input[id=${element['css_property_key']}]`).prop('readonly', true);
						$(`input[id=${element['css_property_key']}]`).val(element['default_base_value']);
					}
				}
			} else {
				// update base options
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
	const default_css_text = await (await getFile('styles/00-default.css')).text();
	let current_css_text;

	generateInputOptions();
	updateInputOptions();
	await generateCSS();
	updateCSSPreview();

	//
	//	event handlers
	//

	// form change event handler
	$('form').on('input', async function () {
		await generateCSS();
		updateCSSPreview();
	});

	// mod check box event handler
	input_options_config_json.forEach((element) => {
		let mod_checkbox_element = $(`input[id=${getModCheckboxDOMID(element)}]`);
		let temp_element = '';
		if (element['is_mod']) {
			temp_element = mod_checkbox_element;
		} else {
			temp_element = $(`div[id=${element['css_property_key']}]`);
		}
		temp_element.change(async function () {
			updateInputOptions(element['css_property_key']);
			await generateCSS();
			updateCSSPreview();
		});
	});
});
