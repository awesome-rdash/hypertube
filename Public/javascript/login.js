let step = 0;
let stepInput = null;
stepInput = [['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', '']];
step = 1;
include('javascript/includes/_nextStep.js');
include('javascript/includes/_stepBefore.js');
$(document).ready(() => {
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
		$.post('/update/user', { email: $('#email').val(), username: $('#username').val(), photo: $('#photo').val() }, (data) => {
			console.log(data);
		});
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
	document.getElementById('photo').addEventListener('change', readfichier, false);
});

function getUser(data) {
	user = data;
}
