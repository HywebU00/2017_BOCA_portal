;
(function($, window, undefined) {
    $('html').removeClass('no-js'); /*程式一開始就把 class="no-js" 移除*/
    // outside the scope of the jQuery plugin to
    // keep track of all dropdowns
    var $allDropdowns = $();
    // if instantlyCloseOthers is true, then it will instantly
    // shut other nav items when a new one is hovered over
    $.fn.dropdownHover = function(options) {
        // don't do anything if touch is supported
        // (plugin causes some issues on mobile)
        if ('ontouchstart' in document) return this; // don't want to affect chaining
        // the element we really care about
        // is the dropdown-toggle's parent
        $allDropdowns = $allDropdowns.add(this.parent());
        return this.each(function() {
            var $this = $(this),
            $parent = $this.parent(),
            defaults = {
                delay: 0,
                hoverDelay: 0,
                instantlyCloseOthers: true
            },
            data = {
                delay: $(this).data('delay'),
                hoverDelay: $(this).data('hover-delay'),
                instantlyCloseOthers: $(this).data('close-others')
            },
            showEvent = 'show.bs.dropdown',
            hideEvent = 'hide.bs.dropdown',
                // shownEvent  = 'shown.bs.dropdown',
                // hiddenEvent = 'hidden.bs.dropdown',
                settings = $.extend(true, {}, defaults, options, data),
                timeout, timeoutHover;
                $parent.hover(function(event) {
                // so a neighbor can't open the dropdown
                if (!$parent.hasClass('open') && !$this.is(event.target)) {
                    // stop this event, stop executing any code
                    // in this callback but continue to propagate
                    return true;
                }
                openDropdown(event);
            }, function() {
                // clear timer for hover event
                window.clearTimeout(timeoutHover)
                timeout = window.setTimeout(function() {
                    $this.attr('aria-expanded', 'false');
                    $parent.removeClass('open');
                    $this.trigger(hideEvent);
                }, settings.delay);
            });
            // this helps with button groups!
            $this.hover(function(event) {
                // this helps prevent a double event from firing.
                // see https://github.com/CWSpear/bootstrap-hover-dropdown/issues/55
                if (!$parent.hasClass('open') && !$parent.is(event.target)) {
                    // stop this event, stop executing any code
                    // in this callback but continue to propagate
                    $('.dropdown-menu').addClass('animated fadeIn');
                    return true;
                }
                openDropdown(event);
            });
            // handle submenus
            $parent.find('.dropdown-submenu').each(function() {
                var $this = $(this);
                var subTimeout;
                $this.hover(function() {
                    window.clearTimeout(subTimeout);
                    $this.children('.dropdown-menu').show();
                    // always close submenu siblings instantly
                    $this.siblings().children('.dropdown-menu').hide();
                }, function() {
                    var $submenu = $this.children('.dropdown-menu');
                    subTimeout = window.setTimeout(function() {
                        $submenu.hide();
                    }, settings.delay);
                });
            });

            function openDropdown(event) {
                // clear dropdown timeout here so it doesnt close before it should
                window.clearTimeout(timeout);
                // restart hover timer
                window.clearTimeout(timeoutHover);
                // delay for hover event.
                timeoutHover = window.setTimeout(function() {
                    $allDropdowns.find(':focus').blur();
                    if (settings.instantlyCloseOthers === true)
                        $allDropdowns.removeClass('open');
                    // clear timer for hover event
                    window.clearTimeout(timeoutHover);
                    $this.attr('aria-expanded', 'true');
                    $parent.addClass('open');
                    $this.trigger(showEvent);
                }, settings.hoverDelay);
            }
        });
    };
    $(document).ready(function() {
        // apply dropdownHover to all elements with the data-hover="dropdown" attribute
        $('[data-hover="dropdown"]').dropdownHover();
    });
})(jQuery, window);
/*-----------------------------------*/
///////////////第三層選單keyUp///////////
/*-----------------------------------*/
$(function() {
    $('.js-activated').dropdownHover().dropdown();
    $('ul.nav').children('li.dropdown').keyup(
        function() {
            $(this).children().show();
            $(this).siblings().focus(function() {
                $(this).hide()
            });
        });
    $('ul.nav').children('li.dropdown').keyup(
        function() {
            $(this).siblings().children('ul').hide();
        });
    $('ul.nav li.dropdown li:last>a').focusout(
        function() {
            $('ul.nav li.dropdown ul').hide();
        })
});
/*-----------------------------------*/
///////////////Slick輪播///////////////
/*-----------------------------------*/
$(document).ready(function() {
    //Single_slider 單張輪播
    $('.Single_slider').slick({
        dots: false, //true:要不要顯示圓點
        dotsClass: 'slick-dots',
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: false
    });
    //Multiple Items 多張輪播
    $('.Multiple-items').slick({
        dots: true,
        dotsClass: 'slick-number',
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 3, //一次顯示幾張
        slidesToScroll: 3 //一次輪播幾張
    });
    //Variable Items 寬度不一的多張輪播
    $('.variable-width').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true
    });
    $('.one-time').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        adaptiveHeight: true
    });
    $('.uneven').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4
    });
    //Responsive Display 縮小成手機板時會變成單張輪播
    $('.Responsive_slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 1500,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
    //Vertical_slider 垂直自動輪播
    $('.Vertical_slider').slick({
        dots: false,
        infinite: true,
        vertical: true,
        verticalSwiping: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 1500,

        speed: 1000,
        // centerMode: true,
        focusOnSelect: true,
        //      responsive: [{
        //          breakpoint: 990,
        //          settings: {
        //              slidesToShow: 2,
        //              slidesToScroll: 2
        //          }
        //      }, {
        //          breakpoint: 600,
        //          settings: {
        //              slidesToShow: 2,
        //              slidesToScroll: 2,
        //              vertical: false,
        //              verticalSwiping: false

        //          }
        //      }, {
        //          breakpoint: 480,
        //          settings: {
        //              slidesToShow: 1,
        //              slidesToScroll: 1,
        //              vertical: false,
        //              verticalSwiping: false
        //          }
        //      }]
    });
    //vertical-syncing 垂直點小圖換大圖輪播
    $('.vertical-syncing').slick({
        dots: false,
        infinite: true,
        vertical: true,
        verticalSwiping: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 1500,
        speed: 1000,
        centerMode: true,
        focusOnSelect: true,
        responsive: [{
            breakpoint: 990,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                vertical: false,
                verticalSwiping: false

            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                vertical: false,
                verticalSwiping: false
            }
        }]
    });
    // /Responsive Display 縮小成手機板時會變成單張輪播
    $('.mp_stuffSlider').slick({
        dots: false,
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        autoplay: true,
        autoplaySpeed: 1500,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
                infinite: true,
                dots: false
            }
        }, {
            breakpoint: 600,
            settings: {
                arrows: false,
                slidesToShow: 3,
                slidesToScroll: 3
            }
        }, {
            breakpoint: 480,
            settings: {
                arrows: false,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }]
    });
    //Responsive Display 縮小成手機板時會變成單張輪播
    $('.Responsive_slider').slick({
        dots: false,
        adaptiveHeight: true,
        infinite: true,
        speed: 1500,
        arrows: false,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        pauseOnHover: false,
        autoplaySpeed: 2500,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: false
            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
    // /Responsive Display 縮小成手機板時會變成單張輪播
    $('.website_slider').slick({
        dots: false,
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        autoplay: true,
        autoplaySpeed: 1500,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
                infinite: true,
                dots: false
            }
        }, {
            breakpoint: 600,
            settings: {
                dots: false,
                arrows: false,
                slidesToShow: 3,
                slidesToScroll: 3
            }
        }, {
            breakpoint: 480,
            settings: {
                dots: false,
                arrows: false,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }]
    });
    //slider-for  slider-nav 水平點小圖換大圖輪播
    $('.Slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        arrows: false,
        fade: true,
        autoplay: true,
        autoplaySpeed: 2000,
        asNavFor: '.Slider-nav'
    });
    $('.Slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500,
        asNavFor: '.Slider-for',
        dots: true,
        centerMode: true,
        focusOnSelect: true,
        slide: 'div'
    });
    //remove active class from all thumbnail slides
    $('.Slider-nav .slick-slide').removeClass('slick-active');

    //set active class to first thumbnail slides
    $('.Slider-nav .slick-slide').eq(0).addClass('slick-active');

    // On before slide change match active thumbnail to current slide
    $('.Slider-for').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        var mySlideNumber = nextSlide;
        $('.Slider-nav .slick-slide').removeClass('slick-active');
        $('.Slider-nav .slick-slide').eq(mySlideNumber).addClass('slick-active');
    });
    //使用lazyLoad
    $('.lazy').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500
    });
    //單張由右至左
    $('.single-item-rtl').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        rtl: true
    });
    //多張由右至左
    $('.multiple-items-rtl').slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        speed: 500,
        slidesToScroll: 3,
        rtl: true
    });

});
/*-----------------------------------*/
///////////////fatfooter///////////////
/*-----------------------------------*/
$(document).ready(function() {
    $(".FatFooterBtn").click(function() {
        $('#FatFooter>nav>ul>li>ul').slideToggle(function() {
            if ($(this).is(':visible')) { document.getElementById("FatFooterBtn").value = "收合"; } else { document.getElementById("FatFooterBtn").value = "展開"; }
        });
        $(this).toggleClass('close');
    });
});
/*-----------------------------------*/
///////送select選單內容至select框內///////
/*-----------------------------------*/
$(document).ready(function(e) {
    $('.search-panel .dropdown-menu').find('a').click(function(e) {
        e.preventDefault();
        var param = $(this).attr("href").replace("#", "");
        var concept = $(this).text();
        $('.search-panel span#search_concept').text(concept);
        $('.input-group #search_param').val(param);
    });
});
/*-----------------------------------*/
///////////////fatfooter///////////////
/*-----------------------------------*/
$(function() {

    $(".scrollToTop").click(function() {
        $("html,body").animate({ scrollTop: 0 }, 1000, "easeOutQuint");
        return false;

    });

});
$(function() {
    $(window).load(function() {
        $(window).bind('scroll resize', function() {
            var $this = $(this);
            var $this_Top = $this.scrollTop();
            //當高度小於130時，關閉區塊
            if ($this_Top < 130) {
                $(".scrollToTop").fadeOut();
            }
            //當高度小於130時，顯示區塊
            if ($this_Top > 130) {
                $(".scrollToTop").fadeIn();
            }
        }).scroll();
    });
});
/*-----------------------------------*/
///////////////megamenu////////////////
/*-----------------------------------*/
//防止menu跳掉
$(document).ready(function() {
    window.prettyPrint && prettyPrint()
    $(document).on('click', '.megamenu .dropdown-menu', function(e) {
        e.stopPropagation()
    })
})
/*-----------------------------------*/
//////////////頁籤選擇//////////////////
/*-----------------------------------*/
jQuery(document).ready(function() {
    $('.tabs').find('.active').next('.tabContent').fadeIn(); //顯示選到的頁籤的內容。用css設定也可以，本範例中css也有設定（18、19行）
    // var tw = $('.tabSet').width(); //取得頁籤區塊的寬度，並存入變數tw中
    var tabItemHeight = $('.tabs>h2>a').innerHeight(); //取得頁籤項目含padding高度，並存入變數tabItemHeight中
    $('.tabs').find('.tabContent').css('top', tabItemHeight); //找到頁籤內容區塊，設定它的top等於頁籤項目高度
    var tw = $('.tabSet').width() * 0.99;
    // console.log(tw);
    $(window).on('load resize', function() {
        var tw = $('.tabSet').width();
        $('.tabSet').each(function() { //各別處理每個頁籤組

            var tabContentHeight = $(this).find('.active').next('.tabContent').innerHeight(); //找到被選到的頁籤內容，取得它含padding的高度，並將高度存到變數tabContentHeight中。
            var tabItemLength = $(this).find('h2').length; //取得每個頁籤組中頁籤項目的個數

            $(this).height(tabContentHeight + tabItemHeight); //頁籤組的總高度＝頁籤內容的高度＋頁籤項目的高度
            $(this).find('h2>a').width(Math.floor(tw / tabItemLength)); //頁籤項目的寬度＝頁籤組的寬度／頁籤項目個數 

        });
    });
    $('.tabs>h2>a').focus(tabs); //用鍵盤選到頁籤時執行tabs函式
    $('.tabs>h2>a').click(tabs); //用滑鼠選到頁籤時執行tabs函式

    function tabs() { //定義tabs函式
        $(this).parent('h2').siblings().removeClass('active'); //非選到的頁籤項目的 class 要移除
        $(this).parent('h2').addClass('active'); //把選到的頁籤項目加上 class="active"
        tabContentHeight = $(this).parent('h2').next('.tabContent').innerHeight(); //取得選到的頁籤內容含padding的高度
        $(this).parents('.tabSet').height(tabContentHeight + tabItemHeight); //頁籤組的總高度＝頁籤內容的高度＋頁籤項目的高度
        return false;
    }

    function TAB_CHANGE() {
        var Window_Width = $(window).width();
        // console.log(Window_Width);
        if (Window_Width >= 736) {
            $('.passport .tabSet h2').css('width', '50%');
            $('.passport .tabSet h2 a').css('width', '100%');
        } else {
            $('.passport .tabSet h2').css('width', '100%');
            $('.passport .tabSet h2 a').css('width', '100%');
        }
    }
    $(window).load(TAB_CHANGE);
    $(window).resize(TAB_CHANGE);
});

