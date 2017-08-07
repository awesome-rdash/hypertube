$(document).ready(() => {
	$('#comment').keypress((e) => {
		if (e.which === 13) {
			const com = $('#comment').val();
			$.post('/comment', { movieId: '5980a17fc41a4bcdb05dac11', com }, (data) => {
				if (data !== false) {
					$('#commentZone').last().append(`<div style="padding-bottom: 15px;"><div class="row" style="background-color: #171717;"><div class="col-xs-3"><img src="https://yts.ag/assets/images/users/thumb/default_avatar.jpg" /></div><div class="col-xs-9"><p style="color: #919191;">Jeremy Misiti - <span style="font-size: 12px;"> 29/08/2017 - 20:37</span></p><p style="color: white; font-size: 10px;">${data}</p></div></div></div>`);
				}
			});
		}
	});
});
