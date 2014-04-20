
$(window).load(function() {
    var leftRightWidth = $('.button_HorizontalList').width();
    $('.button_VerticalList').css('height', leftRightWidth);

    var VerticalList_Height = $('.component#VerticalList').height();
    var SliderHeight = ((VerticalList_Height - leftRightWidth * 2) / VerticalList_Height) * 100 + '%';
    $('#Slidebar_VerticalList').css('height', SliderHeight);
//    $('#ScrollHide_VerticalList').css('height', SliderHeight);

});