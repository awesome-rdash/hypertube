$(document).ready(() => {
	let isDown = false;
	$('#stoggle').hide();
	$('#toggle').click(() => {
		$('#stoggle').toggle(250);
		if (isDown) {
			isDown = false;
			$('#toggle > span').addClass('glyphicon-chevron-up');
			$('#toggle > span').removeClass('glyphicon-chevron-down');
		} else {
			isDown = true;
			$('#toggle > span').addClass('glyphicon-chevron-down');
			$('#toggle > span').removeClass('glyphicon-chevron-up');
		}
	});
});
