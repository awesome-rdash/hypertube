let step = 0;
let stepInput = null;
stepInput = [['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', '']];
step = 1;
include('javascript/includes/_nextStep.js');
include('javascript/includes/_stepBefore.js');
$(document).ready(() => {
	let edited = false;
	$('.alert').alert();
	$('#i2 input').hide();
	$('#b1').hide();
	$('#b2').hide();
	$('#b1, #b3').click(() => {
		stepInput[step][0] = $('#i1 input').val();
		stepInput[step][1] = $('#i2 input').val();
		$('#b1, #b3').prop('disabled', true);
		nextStep();
	});
	$('#b2').click(() => {
		stepInput[step][0] = $('#i1 input').val();
		stepInput[step][1] = $('#i2 input').val();
		$('#b2').prop('disabled', true);
		if (step >= 1) { stepBefore(step); }
	});
	$('#sendEdit').click(() => {
		const imgFileSize = Math.round(($('#picture').prop('src').length - 22) * 3 / 4) / 1000;
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
					$('.alert').removeClass('hidden');
				}
			});
		} else {
				$('#input3').attr('class', 'has-danger');
				$('#input3 small').html($('#errImageSize').html());
		}
	});
	$('#step1').on('keypress', (e) => {
		if (e.keyCode === 13) {
			stepInput[step][0] = $('#i1 input').val();
			stepInput[step][1] = $('#i2 input').val();
			$('#b1, #b3').prop('disabled', true);
			nextStep();
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

function getUser(data) {
	user = data;
}
