$(document).ready(() => {
	let edited = false;
	let search = 0;
	function showMyAcc() {
		$('#myAccount').fadeIn(50);
	}
	function showList() {
		$('#search').fadeIn(50);
		if (search === 0) {
			$('#videoList').fadeIn(50);
		} else {
			$('#filmsList').fadeIn(50);
		}
	}
	function showVideo() {
		$('#videos').fadeIn(50);
	}

	function ftTwo() {
		$('#videoList').fadeOut(0, showMyAcc);
	}

	function ftOne() {
		$('#filmsList').fadeOut(0, ftTwo);
	}

	$('#searchBtn').click(() => {
		search = 1;
	});
	$('#searchValue').keypress((e) => {
		search = 1;
	});
	$('#myAccount').hide();
	$('#videos').hide();
	$('#myAccount').removeClass('hidden');
	$('#videos').removeClass('hidden');
	$('#myAccBtn').click(() => {
		$('#userInformations').fadeOut(0);
		if (state === 0) {
			$('#search').fadeOut(0, ftOne);
		} else {
			$('#videos').fadeOut(50, showMyAcc);
		}
	});
	$('#close').click(() => {
		if (state === 0) {
			$('#myAccount').fadeOut(50, showList);
		} else {
			$('#myAccount').fadeOut(50, showVideo);
		}
	});
	$('.movieLaunch').click((e) => {
		console.log(e);
		state = 1;
		$('#search').fadeOut(50);
		$('#filmsList').fadeOut(50);
		$.get('/movie/')
		$('#videoList').fadeOut(50, showVideo);
	});
	$('#sendEdit').click(() => {
		const imgFileSize = Math.round((($('#picture').prop('src').length - 22) * 3) / 4) / 1000;
		if (edited === false || imgFileSize < 400) {
			stopError();
			$.post('/update/user', { email: $('#email').val(), username: $('#usrname').val(), photo: edited ? $('#picture').prop('src') : undefined }, (data) => {
				console.log(data);
				edited = false;
				if (data.errors) {
					data.errors.forEach((error) => {
						if (error.msg === 'errPhoto') {
							$('#input3').attr('class', 'has-danger');
							$('#input3 small').html($(`#${error.msg}`));
						} else if (error.msg === 'errUsername') {
							$('#input2').attr('class', 'has-danger');
							$('#input2 small').html($(`#${error.msg}`));
						} else if (error.msg === 'errMail') {
							$('#input1').attr('class', 'has-danger');
							$('#input1 small').html($(`#${error.msg}`));
						}
					});
				} else {
					user = data;
					$('#dropdownMenu1').html(data.username);
					$('.alert').removeClass('hidden');
				}
			});
		} else {
			$('#input3').attr('class', 'has-danger');
			$('#input3 small').html($('#errImageSize').html());
		}
	});

	function readfichier(e) {
		edited = true;
		const img = $('#picture');
		img.css('display', 'none');
		img.css('margin', 'auto');
		img.css('max-width', '100%');
		if (window.FileReader) {
			const file = e.target.files[0];
			const reader = new FileReader();
			if (file && file.type.match('image.*')) {
				reader.readAsDataURL(file);
			} else {
				img.css('display', 'none');
				img.attr('src', '');
			}
			reader.onloadend = () => {
				img.attr('src', reader.result);
				img.css('display', 'block');
			};
		}
	}
	document.getElementById('pictures').addEventListener('change', readfichier, false);
});
