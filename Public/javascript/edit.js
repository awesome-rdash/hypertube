$(document).ready(() => {
	let edited = false;

	function hide1() {
		$('#myAccount').fadeToggle('fast');
	}
	function hide2() {
		$('#videos').fadeToggle('fast');
	}
	$('#myAccount').hide();
	$('#myAccBtn').click(() => {
		$('#videos').fadeToggle('fast', hide1);
	});
	$('#close').click(() => {
		$('#myAccount').fadeToggle('fast', hide2);
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
