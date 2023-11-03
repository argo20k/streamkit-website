// will run once the entire page (including images and iframes, not just the DOM), is ready
$(document).ready(async function () {
	async function getFile(url) {
		const response = await fetch(url);
		return response;
	}

	function getOptionValues() {
		let option_values = [];
		let html_value = '';
		input_options_config_json.forEach((element) => {
			let option_parent_div = $(`#${element['css_property_key']}`); // change name to option_parent_div - option_mod_checkbox_element

			html_value = option_parent_div.val();
			let option_value = {
				id: element['id'],
				css_property_key: element['css_property_key'],
				html_value: html_value,
			};
			option_values.push(option_value);
		});
		return option_values;
	}

	function generateOptions() {
		input_options_config_json.forEach((option) => {
			$('#input_options').append($(`<div id="${option['css_property_key']}"></div>`));
			div = $(`#${option['css_property_key']}`);

			div.append($(`<label for="${option['css_property_key']}">${option['label_text']}: </label>`));
			if (option['is_mod']) {
				// enable/disable - mod styles
				div.append($(`<input type="checkbox" name="mod_checkbox_${option['css_property_key']}" />`));
			} else {
				if (!option['is_editable']) {
					// multiple choice radios styles
					option['multiple_choice_options'].forEach((multiple_choice_option) => {
						div.append($(`<input type="radio" name="radio_${option['css_property_key']}" value="${multiple_choice_option}" />`));
					});
				}
			}
			if (option['is_editable']) {
				// text inputs for editable base and mod styles
				div.append($(`<input type="text" name="${option['css_property_key']}" />`));
			}
		});
	}

	async function generateCSS() {
		let input_values = getOptionValues();
		input_values.forEach((element) => {
			current_css_text = current_css_text.replace(new RegExp(`--${element.css_property_key}:[^;]*;`), `--${element.css_property_key}: ${element.html_value};`);
		});
	}

	function setOptionValue(specific_option) {
		input_options_config_json.forEach((element) => {
			let option_parent_div = $(`#${element['css_property_key']}`);
			if (element['css_property_key'] === specific_option.attr('name')) {
				option_parent_div.val(specific_option.val() || element['default_base_value']);
				if (element['inherits_to']) {
					input_options_config_json.forEach((inh_to_element) => {
						if (inh_to_element['css_property_key'] === element['inherits_to']) {
							let inh_to_option_parent_div = $(`#${inh_to_element['css_property_key']}`);
							let inh_to_element_mod_checkbox_element = inh_to_option_parent_div.children('input[name^="mod_checkbox_"]');
							let inh_element_editable_element = inh_to_option_parent_div.children(`input[name="${inh_to_element['css_property_key']}"]`);
							if (!inh_to_element_mod_checkbox_element.is(':checked')) {
								inh_element_editable_element.val(option_parent_div.val());
								inh_to_option_parent_div.val(inh_element_editable_element.val());

								console.log(inh_element_editable_element.attr('name'));
							}
						}
					});
				}
			}
		});
	}

	function setOptionToDefault(specific_option, input_type) {
		let specific_option_css_property_key = 'none';
		input_options_config_json.forEach((element) => {
			if (input_type === 'checkbox') {
				specific_option_css_property_key = specific_option.attr('name').replace(new RegExp(`mod_checkbox_`), '');
			} else if (input_type === 'radio') {
				specific_option_css_property_key = specific_option.attr('name').replace(new RegExp(`radio_`), '');
			}
			let option_parent_div = $(`#${element['css_property_key']}`);
			let element_editable_element = option_parent_div.children(`input[name="${element['css_property_key']}"]`);
			if (element['css_property_key'] === specific_option_css_property_key) {
				if (input_type === 'checkbox') {
					if (specific_option.is(':checked')) {
						// base/mod fall back value (||) for non-editable mods, that do not have a .val(), from the UI element (text input), to get from the previous line
						element_editable_element.prop('readonly', false);
						element_editable_element.val(element['default_mod_value']);
						option_parent_div.val(element_editable_element.val() || element['default_mod_value']);
					} else {
						element_editable_element.prop('readonly', true);
						element_editable_element.val(element['default_base_value']);
						option_parent_div.val(element_editable_element.val() || element['default_base_value']);
					}
					if (element['inherits_to']) {
						// handles default values for options that get inherited to other options
						input_options_config_json.forEach((inh_to_element) => {
							let inh_to_option_parent_div = $(`#${inh_to_element['css_property_key']}`);
							let inh_to_element_mod_checkbox_element = inh_to_option_parent_div.children('input[name^="mod_checkbox_"]');
							let inh_to_element_editable_element = inh_to_option_parent_div.children(`input[name="${inh_to_element['css_property_key']}"]`);
							if (element['inherits_to'] === inh_to_element['css_property_key']) {
								if (!inh_to_element_mod_checkbox_element.is(':checked')) {
									if (specific_option.is(':checked')) {
										inh_to_element_editable_element.val(option_parent_div.val());
										inh_to_option_parent_div.val(inh_to_element_editable_element.val());
									} else {
										inh_to_element_editable_element.val(inh_to_element['default_base_value']);
										inh_to_option_parent_div.val(inh_to_element_editable_element.val());
									}
								}
							}
						});
					}
					if (element['inherits_from']) {
						// handles default values for options that inheirt values from another option
						input_options_config_json.forEach((inh_from_element) => {
							let inh_from_option_parent_div = $(`#${inh_from_element['css_property_key']}`);
							let inh_from_element_mod_checkbox_element = inh_from_option_parent_div.children('input[name^="mod_checkbox_"]');
							if (element['inherits_from'] === inh_from_element['css_property_key']) {
								if (inh_from_element_mod_checkbox_element.is(':checked')) {
									if (!specific_option.is(':checked')) {
										element_editable_element.val(inh_from_option_parent_div.val());
										option_parent_div.val(element_editable_element.val());
									}
								}
							}
						});
					}
				} else if (input_type === 'radio') {
					option_parent_div.children().each(function () {
						if ($(this).is(':checked')) {
							option_parent_div.val($(this).val());
						}
					});
				}
			}
		});
	}

	function setAllOptionsToDefault() {
		// setting all elements
		input_options_config_json.forEach((element) => {
			let option_parent_div = $(`#${element['css_property_key']}`);
			let element_editable_element = option_parent_div.children(`input[name="${element['css_property_key']}"]`);
			if (element['is_editable']) {
				// set editable element styles to default  (usually text input element)
				element_editable_element.attr('placeholder', element['default_base_value']);
				element_editable_element.val(element['default_base_value']);
				option_parent_div.val(element_editable_element.val());
			}
			if (element['is_mod']) {
				// set mods to readonly by default (since mods should be disabled by default)
				element_editable_element.prop('readonly', true);
			}
			if (!element['is_editable']) {
				// set radio + on/off styles to default (sets parent div to default value)
				option_parent_div.val(element['default_base_value']);
			}
			if (!element['is_editable'] && !element['is_mod']) {
				// set radio styles to default (select radio of default base value)
				option_parent_div.children().each(function () {
					if ($(this).val() === element['default_base_value']) {
						$(this).prop('checked', true);
					}
				});
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
	let current_css_text = default_css_text;

	generateOptions();
	setAllOptionsToDefault();
	await generateCSS();
	updateCSSPreview();

	//
	//	event handlers
	//

	input_options_config_json.forEach(async (element) => {
		let option_parent_div = $(`#${element['css_property_key']}`);
		let element_mod_checkbox_element = option_parent_div.children('input[name^="mod_checkbox_"]');
		let radio_base_element = option_parent_div.children('input[name^="radio_"]');
		let text_input_element = option_parent_div.children(`input[name="${element['css_property_key']}"]`);

		// input element event handlers
		element_mod_checkbox_element.on('input', async function () {
			setOptionToDefault(element_mod_checkbox_element, 'checkbox');
		});
		radio_base_element.on('input', async function () {
			setOptionToDefault(radio_base_element, 'radio');
		});
		text_input_element.on('input', async function () {
			setOptionValue(text_input_element);
		});
	});

	// form event handler
	$(`#input_options`).on('input', async function () {
		await generateCSS();
		updateCSSPreview();
	});
});
