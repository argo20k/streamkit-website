$(document).ready(function () {
	var select = document.getElementById('selectTemplate');
	var template_config_file = 'config.json';
	fetch(template_config_file)
		.then((res) => res.text())
		.then((text) => {
			var templates = JSON.parse(text);
			templates.forEach((template) => {
				// adds config template stylesheet to index.html to add it to the server files
				document.head.innerHTML += `<link rel="stylesheet" href=${template.file_path} />`;
				// fills selectTemplate dropdown with config template names
				var el = document.createElement('option');
				el.textContent = template['name'];
				el.value = template['name'];
				select.appendChild(el);
			});

			templates.forEach((template) => {
				if (template['name'] === select.value) {
					fetch(template['file_path'])
						.then((res) => res.text())
						.then((text) => {
							$('#result_css').val(text);
						})
						.catch((e) => console.error(e));
				}
			});
		})
		.catch((e) => console.error(e));
});

function leaveChange(control) {
	// console.log(control.value);
}
