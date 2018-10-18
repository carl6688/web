/// <reference path="jquery-3.2.1.js" />
$(document).ready(function () {
    var path = window.location.pathname;
    var page = path.substring(path.lastIndexOf('/') + 1);

    if (path !== "/") {
        $("." + page.split(".")[0] + "").addClass("mc-tab-active");
    }


    $(window).resize(function () {
        if ($(window).width() >= 992) {
            $(".mob-nav").show();
        } else {
            $(".nav-button > div").removeClass("change");
            $(".mob-nav").hide();
        }
    });
    $(".about-nav > div").click(function () {
        var getnum = $(this).index() + 1;
        $(".about-nav > div").removeClass("about-active");
        $(this).addClass("about-active");
        $(".about-text .abcon").hide();
        $(".about-text .abcon:nth-child(" + getnum + ")").show();
    });
    $(".page-up").click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });
    $(window).scroll(function () {
        scrollUp();
    });
    $(".play-icon").click(function () {
        $(".popup-video").show();
        $(".bg-black-video").show();
        $(".home-video").get(0).play();
    });
    $(".close-video").click(function () {
        closeVideo();
    });
    $(".read, .arrow-container").click(function () {
        var getLocation = $("#products").offset().top;
        if ($(window).width() <= 991) {
            getLocation -= 40;
        } else {
            getLocation -= 80;
        }
        $('html, body').animate({
            scrollTop: getLocation
        }, 800);
    });

    // ----- JAM (9-20-17) Product Dropdown ----- //

    $(".navi-cont > ul li.drop-icon > i").click(function () {
        $(".navi-cont > ul li.drop-icon").children('.drop-product').slideToggle(300);
        $(".navi-cont > ul li.drop-icon ").toggleClass("drop-icon-active");
        $(".navi-cont > ul > li > i").toggleClass('active');
    });
    $(".navi-cont > ul > li > a").click(function () {
        $(".navi-cont > ul > li > i").removeClass('active');
    });
    $(".bg-black").click(function () {
        $("bg-black").css("display", "none");
        $(".navi-cont > ul > li > i").removeClass('active');
    });
    $(".bg-black-video").click(function () {
        closeVideo();
    });
    //----Close Whitelist Popup using Escape------//
    //$(document).keydown(function (e) {
    //    if (e.keyCode === 27) {
    //        $(".wl-pop-up").hide();
    //        $(".errorMsg").remove();
    //        $(".error").removeClass("error");
    //    }
    //});

    //-----Erick (10-18-17 Whitelist Popup ------//
    $(".wl-close").click(function () {
        $(".wl-pop-up").hide();
        $(".errorMsg").remove();
        $(".error").removeClass("error");
    });


});


function closeVideo() {
    document.getElementById("home-video").load();
    $(".popup-video").hide();
    $(".bg-black-video").hide();
}

function scrollUp() {
    var getLocate = $(window).scrollTop();
    if (getLocate <= 150) {
        $(".page-up").fadeOut(200);
    } else {
        $(".page-up").fadeIn(200);
    }
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

(function ($) {
    $.fn.navi = function () {
        $(".nav-head > li > a").click(function (e) {

            e.preventDefault();
            $('.nav-button').removeClass('active');
            $(".navi-cont").removeClass('active');
            $('.bg-black').css({
                "z-index": "",
                "display": ""
            });
            var getclick = $(this).parent().index() + 1;
            var getLocation = $($(this).attr('href')).offset().top;
            if ($(window).width() <= 991) {
                getLocation -= 40;
                if (getclick != 2) {
                    $(".nav-button > div").removeClass("change");
                    $(".mob-nav").hide();
                }
            } else {
                getLocation -= 60;
            }
            $('html, body').animate({
                scrollTop: getLocation
            }, 800);
        });
    };


})(jQuery);