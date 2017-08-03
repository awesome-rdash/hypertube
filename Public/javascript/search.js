$(document).ready(() => {
	$('#rating').slider({
		tooltip: 'always',
	});
	let index = 0;
	let filmListNumber = 0;
	function showFilms(films, i) {
		const w = i - 1;
		const x = 23 - index;
		if (i > 0) {
			$(`#img${x} > a > img`).attr('src', films[index].image);
			$(`#img${x} > a > div > .filmTitle > b`).html(films[index].title);
			console.log(films[index]);
			$(`#img${x} > a > div > .filmYear`).html(films[index].year);
			$(`#img${x} > a > div > .filmRate`).html(`${films[index].rating} / 10`);
			index += 1;
			$(`#img${x}`).show();
			$(`#img${x} > a > img`).animate({
				width: '100%',
			}, 50, () => {
				showFilms(films, w);
			});
		} else {
			$('#searchBtn').prop('disabled', false);
			index = 0;
		}
	}

	$('.imgListFilms, .listMovies').hover((e) => {
		const id = e.currentTarget.id;
		$(`#${id} > a > div`).css('width', $(`#${id} > a > img`).prop('width'));
		$(`#${id} > a > div`).animate({
			height: '70%',
			top: '30%',
		}, 100, () => {});
	});

	$('.imgListFilms, .listMovies').mouseleave((e) => {
		const id = e.currentTarget.id;
		$(`#${id} > a > div`).animate({
			height: '0%',
			top: '100%',
		}, 100, () => {});
	});

	$('#searchBtn').click(() => {
		filmListNumber = 0;
		$('#searchBtn').prop('disabled', true);
		const string = $('#searchValue').val() || null;
		const genre = $('#categoryValue').val() || null;
		const sort = $('#orderByValue').val() || null;
		const rating = $('#rating').val() || null;
		const options = { string, genre, sort, rating, index: filmListNumber };
		filmListNumber += 1;
		$.get('/search', options, (data) => {
			$('.imgListFilms').hide();
			$('.imgListFilms > a > img').css('width', '0%');
			if (data.length > 0) {
				$('#filmsList').fadeIn(0);
				$('#videoList').hide(250, showFilms(data, data.length));
			} else {
				$('#searchBtn').prop('disabled', false);
			}
		});
	});
	$('#searchValue').keypress((e) => {
		if (e.which === 13 && !$('#searchBtn').prop('disabled')) {
			$('#searchBtn').click();
		}
	});
});
