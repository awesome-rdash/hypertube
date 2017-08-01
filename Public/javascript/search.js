$(document).ready(() => {
	$('#searchBtn').click(() => {
		const search = $('#searchValue').val();
		if (search) {
			$.get('/search', { search }, (data) => {
				console.log(data);
			});
		} else {
			console.log('yo');
		}
	});
	$('#searchValue').keypress((e) => {
		if (e.which === 13) {
			$('#searchBtn').click();
		}
	});
});
