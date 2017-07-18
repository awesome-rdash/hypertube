function throwError(type, mode) {
	if (mode === 1) {
		$('#i1').addClass('has-warning');
		$('#i1 small').html($(`#${type}`).html());
	} else if (mode === 2) {
		$('.form-group').addClass('has-warning');
		$('#i1 small').html($(`#${type}`).html());
		$('#i2 small').html($(`#${type}`).html());
	} else if (mode === 3) {
		$('#i1 small').html(`${$('#i1 small').html()}${$(`#${type}`).html()}<br />`);
	} else if (mode === 4) {
		$('#i2').addClass('has-warning');
		$('#i2 small').html($(`#${type}`).html());
	}
	$('#b1, #b3, #b2').prop('disabled', false);
}
function stopError() {
	$('.form-group').removeClass('has-warning');
	$('.form-group').removeClass('has-success');
	$('#i1').removeClass('has-warning');
	$('#i2').removeClass('has-warning');
	$('#i1 small').html('');
	$('#i2 small').html('');
}
