var template_config_file = 'config.json';

$(document).ready(function () {
	var select = document.getElementById('selectTemplate');
	fetch(template_config_file)
		.then((res) => res.text())
		.then((text) => {
			var templates = JSON.parse(text);

			for (const count in templates) {
				if (Object.hasOwnProperty.call(templates, count)) {
					const template = templates[count];
					// adds config template stylesheet to index.html to add it to the server files
					document.head.innerHTML += `<link rel="stylesheet" href=${template.file_path} />`;
					// fills selectTemplate dropdown with config template names
					var el = document.createElement('option');
					el.textContent = template['name'];
					el.value = template['name'];
					select.appendChild(el);
					// adds first selectTemplate option to result_css
					if (count == 0) {
						fetch(template['file_path'])
							.then((res) => res.text())
							.then((text) => {
								$('#result_css').val(text);
							})
							.catch((e) => console.error(e));
					}
				}
			}
		})
		.catch((e) => console.error(e));
});

function leaveChange(control) {
	console.log(control.value);

	fetch(template_config_file)
		.then((res) => res.text())
		.then((text) => {
			var templates = JSON.parse(text);
			for (const count in templates) {
				if (Object.hasOwnProperty.call(templates, count)) {
					const template = templates[count];
					if (template['name'] == control.value) {
						fetch(template['file_path'])
							.then((res) => res.text())
							.then((text) => {
								$('#result_css').val(text);
							})
							.catch((e) => console.error(e));
					}
				}
			}
		});
}
