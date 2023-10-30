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
	const default_css_file = await getFile(config_json[0].file_path);
	const default_css_text = await default_css_file.text();
	ApplyStylesToIndex(config_json);

	async function getFile(url) {
		const response = await fetch(url);
		return response;
	}

	function getTextInput() {
		return $('input[id=avatar_height_text_input]').val();
	}

	async function generateCSS() {
		var adjusted_css_text = default_css_text.replace(/--avatar_height:[^;]*;/, `--avatar_height: ${getTextInput() || '64'}px;`);
		return adjusted_css_text;
	}

	function updateCSSPreview(css_text) {
		// update result_css
		$('#result_css').val(css_text);

		//update result_preview
		var streamkit_css_exists = $('#result_preview').contents().find('#streamkit_css').length; // element.length is 0 if not found, 1 if found
		if (streamkit_css_exists) {
			$('#result_preview').contents().find('#streamkit_css').remove();
		}
		$('#result_preview').contents().find('head').append(`<style id='streamkit_css'>${css_text}</style>`);
	}

	//
	//	inital and event handlers
	//

	var css_text = await generateCSS();
	updateCSSPreview(css_text);

	// text input event handler
	$('input[id=avatar_height_text_input]').on('keyup', async function () {
		css_text = await generateCSS();
		updateCSSPreview(css_text);
	});
});
