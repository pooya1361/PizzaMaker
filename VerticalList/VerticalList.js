function ShowFigure(item) {
    var itemId = item.attr('Id');
    $.ajax({
        url: 'VerticalList/GetIngreInfo.php',
        type: 'post',
        dataType: 'json',
        data: {itemId: itemId},
        success: function(data) {
            $('#' + item.attr('Id') + '.FigurePic').remove();
            var iteration = item.attr('Iteration');
            for (var i = 1; i <= iteration; i++) {
                var degree = 360 / iteration * i;
                $(document.createElement("img"))
                        .attr({id: item.attr('Id'),
                    Iteration: i,
                    src: "images/Figures/" + data.FigurePic})
                        .addClass('FigurePic')
                        .appendTo($('#PizzaFloor'))
                        .css('-webkit-transform', 'rotate(' + degree + 'deg)')
                        .css('-moz-transform', 'rotate(' + degree + 'deg)')
                        .css('-o-transform', 'rotate(' + degree + 'deg)')
                        .css('transform', 'rotate(' + degree + 'deg)').hide();
            }

            (function shownext(jq) {
                jq.eq(0).show("fast", function() {
                    (jq = jq.slice(1)).length && shownext(jq);
                });
            })($('#' + item.attr('Id') + '.FigurePic'));

        },
        error: function(xhr, desc, err) {
            console.log(xhr);
            console.log("Details: " + desc + "\nError:" + err);
        }
    });
}


