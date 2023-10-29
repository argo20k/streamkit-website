$(document).ready(function () {
	var result_css_dir = 'styles/streamkit/test1.css';
	fetch(result_css_dir)
		.then((res) => res.text())
		.then((text) => {
			$('#result_css').val(text);
		})
		.catch((e) => console.error(e));
});
