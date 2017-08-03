$(document).ready(() => {
	$('#comment').keypress((e) => {
		if (e.which === 13) {
			console.log($('#comment').val() + ' sended');
			$.post('/comment', { movieId: '0', com: $('#comment').val() }, (data) => {
				if (data === true) {
					$('#commentZone').append('Salut');
				}
			});
		}
	});
});
