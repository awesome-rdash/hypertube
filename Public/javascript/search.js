$(document).ready(() => {
	$('#rating').slider({
		tooltip: 'always',
	});

	let index = 0;

	function showFilms(films, i) {
		const w = i - 1;
		const x = 23 - index;
		if (i > 0) {
			$(`#img${x} > a > img`).attr('src', films[index].image);
			index += 1;
			$(`#img${x}`).show();
			$(`#img${x} > a > img`).animate({
				width: '100%',
			}, 50, () => {
				showFilms(films, w);
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
				$('.imgListFilms').hide();
				$('.imgListFilms > a > img').css('width', '0%');
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
