$(document).ready(() => {
	$('#rating').slider({
		tooltip: 'always',
	});

	let index = 0;

	function showFilms(films, i) {
		const x = i - 1;
		if (x > 0) {
			$(`#img${x} > a > img`).attr('src', films[index].image);
			index += 1;
			$(`#img${x}`).show();
			$(`#img${x} > a > img`).animate({
				width: '100%',
			}, 50, () => {
				showFilms(films, x);
			});
		} else {
			index = 0;
		}
	}

	$('#searchBtn').click(() => {
		const string = $('#searchValue').val() || null;
		const genre = $('#categoryValue').val() || null;
		const sort = $('#orderByValue').val() || null;
		const rating = $('#rating').val() || null;
		const options = { string, genre, sort, rating };
		$.get('/search', options, (data) => {
			if (data.length > 0) {
				console.log(data[0].image);
				$('#videoList').hide(250, showFilms(data, data.length));
			}
		});
	});
	$('#searchValue').keypress((e) => {
		if (e.which === 13) {
			$('#searchBtn').click();
		}
	});
});
