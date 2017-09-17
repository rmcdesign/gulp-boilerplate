import $ from 'jquery';
import '../modules/scrollTo';

// let is the new var and enables block, statement, or expression scope and not only function/global scope like var -
// you also have const now too


// passing in parent selector - could pass in speed etc as well to make it more plugin like if needed
let collapse = (function(element) {

    let speed = 300;

    $(element + ' .collapse-trigger').on('click', function() {
        var $el = $(this);
        $el.closest(element).stop().toggleClass('open');
        $el.parent().siblings(element).find('.collapse-content').stop().slideUp(speed).parent().removeClass('open');
        $el.next('.collapse-content').stop().slideToggle(speed, function() {
            $('html, body').scrollTo($el, speed, -60);
        });
    });

});

module.exports = collapse;

/*

<div class="collapse-container">
    <section class="collapse">
        <div class="collapse-trigger">
            <h3>Title</h3>
        </div>
        <div class="collapse-content">
            <div class="collapse-inner">
                Add content here
            </div>
        </div>
    </section>
</div>

*/