$(document).ready(function() {
// Moves the clicked ingredient to the middle of slidebar
    var figure_z_index = 0;
    var currentItemId = 0;
    $('.VerticalItem').mouseenter(function() {
        var item = $(this);
        $('.VerticalItem').css('border-color', 'white');
        item.css('border-color', 'black');
    });

    $('.VerticalItem').click(function() {
        var item = $(this);
        var upButtonHeight = $('.button_VerticalList#upButton').outerHeight();
        var itemHeight = item.outerHeight();
        var itemTop = item.position().top;
        var slider = $('#Slider_VerticalList');
        var sliderTop = Math.round(slider.position().top - upButtonHeight);
        var SliderHeight = slider.outerHeight();
        var slidebar = $('#Slidebar_VerticalList');
        var SlideBarHeight = slidebar.outerHeight();
        var move = 0;

        var itemRelativeTop = item.position().top + sliderTop;
        var itemRelativeBottom = itemRelativeTop + itemHeight;

        if (itemRelativeBottom > SlideBarHeight)
        {
            move = sliderTop + (SlideBarHeight - itemRelativeBottom - 15);
        } else if (itemRelativeTop < 0) {
            move = sliderTop - itemRelativeTop + 15;
        }

        if (move !== 0) {
            var Hints = $('.Hint_VerticalList');
            var Hint_IngreName = $('.Hint_VerticalList#IngreName');

            // Checks if movement will cause the slidebar out of boundries
            if (SlideBarHeight - move > SliderHeight) {
                move = SlideBarHeight - SliderHeight;
            } else if (move > 0) {
                move = 0;
            }
            var hintMoveDiff = sliderTop - move;
            var hintMove = Hint_IngreName.position().top - hintMoveDiff;
            slider.animate({top: move}, {duration: 500, easing: "swing"});
            Hints.animate({top: hintMove}, {duration: 500});
            var Hints_Promise = Hints.promise();
            Hints_Promise.done(
                    function() {
                        ShowHideHint(item);
                    });

        }
        // ---------- Checkmark and Figure -------------
        if (item.find('.VerticalItem_CheckCircle').css('display') === 'none') {
            item.find('.VerticalItem_CheckCircle').show();

            ShowFigure(item);

            var Hint_IngreDetails = $('.Hint_VerticalList#IngreDetails');
            Hint_IngreDetails.show();

            Hint_IngreDetails.animate({right: "-40px"}, 'fast', function() {
                Hint_IngreDetails.animate({right: "-36px"}, 'fast');
            });
        } else {
            item.find('.VerticalItem_CheckCircle').hide();
            $('#' + item.attr('id') + '.FigurePic').hide();
            figure_z_index--;
        }
    });

    function ShowHideHint(item) {
        var Hints = $('.Hint_VerticalList');
        var Hint_IngreName = $('.Hint_VerticalList#IngreName');
        var Hint_IngreDetails = $('.Hint_VerticalList#IngreDetails');
        var relativeTop = item.closest('#Slider_VerticalList').position().top;
        var itemTop = item.position().top;
        var itemHeight = item.outerHeight();
        var hintTop = relativeTop + itemTop;
        var itemChecked = false;
        currentItemId = item.attr('Id');
        if (VerticalItemsVisible(item)) {
            $('.Hint_VerticalList').css('top', hintTop);
            Hint_IngreName.css('height', itemHeight);
            Hint_IngreDetails.css('height', itemHeight);
            Hints.css('width', itemHeight);
            itemChecked = item.find('.VerticalItem_CheckCircle').css('display') !== 'none';
//            Hint_PizzaPrice.css('left', hintLeft);
//            Hint_PizzaPrice.css('width', itemWidth);
//            var itemId = item.attr('id');
//            $.ajax({
//                url: 'VerticalList/GetIngreInfo.php',
//                type: 'post',
//                dataType: 'json',
//                data: {itemId: itemId},
//                success: function(data) {
//                    Hint_IngreName.html(
//                            '<h2 class="VerticalItem_HintItem" id="IngreName">' + data.Name + '<h2>');
//                    $('.VerticalItem_HintItem').width(item.height());
//                    $('.VerticalItem_HintItem').css('-webkit-transform', 'rotate(270deg) translateY(-' + (item.height() - 2) + 'px)');
////                    Hint_PizzaPrice.html(
////                            '<h2 class="VerticalItem_HintItem" id="PizzaPrice">' + data.PizzaPrice + ' SEK<h2>');
//                },
//                error: function(xhr, desc, err) {
//                    console.log(xhr);
//                    console.log("Details: " + desc + "\nError:" + err);
//                }
//            });

            Hint_IngreName.html(
                    '<h2>' + item.attr('IngreName') + '</h2>');
//            console.log(item.attr('Iteration'));
            Hint_IngreDetails.attr('Iteration', item.attr('Iteration'));

            Hint_IngreName.clearQueue();
            Hint_IngreDetails.clearQueue();
            Hint_IngreName.show();

            if (Hint_IngreName.position().left === 0) {
                Hint_IngreName.delay(300).animate({left: "-30px"}, 'fast', function() {
                    Hint_IngreName.animate({left: "-26px"}, 'fast', function() {
                        if (itemChecked)
                            Hint_IngreDetails.animate({right: "-40px"}, 'fast', function() {
                                Hint_IngreDetails.animate({right: "-36px"}, 'fast');
                            });
                    });
                });
            } else {
                if (itemChecked) {
                    Hint_IngreDetails.show();
                    Hint_IngreDetails.animate({right: "-36px"}, 'fast');
                }
                else
                    Hint_IngreDetails.hide();
            }
        }
    }

    $('.VerticalItem').mouseenter(function() {
        ShowHideHint($(this));
    });

    $('.Hint_VerticalList, .button_VerticalList').mouseleave(hideHint);

    $('.VerticalDetailButton#Plus').click(function() {
        var item = $('#' + currentItemId + '.VerticalItem');
        var iteration = item.attr('Iteration');
        item.attr('Iteration', ++iteration);
        ShowFigure(item);
    });

    $('.VerticalDetailButton#Minus').click(function() {
        var item = $('#' + currentItemId + '.VerticalItem');
        var iteration = item.attr('Iteration');
        if (iteration > 1)
        {
            item.attr('Iteration', --iteration);
            ShowFigure(item);
        }
    });

    $('.VerticalItem_CheckCircle').on('show', function() {

    });

    //The magic code to add show/hide custom event triggers
    (function($) {
        $.each(['show', 'hide'], function(i, ev) {
            var el = $.fn[ev];
            $.fn[ev] = function() {
                this.trigger(ev);
                return el.apply(this, arguments);
            };
        });
    })(jQuery);



//    $('.VerticalDetailButton').mouseenter(function() {
//        console.log('enter');
//       $(this).css('background-color', '#ccffcc'); 
//    }).mouseleave(function() {
//       $(this).css('background-color', 'white'); 
//    });
//

    function hideHint() {
        var Hint_IngreName = $('.Hint_VerticalList#IngreName');
        var Hint_IngreDetails = $('.Hint_VerticalList#IngreDetails');

        if (Hint_IngreName.position().left === -26) {
            Hint_IngreName.clearQueue();
            Hint_IngreDetails.clearQueue();
            Hint_IngreName.delay(800).animate({left: "-30px"}, 'fast', function() {
                Hint_IngreName.animate({left: "0px"}, 'fast', function() {
                    Hint_IngreDetails.delay(100).animate({right: "-40px"}, 'fast', function() {
                        Hint_IngreDetails.animate({right: "0px"}, 'fast');
                    });
                });
            });
        }
    }

    // The bottom button in the slidebar moves it to the bottom
    function shiftToBottom() {
        var SlidebarHeight = $('#Slidebar_VerticalList').height();
        var SliderHeight = $('#Slider_VerticalList').height();
        var SliderTop = $('#Slider_VerticalList').position().top;
        var cur = (SliderTop - $('#upButton').height()) - $('#Slider_VerticalList').outerHeight() - 15;
        // Checks if movement will cause the slidebar out of right edge
        if (SlidebarHeight - cur > SliderHeight) {
            cur = SlidebarHeight - SliderHeight;
        }
//        console.log('SliderTop = ' + SliderTop);
//        console.log('Slidebar =' + SlidebarHeight);
//        console.log('slider =' + SliderHeight);
//        console.log('Cur =' + cur);
        $('#Slider_VerticalList').animate({top: cur}, {duration: 500, easing: "swing"});
    }

    var bottomIntervalId;
    $('#downButton').mousedown(function() {
        event.preventDefault();
        bottomIntervalId = setInterval(shiftToBottom, 500);
    }).mouseup(function() {
        clearInterval(bottomIntervalId);
    }).click(function() {
        shiftToBottom();
    });
    // The top button in the slidebar moves it to the top
    function shiftToTop() {
        var cur = ($('#Slider_VerticalList').position().top - $('#upButton').height()) + $('#Slider_VerticalList').outerHeight() - 15;
        // Checks if movement will cause the slidebar out of left edge
        if (cur > 0) {
            cur = 0;
        }
        $('#Slider_VerticalList').animate({top: cur}, {duration: 500, easing: "swing"});
    }

    var topIntervalId;
    $('#upButton').mousedown(function() {
        event.preventDefault();
        topIntervalId = setInterval(shiftToTop, 500);
    }).mouseup(function() {
        clearInterval(topIntervalId);
    }).click(function() {
        shiftToTop();
    });
});

function VerticalItemsVisible(item) {
    var relativeTop = item.closest('#Slider_VerticalList').position().top;
    var itemTop = item.position().top;
    var upButtonHeight = $('.button_VerticalList#upButton').outerHeight();
    var itemHeight = item.outerHeight();
    var hintTop = relativeTop + itemTop;
    var slideBarHeight = $('#Slidebar_VerticalList').outerHeight();
    if (hintTop - upButtonHeight >= 0 && hintTop + itemHeight - $('.button_VerticalList').height() <= slideBarHeight) {
        return true;
    }
    return false;
}

// Sets the height of the slidebar so all images can fit inside in one line
$(window).load(function() {
    var totalHeight = 1;
    var ingredients = $('.VerticalItem');
    ingredients.each(function() {
        totalHeight += $(this).outerHeight();
    });
//    console.log(totalHeight);
    $('#Slider_VerticalList').height(totalHeight);
    $('.VerticalItem_CheckCircle').hide();
});