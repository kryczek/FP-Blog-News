$(document).ready(function() {
    $(window).scroll(function(e) {
        var s = $(window).scrollTop(),
            opacityVal = (s / 200);

        $('.blurred').css('opacity', opacityVal);
    });
});