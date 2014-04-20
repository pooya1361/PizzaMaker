$.fn.animateRotate = function(startAngle, endAngle, duration, easing, complete) {
    return this.each(function() {
        var elem = $(this);

        $({deg: startAngle}).animate({deg: endAngle}, {
            duration: duration,
            easing: easing,
            step: function(now) {
                elem.css({
                    '-webkit-transform': 'rotate(' + now + 'deg)',
                    '-moz-transform': 'rotate(' + now + 'deg)',
                    '-o-transform': 'rotate(' + now + 'deg)',
                    '-ms-transform': 'rotate(' + now + 'deg)',
                    'transform': 'rotate(' + now + 'deg)'
                });
            },
            complete: complete || $.noop
        });
    });
};

$(window).load(function() {
    degree = 0;
    var timer;
    var rotating = false;
    function rotate(item) {
        rotating = true;

        item.animateRotate(degree, degree + 1);

        // timeout increase degrees:
        timer = setTimeout(function() {
            ++degree;
            if (degree === 360) {
                degree = 0;
            }
            rotate(item); // loop it
        }, 55);
    }

    $('#PizzaFloor').mouseenter(function() {
        if (!rotating) {
            degree++;
            rotate($(this));    // run it!
        }
    });

    $('#frame').mouseleave(function() {
        clearInterval(timer);
        rotating = false;
    });
});
