$(document).ready(function () {
	var result_css_dir = 'styles/streamkit/00-default-template.css';
	fetch(result_css_dir)
		.then((res) => res.text())
		.then((text) => {
			$('#result_css').val(text);
		})
		.catch((e) => console.error(e));

	var template_config_file = 'config.json';
	fetch(template_config_file)
		.then((res) => res.text())
		.then((text) => {
			var templates = JSON.parse(text);
			templates.forEach((template) => {
				document.head.innerHTML += `<link rel="stylesheet" href=${template.file_path} />`;

				var select = document.getElementById('selectTemplate');
				var el = document.createElement('option');
				el.textContent = template.name;
				el.value = template.name;
				select.appendChild(el);
			});
		})
		.catch((e) => console.error(e));
});
