function createFilmElem(indx, id, src, title, year, rating) {
	return (`<div class="col-md-2 col-lg-1 col-xs-4 movieLaunch imgListFilms" filmid="${id}" id="img${indx}"><a href="#" style="color: white"><img style="width: 100%;" src="${src}" alt="Image not found.." title="" /><div style="overflow: hidden;position: absolute; width: 100%; height: 0%; top: 30%; background-color: rgba(0, 0, 0, 0.7);"><p class="text-center filmTitle"><b>${title}</b></p><p class="text-center filmYear">${year}</p><p class="text-center filmRate">${rating} / 10</p>`);
}

$(document).ready(() => {
	$('#rating').slider({
		tooltip: 'always',
	});
	let index = 0;
	let filmListNumber = 0;
	function showFilms(films, i) {
		const w = i - 1;
		const x = (23 * filmListNumber) - index;
		if (i > 0) {
			if ((index % 6) === 0) {
				if (index === 0) {
					$('#filmsList').append('<div style="margin-top: 15px;" class="row"><div class="col-lg-3 col-md-down-0"></div>');
				} else {
					$('#filmsList').append('</div><div style="margin-top: 15px;" class="row"><div class="col-lg-3 col-md-down-0"></div>');
				}
			}
			$('#filmsList > .row').last().append(createFilmElem(index + (23 * filmListNumber), films[index]._id, films[index].image, films[index].title, films[index].year, films[index].rating));
			index += 1;
			showFilms(films, w);
		} else {
			$('#searchBtn').prop('disabled', false);
			$('#filmsList').append('</div>');
			index = 0;
		}
	}

	$('.movieLaunch').hover((e) => {
		const id = e.currentTarget.id;
		$(`#${id} > a > div`).css('width', $(`#${id} > a > img`).prop('width'));
		$(`#${id} > a > div`).animate({
			height: '70%',
			top: '30%',
		}, 100, () => {});
	});

	$('.movieLaunch').mouseleave((e) => {
		const id = e.currentTarget.id;
		$(`#${id} > a > div`).animate({
			height: '0%',
			top: '100%',
		}, 100, () => {});
	});

	$(window).scroll(() => {
		if ($(window).scrollTop() + $(window).height() >= ($(document).height() - 5)) {
			filmListNumber += 1;
			const string = $('#searchValue').val() || null;
			const genre = $('#categoryValue').val() || null;
			const sort = $('#orderByValue').val() || null;
			const rating = $('#rating').val() || null;
			const options = { string, genre, sort, rating, index: filmListNumber };
			$.get('/search', options, (data) => {
				if (data.length > 0) {
					$('#filmsList').fadeIn(0);
					$('#videoList').hide(250, showFilms(data, data.length));
				} else {
					$('#searchBtn').prop('disabled', false);
				}
			});
		}
	});
	$('#searchBtn').click(() => {
		filmListNumber = 0;
		$('#searchBtn').prop('disabled', true);
		const string = $('#searchValue').val() || null;
		const genre = $('#categoryValue').val() || null;
		const sort = $('#orderByValue').val() || null;
		const rating = $('#rating').val() || null;
		const options = { string, genre, sort, rating, index: filmListNumber };
		$.get('/search', options, (data) => {
			$('#filmsList .row').remove();
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
