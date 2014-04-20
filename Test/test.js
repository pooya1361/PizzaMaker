$(document).ready(function() {
    $('#content').mouseenter(function() {
        $('#hint').animate({top: "-40px"}, {duration: 'fast'});
        $('#hint').animate({top: "-30px"}, {duration: 'fast'});
    });

    $('#content').mouseleave(function() {
        $('#hint').animate({top: "-40px"}, {duration: 'fast'});
        $('#hint').animate({top: "0px"}, {duration: 'fast'});
    });
});