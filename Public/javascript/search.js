$(document).ready(() => {
	$('#rating').slider({
		tooltip: 'always',
	});
	$('#searchBtn').click(() => {
		const string = $('#searchValue').val() || '*';
		const category = $('#categoryValue').val() || '*';
		const order = $('#orderByValue').val() || '*';
		const quality = $('#qualityValue').val() || '*';
		const rating = $('#ratings').val() || '*';
		const options = { string, category, order, quality, rating };
		$.get('/search', options, (data) => {
			console.log(data);
		});
	});
	$('#searchValue').keypress((e) => {
		if (e.which === 13) {
			$('#searchBtn').click();
		}
	});
});
