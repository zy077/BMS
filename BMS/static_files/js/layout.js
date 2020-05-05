$(function () {
    pageInitModule.setWidth();
    pageInitModule.setSidebar();
    pageInitModule.setCarousel();
});
$(window).resize(function () {
    pageInitModule.setWidth();
});
$(window).scroll(function () {
    pageInitModule.setScrollToTop();
});

/*
* init page when page load
*/
var pageInitModule = (function (mod) {
    mod.setCarousel = function () {
        try {
            $('.carousel').hammer().on('swipeleft', function () {
                $(this).carousel('next');
            });
            $('.carousel').hammer().on('swiperight', function () {
                $(this).carousel('prev');
            });
        } catch (e) {
            console.log("you mush import hammer.js and jquery.hammer.js to let the carousel can be touched on mobile");
        }
    };
    mod.setWidth = function () {
        if ($(window).width() < 768) {
            $(".sidebar").css({ left: -220 });
            $(".all").css({ marginLeft: 0 });
        } else {
            $(".sidebar").animate({ left: 0 });
            $(".all").animate({ marginLeft: 220 });
        }
    };
    mod.setScrollToTop = function () {
        var top = $(window).scrollTop();
        if (top < 60) {
            $('#goTop').hide();
        } else {
            $('#goTop').show();
        }
    };
    mod.setSidebar = function () {
        $('[data-target="sidebar"]').click(function () {
            var asideleft = $(".sidebar").offset().left;
            if (asideleft == 0) {
                $(".sidebar").animate({ left: -220 });
                $(".all").animate({ marginLeft: 0 });
            }
            else {
                $(".sidebar").animate({ left: 0 });
                $(".all").animate({ marginLeft: 220 });
            }
        });
        $(".has-sub>a").click(function () {
            if ($(this).parent().find(".sub-menu").is(":hidden")){
                $(this).parent().find(".sub-menu").slideDown("fast");
                $(this).parent().find("a:eq(0)").find("i:eq(1)").attr("class","fa fa-chevron-up fa-fw pull-right");
                $(this).parent().siblings().find(".sub-menu").slideUp("fast");
                $(this).parent().siblings().find("a:eq(0)").find("i:eq(1)").attr("class","fa fa-chevron-down fa-fw pull-right");
                $(this).parent().find(".third-submenu").slideUp("fast");
                $(this).parent().find(".third-sub").find("a:eq(0)").find("i").attr("class","fa fa-plus fa-fw pull-right");
            }
            else{
                $(this).parent().find(".sub-menu").slideUp("fast");
                $(this).parent().find("a:eq(0)").find("i:eq(1)").attr("class","fa fa-chevron-down fa-fw pull-right");
            }
        });
        $(".third-sub>a").click(function(){
            if ($(this).parent().find(".third-submenu").is(":hidden")){
                $(this).parent().find(".third-submenu").slideDown("fast");
                $(this).parent().find("a:eq(0)").find("i").attr("class","fa fa-minus fa-fw pull-right");
                $(this).parent().siblings().find(".third-submenu").slideUp("fast");
                $(this).parent().siblings().find("a:eq(0)").find("i").attr("class","fa fa-plus fa-fw pull-right");
            }
            else{
                $(this).parent().find(".third-submenu").slideUp("fast");
                $(this).parent().find("a:eq(0)").find("i").attr("class","fa fa-plus fa-fw pull-right");
            }
        });
        // var currentUrl = window.location.href;
        // $(".nav").children('li').each(function () {
        //     var isActive = false;
        //     if (currentUrl.indexOf($(this).find("a:eq(0)").attr("href")) > -1 || isActive) {
        //         $(this).addClass("active");
        //     }
        // });
    };
    return mod;
})(window.pageInitModule || {});
