const getFormattedDate = (date) => {
	const year = date.getFullYear();

	let month = (1 + date.getMonth()).toString();
	month = month.length > 1 ? month : `0${month}`;

	let day = date.getDate().toString();
	day = day.length > 1 ? day : `0${day}`;

	let hours = date.getHours().toString();
	hours = hours.length > 1 ? hours : `0${hours}`;

	let minutes = date.getMinutes().toString();
	minutes = minutes.length > 1 ? minutes : `0${minutes}`;
	return (`${month}/${day}/${year} ${hours}:${minutes}`);
};

$(document).ready(() => {
	$('#comment').keypress((e) => {
		if (e.which === 13) {
			const com = $('#comment').val();
			$.post('/comment', { movieId: '5980a17fc41a4bcdb05dac11', com }, (data) => {
				let photo;
				if (data.photo) {
					photo = data.photo;
				} else {
					photo = 'assets/empty_user.png';
				}
				if (data.param === 'success') {
					console.log(data);
					$('#comment').val('');
					$('#commentZone').last().append(`<div style="padding-bottom: 15px;"><div class="row" style="background-color: #171717;"><div class="col-xs-3"><img src="${photo}" style="width: 100%; height: 100%;" /></div><div class="col-xs-9"><p style="color: #919191;">${data.username}<span style="font-size: 12px;">${getFormattedDate(new Date(com.posted))}</span></p><p style="color: white; font-size: 10px;">${data.msg}</p></div></div></div>`);
				} else {
					throwError(data.errors.msg, 5);
				}
			});
		}
	});
});
