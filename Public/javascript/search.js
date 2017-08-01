$(document).ready(() => {
	$('#searchBtn').click(() => {
		const string = $('#searchValue').val() || '*';
		const category = $('#categoryValue').val() || '*';
		const order = $('#orderByValue').val() || '*';
		const quality = $('#qualityValue').val() || '*';
		const options = { category, order, quality };
		$.get('/search', { string/*, options*/ }, (data) => {
			console.log(data);
		});
	});
	$('#searchValue').keypress((e) => {
		if (e.which === 13) {
			$('#searchBtn').click();
		}
	});
});
