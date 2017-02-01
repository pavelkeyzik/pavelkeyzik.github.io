var currentPage = 0;
var countOfImages = 0;
var lastPage = 0;

function rotateLeft(carousel, count) {
	var blockWidth = $(carousel + " .block").width();
	var blockMargin = $(carousel + " .block").css("margin-right");
	var widthForRotate = (parseInt(blockWidth, 10) + parseInt(blockMargin, 10));
	$(carousel).animate({"margin-left": "-" + (widthForRotate * count) + "px"}, 500, function() {
		for(var i = 0; i < count; i++) {
			$(carousel + " .block:first-child").css({opacity: 0});
			$(carousel + " .block:first-child").appendTo(carousel).animate({opacity: 1}, 500); 
		}
		lastPage = currentPage;
		if(currentPage + count >= countOfImages)
			currentPage = 0;
		else
			currentPage += count;
		$(carousel).css({"margin-left": "0px"});
		$(".pagination ul li:eq(" + currentPage + ")").toggleClass("active");
		$(".pagination ul li:eq(" + lastPage + ")").toggleClass("active");
	});
	return false;
}

$(document).ready(function() {
	countOfImages = $('.items').children().length;
	for(var i = 0; i < countOfImages; i++) {
		if(currentPage == i)
			$(".pagination ul").append("<li class='active'>");
		else
			$(".pagination ul").append("<li>");
	}
})



$(function() {
	setInterval( function(){
		rotateLeft(".items", 1);
	}, 5 * 1000 );
})