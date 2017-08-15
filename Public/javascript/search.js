function createFilmElem(indx, id, src, title, year, rating) {
	return (`<div class="col-md-2 col-xl-1 col-4 movieLaunch imgListFilms" filmid="${id}" id="img${indx}"><a href="#" style="color: white"><img style="width: 100%;" src="${src}" alt="Image not found.." title="${title}" /><div class="filmMiniature"><p class="text-center filmTitle"><b>${title}</b></p><p class="text-center filmYear">${year}</p><p class="text-center filmRate">${rating} / 10</p>`);
}

$(document).on('click', '.userOfList', (e) => {
	const uid = e.currentTarget.id;
	let comments = '';
	$.get(`/user/${uid}`, null, (data) => {
		console.log(data.username);
		$('#userUsername').html(data.username);
		$('#userPicture').prop('src', data.photo);
		data.coms.forEach((com, i) => {
			comments = `${comments}<div class="row" style="background-color: #171717; margin-bottom: 5px;"><div class="col-3"><img style="width: 100%;" src="${com.movie.image}" /></div><div class="col-9"><p style="color: #919191;">${com.movie.title}<br /><span style="font-size: 13px;">${getFormattedDate(new Date(com.posted))}</span></p><p style="color: white; font-size: 10px;">${com.com}</p></div></div></div>`;
		});
		$('#userComments').html(comments);
	});
	$('#myAccount').fadeOut(50);

	function showUser() {
		$('#userInformations').fadeIn(50);
	}

	function ftTwo() {
		$('#videoList').fadeOut(0, showUser);
	}

	function ftOne() {
		$('#filmsList').fadeOut(0, ftTwo);
	}
	if (state === 0) {
		$('#search').fadeOut(0, ftOne);
	} else {
		$('#videos').fadeOut(50, showUser);
	}
});

function getMovieInfos(id) {
	function getFilm() {
		$.get(`/movie/${id}/status`, null, (data) => {
			if (data === true) {
				$('video').html(`<source src="/video?id=${id}" type="video/mp4" />`);
				$('video').removeClass('hidden');
			} else {
				setTimeout(getFilm(id), 2000);
			}
		});
	}
	getFilm();
}

$(document).ready(() => {
	function showList() {
		$('#search').fadeIn(50);
		if (search === 0) {
			$('#videoList').fadeIn(50);
		} else {
			$('#filmsList').fadeIn(50);
		}
	}

	const slider = $('#rating');

	slider.on('mouseenter', slider, (e) => {
		$('.noUi-tooltip').show();
	});

	slider.on('mouseleave', slider, (e) => {
		$('.noUi-tooltip').hide();
	});

	noUiSlider.create(slider[0], {
		start: 3.3,
		step: 0.1,
		tooltips: [wNumb({ decimals: 1 })],
		range: {
			min: 0,
			max: 10,
		},
	});
	$('.noUi-tooltip').hide();

	function showVideo() {
		$('#videos').fadeIn(50);
	}
	$('#closeUserInfo').click(() => {
		if (state === 0) {
			$('#userInformations').fadeOut(50, showList);
		} else {
			$('#userInformations').fadeOut(50, showVideo);
		}
	});
	let index = 0;
	let searchMode = false;
	let filmListNumber = 0;
	function showFilms(films, i) {
		const w = i - 1;
		const x = (23 * filmListNumber) - index;
		if (i > 0) {
			if ((index % 6) === 0) {
				if (index === 0) {
					$('#filmsList').append('<div style="margin-top: 15px;" class="row"><div class="col-xl-3 col-lg-down-0"></div>');
				} else {
					$('#filmsList').append('</div><div style="margin-top: 15px;" class="row"><div class="col-xl-3 col-lg-down-0"></div>');
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
	$('#vListDiv').on('mouseenter', '.movieLaunch', (e) => {
		const id = e.currentTarget.id;
		$(`#${id} > a > div`).css('width', $(`#${id} > a > img`).prop('width'));
		$(`#${id} > a > div`).animate({
			height: '70%',
			top: '30%',
		}, 100, () => {});
	});

	$('#vListDiv').on('mouseleave', '.movieLaunch', (e) => {
		const id = e.currentTarget.id;
		$(`#${id} > a > div`).animate({
			height: '0%',
			top: '100%',
		}, 100, () => {});
	});

	$(window).bind('mousewheel', (event) => {
		if (event.originalEvent.wheelDelta >= 0) {
			console.log('Scroll up');
		} else if (searchMode === true) {
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
		}
	});

	$('.movieLaunch').click((e) => {
		const filmid = e.currentTarget.getAttribute('filmid');
		state = 1;
		$.get(`/movie/${filmid}`, null, (data) => {
			console.log(data);
			$('#videoTitle').html(data.title);
			$('.infos').html(`${data.title} - ${data.year}<br /><br />${data.rating} / 10<br /><br />${data.description}`);
			$('.playMovieBtn').attr('id', filmid);
			$('.vjs-poster').remove();
			$('video').append(`<div class="vjs-poster" tabindex="-1" aria-disabled="false" style="background-image: url(${data.image});"></div>`);
			$('video').attr('poster', data.image);
			$('#search').fadeOut(50);
			$('#filmsList').fadeOut(50);
			$('#videoList').fadeOut(50, showVideo);
		});
	});

	$('#searchBtn').click(() => {
		filmListNumber = 0;
		$('#searchBtn').prop('disabled', true);
		const string = $('#searchValue').val() || null;
		const genre = $('#categoryValue').val() || null;
		const sort = $('#orderByValue').val() || null;
		const rating = slider[0].noUiSlider.get() || null;
		const options = { string, genre, sort, rating, index: filmListNumber };
		$.get('/search', options, (data) => {
			if (data.length > 0) {
				searchMode = true;
				$('#filmsList .row').remove();
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

	const isCharOrDelete = (char) => {
		if (char >= 65 && char <= 90) {
			return (true);
		} else if (char === 8) {
			return (true);
		} else if (char >= 48 && char <= 57) {
			return (true);
		} else if (char === 32) {
			return (true);
		}
		return (false);
	};

	$('.userOfList').click((e) => {
		const userId = e.id;
		console.log(userId);
	});

	$('#searchUserValue').focusout(() => {
		$('.userOfList').fadeOut(150);
	});
	$('#searchUserValue').focusin(() => {
		$('.userOfList').fadeIn(150);
	});

	$('#searchUserValue').keyup((e) => {
		if (isCharOrDelete(e.which)) {
			if ($('#searchUserValue').val().length > 2) {
				$('#searchUserBtn').prop('disabled', true);
				const uName = $('#searchUserValue').val() || null;
				$.get('/users', { username: uName }, (data) => {
					$('.userOfList').remove();
					data.forEach((user, i) => {
						$('#userFoundList').html(`${$('#userFoundList').html()}<a class="userOfList col-12" id="${user._id}" href="#" style="height: 30px; width: 100%; margin-bottom: 2px;text-decoration: none;"><div style="height: 100%; width: 100%; background-color: rgba(0, 0, 0, 1);"><img src="${user.photo}" style="width: 30px; height: 30px; float: left;" /><p style="color: gray; text-align: center;">&nbsp;${user.username}</p></div></a>`);
					});
				});
			} else {
				$('.userOfList').remove();
			}
		}
	});
});