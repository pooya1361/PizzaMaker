$(document).ready(function() {
// Moves the clicked ingredient to the middle of slidebar
    $('.HorizontalItem').click(function() {
        var item = $(this);
        MoveItem(item);

        $('.HorizontalItem_CheckCircle').hide();
        $(this).find('.HorizontalItem_CheckCircle').show();
        CheckIngredients(item.attr('id'));
    });

    function MoveItem(item) {
        var leftButtonWidth = $('.button_HorizontalList#leftButton').outerWidth();
        var slider = $('#Slider_HorizontalList');
        var sliderLeft = Math.round(slider.position().left - leftButtonWidth);
        var sliderWidth = slider.outerWidth();
        var slidebar = $('#Slidebar_HorizontalList');
        var SlideBarWidth = slidebar.outerWidth();
        var itemWidth = item.outerWidth();

        var itemRelativeLeft = item.position().left + sliderLeft;
        var itemRelativeRight = itemRelativeLeft + itemWidth;

        var move = 0;
        if (itemRelativeRight > SlideBarWidth)
        {
            move = sliderLeft + (SlideBarWidth - itemRelativeRight - 35);
        } else if (itemRelativeLeft < 0) {
            move = sliderLeft - itemRelativeLeft + 35;
        }

        if (move !== 0) {
            var Hints = $('.Hint_HorizontalList');
            var Hint_PizzaName = $('.Hint_HorizontalList#PizzaName');
            var Hint_PizzaPrice = $('.Hint_HorizontalList#PizzaPrice');

            // Checks if movement will cause the slidebar out of boundries
            if (SlideBarWidth - move > sliderWidth) {
                move = slidebar.outerWidth() - sliderWidth;
            } else if (move > 0) {
                move = 0;
            }
            Hint_PizzaName.clearQueue();
            Hint_PizzaPrice.clearQueue();
//            slider.clearQueue();
            var hintMoveDiff = sliderLeft - move;
            var hintMove = Hint_PizzaName.position().left - hintMoveDiff;
            slider.animate({left: move}, {duration: 500, complete: ShowHideHint(item)});
            Hints.animate({left: hintMove}, {duration: 500, complete: ShowHideHint(item)});
            var Hints_Promise = Hints.promise();
            Hints_Promise.done(
                    function() {
                        ShowHideHint(item);
                    });
        }
    }

    function CheckIngredients(itemId) {
        if (itemId > 0) {
            $.ajax({
                url: 'HorizontalList/GetPizzaIngres.php',
                type: 'post',
                dataType: 'json',
                data: {itemId: itemId},
                success: function(data) {
                    $('.VerticalItem_CheckCircle').hide();
                    $('.FigurePic:not(#0)').hide();
                    $.each(data, function(key, value) {
                        var item = $('.VerticalItem').filter(function() {
                            return $(this).attr('id') === value['IngreId'];
                        });
                        item.find('.VerticalItem_CheckCircle').show();
                        ShowFigure(item);
//                        $('#' + item.attr('id') + '.FigurePic').each(function() {
//                            var figure = $(this);
//                            $('#preview').queue('figures', function(next) {
//                                figure.show('fast', next).each(function() {
//                                    this.offsetHeight;
//                                }).prop('src', $('#' + item.attr('id') + '.FigurePic').attr('src'));
//                                ;
//
//                            });
//
////                            figure_z_index++;
////                            $(this).css('z-index', figure_z_index);
//                        });
//                        $('#preview').delay(1000, 'figures');
//                        $('#preview').dequeue('figures');
//            $('#' + item.attr('id') + '.FigurePic').show();

                    });

                }
            });
        }
    }

    // Popup hint
    function ShowHideHint(item) {
        var Hints = $('.Hint_HorizontalList');
        var Hint_PizzaName = $('.Hint_HorizontalList#PizzaName');
        var Hint_PizzaPrice = $('.Hint_HorizontalList#PizzaPrice');
        var relativeLeft = item.closest('#Slider_HorizontalList').position().left;
        var itemLeft = item.position().left;
        var itemWidth = item.outerWidth();
        var hintLeft = relativeLeft + itemLeft;
        if (HorizontalItemVisible(item)) {
            Hint_PizzaName.html(
                    '<h2 class="HorizontalItem_HintItem" id="PizzaName">' + item.attr('PizzaName') + '</h2>');
            Hint_PizzaPrice.html(
                    '<h2 class="HorizontalItem_HintItem" id="PizzaPrice">' + item.attr('PizzaPrice') + ' SEK</h2>');

            Hints.css('left', hintLeft);
            Hints.css('width', itemWidth);


            Hint_PizzaName.clearQueue();
            Hint_PizzaPrice.clearQueue();

            Hint_PizzaName.show();
            Hint_PizzaPrice.show();

            if (Hint_PizzaName.position().top === 0) {
                Hint_PizzaName.delay(300).animate({top: "-35px"}, 'fast', function() {
                    Hint_PizzaName.animate({top: "-30px"}, 'fast', function() {
                        Hint_PizzaPrice.animate({bottom: "-35px"}, 'fast', function() {
                            Hint_PizzaPrice.animate({bottom: "-30px"}, 'fast');
                        });
                    });
                });
            }
        }
    }


    function hideHint(delay) {
        if (typeof delay === "undefined" || delay === null) {
            delay = 800;
        }
        var Hint_PizzaName = $('.Hint_HorizontalList#PizzaName');
        var Hint_PizzaPrice = $('.Hint_HorizontalList#PizzaPrice');
        if (Hint_PizzaName.position().top === -30) {
            Hint_PizzaName.clearQueue();
            Hint_PizzaName.delay(delay).animate({top: "-35px"}, 'fast', function() {
                Hint_PizzaName.animate({top: "0px"}, 'fast', function() {
                    Hint_PizzaPrice.delay(100).animate({bottom: "-35px"}, 'fast', function() {
                        Hint_PizzaPrice.animate({bottom: "0px"}, 'fast');
                    });
                });
            });
        }
    }

    $('.HorizontalItem').mouseenter(function() {
        var item = $(this);
        ShowHideHint(item);
        if (!HorizontalItemVisible(item)) {
//            hideHint(0);
//            MoveItem(item);
        } else {
            ShowHideHint(item);
        }
    });
    $('#Slidebar_HorizontalList').mouseleave(hideHint);


    // The right button in the slidebar moves it to the right
    function shiftToRight() {
        hideHint(0);
        var cur = ($('#Slider_HorizontalList').position().left - $('#leftButton').outerWidth()) - $('#Slider_HorizontalList').outerWidth() - 35;
        // Checks if movement will cause the slidebar out of right edge
        if ($('#Slidebar_HorizontalList').outerWidth() - cur > $('#Slider_HorizontalList').outerWidth()) {
            cur = $('#Slidebar_HorizontalList').outerWidth() - $('#Slider_HorizontalList').outerWidth();
        }
        $('#Slider_HorizontalList').animate({left: cur}, {duration: 500, easing: "swing"});
    }

    var rightIntervalId;
    $('#rightButton').mousedown(function() {
        event.preventDefault();
        rightIntervalId = setInterval(shiftToRight, 500);
    }).mouseup(function() {
        clearInterval(rightIntervalId);
    }).click(function() {
        shiftToRight();
    });
    // The left button in the slidebar moves it to the left
    function shiftToleft() {
        hideHint(0);
        var cur = ($('#Slider_HorizontalList').position().left - $('#leftButton').outerWidth()) + $('#Slider_HorizontalList').outerWidth() - 35;
        // Checks if movement will cause the slidebar out of left edge
        if (cur > 0) {
            cur = 0;
        }
        $('#Slider_HorizontalList').animate({left: cur}, {duration: 500, easing: "swing"});
    }

    var leftIntervalId;
    $('#leftButton').mousedown(function() {
        event.preventDefault();
        leftIntervalId = setInterval(shiftToleft, 500);
    }).mouseup(function() {
        clearInterval(leftIntervalId);
    }).click(function() {
        shiftToleft();
    });
});

function HorizontalItemVisible(item) {
    var relativeLeft = item.closest('#Slider_HorizontalList').position().left;
    var itemLeft = item.position().left;
    var itemWidth = item.outerWidth();
    var leftButtonWidth = $('.button_HorizontalList#leftButton').outerWidth();
    var hintLeft = relativeLeft + itemLeft;
    var slideBarWidth = $('#Slidebar_HorizontalList').outerWidth();
    if (hintLeft - leftButtonWidth >= 0 && hintLeft + itemWidth - $('.button_HorizontalList').width() <= slideBarWidth) {
        return true;
    }
    return false;
}


// Sets the width of the slidebar so all images can fit inside in one line
$(window).load(function() {
    var totalWidth = 2;
    var Horizontal_img = $('.HorizontalItem');
    Horizontal_img.each(function() {
        totalWidth += $(this).outerWidth();
        //console.log($(this).outerWidth());
    });
    $('#Slider_HorizontalList').outerWidth(totalWidth);
    console.log();
});