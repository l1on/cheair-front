var imgs = ['shanghai1.jpg', 'shanghai2.jpg'];
var i = 0;

$(function(){
	window.setTimeout(function () {
		window.location.href = 'results.html';
	}, 30 * 1000);

	$('.progress-bar').animate({
		width: '100%'
	}, {
		duration: 30 * 1000
	});	

	window.setInterval(function() {
		$('img').fadeOut('fast', function(){
			$(this).attr('src', '/images/' + imgs[i++]);
			$(this).fadeIn('fast');
		});
	}, 10 * 1000);

});
