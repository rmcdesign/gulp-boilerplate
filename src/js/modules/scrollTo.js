import $ from 'jquery';

/****** Sroll to  ******/
$.fn.scrollTo = function(elem, speed, offset) {
    $(this).animate({
        scrollTop:  $(this).scrollTop() - $(this).offset().top + ($(elem).offset().top + offset)
    }, speed === undefined ? 1000 : speed);
    return this;
};