//Responsive Display 縮小成手機板時會變成單張輪播
$('.Single_slider').slick({
    dots: true, //要不要顯示圓點
    dotsClass: 'slick-dots',
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    fade: true,
    slidesToScroll: 1
});

//計算輪播圖高度
var bannerHeight;
$(window).resize(function(){
   clearTimeout(bannerHeight);
   bannerHeight = setTimeout(doneResizing, 50);

});
function doneResizing() {
    var loopw = $('.Single_slider .slick-slide img').width();
    var VW = $(window).width();
    if (VW >= 768) {
        final_height = loopw * .45
        $('.Single_slider .slick-slide img').height(final_height);
        $('.bigbanner').height(final_height);
        $('.q_menu').height(final_height);
        $('.q_menu ul li').height(final_height * 0.5);
        $('.q_menu').prependTo('.bigbanner .container');
    } else {
        final_height = loopw * .6
        $('.Single_slider .slick-slide img').height(final_height);
        $('.bigbanner').height(final_height);
        $('.q_menu').height(final_height * 0.5);
        $('.q_menu').appendTo('.bigbanner');
        $('.q_menu ul li').height(final_height * 0.25);

    }
    // $(window).trigger('resize');  
}
doneResizing();
// $(window).on('load resize', function() {

// });


// 貼心提醒
$('.notice .close').click(function(event) {
    $(this).parents('.notice').slideUp({
        duration: 700,
        easing: "easeOutExpo"
    });
    return false;
});
// q_menu首頁快速
$('.q_menu ul li:nth-child(1) a').click(function(event) {
    $('body,html').stop(true, true).animate({
        scrollTop: $('.passport').offset().top
    }, 1200, 'easeOutExpo');
    return false;
});
$('.q_menu ul li:nth-child(2)').click(function(event) {
    $('body,html').stop(true, true).animate({
        scrollTop: $('.safe').offset().top
    }, 1200, 'easeOutExpo');
    return false;
});
$('.q_menu ul li:nth-child(3) a').click(function(event) {
    $('body,html').stop(true, true).animate({
        scrollTop: $('.safe').offset().top
    }, 1200, 'easeOutExpo');
    return false;
});
$('.q_menu ul li:nth-child(4) a').click(function(event) {
    $('body,html').stop(true, true).animate({
        scrollTop: $('.warning').offset().top
    }, 1200, 'easeOutExpo');
    return false;
});
$(function() {
    $('.scroll_table table').scroltable();
});

