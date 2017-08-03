$(document).ready(() => {
	$('#comment').keypress((e) => {
		if (e.which === 13) {
			$.post('/comment', { movieId: '0', com: $('#comment').val() }, (data) => {
				if (data === true) {
					$('#commentZone').append('Salut');
				}
			});
		}
	});
});
