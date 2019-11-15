/*-----------------------------------*/
////////////Menu DropDown//////////////
/*-----------------------------------*/
/**
 * @preserve
 * Project: Bootstrap Hover Dropdown
 * Author: Cameron Spear
 * Version: v2.1.3
 * Contributors: Mattia Larentis
 * Dependencies: Bootstrap's Dropdown plugin, jQuery
 * Description: A simple plugin to enable Bootstrap dropdowns to active on hover and provide a nice user experience.
 * License: MIT
 * Homepage: http://cameronspear.com/blog/bootstrap-dropdown-on-hover-plugin/
 */
 ;
 (function($, window, undefined) {
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
        dots: true, //要不要顯示圓點
        dotsClass: 'slick-dots',
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        fade: false,
        slidesToScroll: 1
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
    $('.serviceSlider').slick({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 1500,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                dots: true
            }
        }, {
            breakpoint: 600,
            settings: {
                arrows: true,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 480,
            settings: {
                arrows: true,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
    // /Responsive Display 縮小成手機板時會變成單張輪播
    $('.cp_slider').slick({
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
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                dots: true
            }
        }, {
            breakpoint: 600,
            settings: {
                arrows: true,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 480,
            settings: {
                arrows: true,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
    // /Responsive Display 縮小成手機板時會變成單張輪播
    $('.mp_serviceSlider').slick({
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
    // /Responsive Display 縮小成手機板時會變成單張輪播
    $('.website_slider').slick({
        dots: false,
        infinite: true,
        speed: 500,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 1500,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                dots: false
            }
        }, {
            breakpoint: 600,
            settings: {
                dots: false,
                arrows: false,
                slidesToShow: 2,
                slidesToScroll: 2
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
    // 小輪播
    $('.small_slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 1500,
        responsive: [{
            breakpoint: 900,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
        }, {
            breakpoint: 720,
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
    $('.cp_albumSlider').slick({
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
                slidesToShow: 4,
                slidesToScroll: 4,
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
    $('#FatFooter>nav>ul>li>ul').hide();
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
    $(".scrollup").click(function() {
        $("html,body").animate({ scrollTop: 0 }, 500, "easeOutQuint");
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
                $(".scrollup").fadeOut();
            }
            //當高度小於130時，顯示區塊
            if ($this_Top > 130) {
                $(".scrollup").fadeIn();
            }
        }).scroll();
    });
});
/*-----------------------------------*/
///////////////menu////////////////
/*-----------------------------------*/
// $(function() {
//     function ADD_WMENU(){
//         var Window_Width = $(window).width();
//         console.log(Window_Width);
//         if(Window_Width>768)
//         {
//             $('.MainMenu').addClass('welcomeMenu');
//         }
//         else{
//             $('.MainMenu').removeClass('welcomeMenu');
//         }
//     }
//     $(window).load(function(){
//         ADD_WMENU();
//         $(window).bind('scroll resize', function(){
//             ADD_WMENU();
//         });
//     })
// });
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
    ////////////////tab頁籤////////////////
    /*-----------------------------------*/
    $(document).ready(function() {
    // 預設顯示第一個 Tab
    var _showTab = 0;
    var $defaultDiv = $('div.tabs').eq(_showTab).addClass('active');
    $($defaultDiv.find('a').attr('href')).siblings('div.tab_container').hide();
    // 當 li 頁籤被點擊時...
    // 若要改成滑鼠移到 li 頁籤就切換時, 把 click 改成 mouseover
    $('div.tabs').click(function() {
        // 找出 li 中的超連結 href(#id)
        var $this = $(this),
        _clickTab = $this.find('a').attr('href');
        // 把目前點擊到的 li 頁籤加上 .active
        // 並把兄弟元素中有 .active 的都移除 class
        $this.addClass('active').siblings('.active').removeClass('active');
        // 淡入相對應的內容並隱藏兄弟元素
        $(_clickTab).stop(false, true).fadeIn().siblings('div.tab_container').hide();
        return false;
    })
    $("#font_l").trigger('click');

    function Focus(id) {
        $("#" + id).trigger('click');
        document.getElementById(id).focus();
    }
});
    $(document).ready(function() {
        function MP_BANNER_H() {
            $('.mp_banner .Single_slider img').each(function(index, el) {
                $this = $(this);
                var MP_IMG_W = $this.width();
                var MP_IMG_H = MP_IMG_W * 0.3;
                $this.css('height', MP_IMG_H);
            // console.log(MP_IMG_H);
        });
        }
        MP_BANNER_H();
        $(window).resize(function(e) {
            MP_BANNER_H();
        });
    });
    /*-----------------------------------*/
///////////////置頂go to top////////////
/*-----------------------------------*/
$(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
        $('.scrollToTop').fadeIn();
    } else {
        $('.scrollToTop').fadeOut();
    }
});
/*-----------------------------------*/
/////Click event to scroll to top//////
/*-----------------------------------*/
$('.scrollToTop').click(function() {
    $('html, body').animate({ scrollTop: 0 }, 800, 'easeOutExpo');
    return false;
});
/*-----------------------------------*/
//////////////第三節點//////////////////
/*-----------------------------------*/
(function($) {
    $(document).ready(function() {
        $('ul.dropdown-menu [data-toggle=dropdown]').on('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            $(this).parent().siblings().removeClass('open');
            $(this).parent().toggleClass('open');
        });
    });
})(jQuery);
/*-----------------------------------*/
//////////////字型大小//////////////////
/*-----------------------------------*/
$(function() {
    $('.fontSetting .f_s').click(function(event) {
        $('body').css('font-size', '15px');
    });
    $('.fontSetting .f_m').click(function(event) {
        $('body').css('font-size', '16px');
    });
    $('.fontSetting .f_l').click(function(event) {
        $('body').css('font-size', '18px');
    });
});

/*-----------------------------------*/
//////////////城市更多//////////////////
/*-----------------------------------*/
$(function() {
    $('.recent_status').css('display', 'none');
    $('.status').click(function() {
        $('.recent_status').slideToggle();
        return false;
    });
});
/*-----------------------------------*/
//////////////頁籤選擇//////////////////
/*-----------------------------------*/
jQuery(document).ready(function() {
    $('.tabs').find('.active').next('.tabContent').fadeIn(); //顯示選到的頁籤的內容。用css設定也可以，本範例中css也有設定（18、19行）
    var tw = $('.tabSet').width(); //取得頁籤區塊的寬度，並存入變數tw中
    var tabItemHeight = $('.tabs>h1>a').innerHeight(); //取得頁籤項目含padding高度，並存入變數tabItemHeight中
    $('.tabs').find('.tabContent').css('top', tabItemHeight); //找到頁籤內容區塊，設定它的top等於頁籤項目高度
    $(window).on('load resize', function() {

        $('.tabSet').each(function() { //各別處理每個頁籤組

            var tabContentHeight = $(this).find('.active').next('.tabContent').innerHeight(); //找到被選到的頁籤內容，取得它含padding的高度，並將高度存到變數tabContentHeight中。
            var tabItemLength = $(this).find('h1').length; //取得每個頁籤組中頁籤項目的個數

            $(this).height(tabContentHeight + tabItemHeight); //頁籤組的總高度＝頁籤內容的高度＋頁籤項目的高度
            $(this).find('h1>a').width(tw / tabItemLength); //頁籤項目的寬度＝頁籤組的寬度／頁籤項目個數
            // var Window_Width = $(window).width();
            //    $(window).resize(function() {
            //        console.log(Window_Width);
            //        if(Window_Width<tw){
            //            $('.tabSet').find('h1').css('width', '300px');
            //        }else{
            //         $(this).find('h1').width( tw / tabItemLength ); //頁籤項目的寬度＝頁籤組的寬度／頁籤項目個數
            //     }
            // });


        });
    });
    $('.tabs>h1>a').focus(tabs); //用鍵盤選到頁籤時執行tabs函式
    $('.tabs>h1>a').click(tabs); //用滑鼠選到頁籤時執行tabs函式

    function tabs() { //定義tabs函式
        $(this).parent('h1').siblings().removeClass('active'); //非選到的頁籤項目的 class 要移除
        $(this).parent('h1').addClass('active'); //把選到的頁籤項目加上 class="active"
        tabContentHeight = $(this).parent('h1').next('.tabContent').innerHeight(); //取得選到的頁籤內容含padding的高度
        $(this).parents('.tabSet').height(tabContentHeight + tabItemHeight); //頁籤組的總高度＝頁籤內容的高度＋頁籤項目的高度
    }

    function TAB_CHANGE() {
        var Window_Width = $(window).width();
        // console.log(Window_Width);
        if (Window_Width > 768) {
            $('.meeting .tabSet h1').css('width', '50%');
            $('.meeting .tabSet h1 a').css('width', '100%');
        } else {
            $('.meeting .tabSet h1').css('width', '100%');
            $('.meeting .tabSet h1 a').css('width', '100%');
        }
    }
    $(window).load(TAB_CHANGE);
    $(window).resize(TAB_CHANGE);
});


/*-----------------------------------*/
//////////////為您服務//////////////////

$(document).ready(function() {
    $('body').append('<div class="newbox"></div>');
    $('.newbox').insertAfter('.mp_banner');
    $('.foryou ul').hide();
    $('.foryou ul').find('li:last>a').focusout(function() {
        $('.foryou').find('ul').hide();
    });

    function MOVE_FORYOU() {
        $('.foryou ul').hide();
        var Window_Width = $(window).width();
        // console.log(Window_Width);
        if (Window_Width < 768) // 小尺寸
        {
            $('.foryou').prependTo(".newbox");
            $('.foryou >a').on('click', function(event) {
                $(this).next('ul').stop(true, true).slideToggle();
                // event.preventDefault();
            });

        } else { //大尺寸
            $('.foryou').prependTo(".mp_banner");
            $('.foryou').hover(function() {
                $(this).children('ul').stop(true, true).slideDown();
            }, function() {
                $(this).children('ul').stop(true, true).slideUp();
            });
            $('.foryou a:first').on('focus', function(event) {
                $(this).next('ul').stop(true, true).slideDown();
                event.preventDefault();
            });
            $('html').click(function(e) {
                var target = e.target;
                if (!$(target).is('.foryou')) {
                    $('.foryou').children('ul').hide();
                }
            });

        }
    }
    $(window).load(function() {
        MOVE_FORYOU();
        $(window).bind('scroll resize', function() {
            MOVE_FORYOU();
        });
    });





});


$(function() {
    $('.Logo').append('<div class="logo_ani"><img src="images/logo.svg"></div>');
    $(".meeting .tabContent li span:contains('早上')").css("background", "#2bbee8");
    $(".meeting .tabContent li span:contains('下午')").css("background", "#9467a4");
    $(".detail th:contains('全天場')").css({
        "background": '#036600',
        "color": '#FFF'
    });
    $(".detail th:contains('上午場')").css({
        "background": '#2778fb',
        "color": '#FFF'
    });
    $(".detail th:contains('下午場')").css({
        "background": '#fe6665',
        "color": '#FFF'
    });
});
/*-----------------------------------*/
//////////////相簿燈箱//////////////////
/*-----------------------------------*/
$(function() {
    $('.gallery').append('<div class="lightbox"><a href="#" class="light_close">關閉</a><a href="#" class="light_prev">上一張</a><a href="#" class="light_next">下一張</a><img src="" alt=""></div>')
    $('.gallery .lightbox').hide(); // lightbox先隱藏

    var PIC_SRC = $('.gallery .lightbox img').attr('src');
    // var THUMB_PIC = $(this).attr('src');
    var PIC_INDEX = 0;
    $('.gallery .thumbnail img').each(function(index) {
        $(this).click(function(e) {
            e.preventDefault();
            
            $('body').addClass('noscroll');
            var THUMB_H3 = $(this).attr('alt');
            // // console.log(THUMB_H3);
            $(this).parents('ul').siblings('.lightbox').append('<div class="caption">' + THUMB_H3 + '<div>');
            THUMB_PIC = $(this).attr('src');
            $('.gallery .lightbox img').attr('src', THUMB_PIC);
            // // $('.gallery .lightbox').fadeIn();
            $(this).parents('ul').siblings('.lightbox').fadeIn();
            
            PIC_INDEX = index;
            // console.log(PIC_INDEX);
            // console.log('序列' + PIC_INDEX);

        });
    });
    $('.light_close').click(function(e) {
        e.preventDefault();
        $('.gallery .lightbox').hide(); // 如果點到close，lightbox隱藏
        // $('.gallery .lightbox').remove();
        $('body').removeClass('noscroll');
        $('.gallery .lightbox .caption').empty();
        

    });
    //計算當頁縮圖數量
    var PIC_NUM = $('.gallery .thumbnail').length;
    // 下一張 function
    function NEXT_MOV() {
        if ((PIC_INDEX + 1) < PIC_NUM) { //pic_index+1 如果小於 圖片數量
            //PIC_INDEX = (PIC_INDEX + 1) % PIC_NUM;//取餘數
            PIC_INDEX++; //pic_index ++
            /*if(PIC_INDEX >= PIC_NUM){
            PIC_INDEX=0;
        }*/
    } else {
            PIC_INDEX = 0 //如果等於或大於圖片數量 pic_index =0 ，跳到第一張
        }
        THUMB_PIC = $('.gallery .thumbnail img').eq(PIC_INDEX).attr('src');
        THUMB_H3 = $('.gallery .thumbnail img').eq(PIC_INDEX).attr('alt');
        $('.gallery .lightbox .caption').html(THUMB_H3);
        $('.gallery .lightbox img').hide();
        $('.gallery .lightbox img').fadeIn();
        $('.gallery .lightbox img').attr('src', THUMB_PIC);
        //放入燈箱 img src
        // console.log(THUMB_PIC);
        // console.log('序列' + PIC_INDEX);
        // console.log(PIC_INDEX);
    }
    $('.gallery .light_next').click(function(e) {
       e.preventDefault();
       NEXT_MOV();
   });
    // 上一張 function
    function PREV_MOV() {
        if ((PIC_INDEX + 1) > 1) { //pic_index+1  如果大於 1
            //PIC_INDEX = (PIC_INDEX + 1) % PIC_NUM;//取餘數
            PIC_INDEX--; //pic_index --
            /*if(PIC_INDEX >= PIC_NUM){
    PIC_INDEX=0;

}*/
console.log(PIC_INDEX);
} else {
            PIC_INDEX = PIC_NUM - 1; //如果等於或小於圖片數量 pic_index =圖片數量-1 ，跳到最後一張
        }
        THUMB_PIC = $('.gallery .thumbnail img').eq(PIC_INDEX).attr('src'); //取縮圖 img src
        THUMB_H3 = $('.gallery .thumbnail img').eq(PIC_INDEX).attr('alt');
        $('.gallery .lightbox .caption').html(THUMB_H3);
        $('.gallery .lightbox img').hide();
        $('.gallery .lightbox img').fadeIn();
        $('.gallery .lightbox img').attr('src', THUMB_PIC); //放入燈箱 img src
        // console.log(THUMB_PIC);
        // console.log('序列' + PIC_INDEX);
    }
    $('.gallery .light_prev').click(function(e) {
        e.preventDefault();
        PREV_MOV();
        
    });
    // 左右按鍵移動
    $('body').keydown(function(e) {
        if (e.keyCode == 37) {
            PREV_MOV();
        } else if (e.keyCode == 39) {
            NEXT_MOV();
        } else if (e.keyCode == 27) {
            $('.gallery .lightbox').hide();
        }
    });
});
