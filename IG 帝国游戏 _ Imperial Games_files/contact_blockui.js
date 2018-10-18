/// <reference path="jquery-3.2.1.js" />
$(document).ready(function () {

    $(document).keydown(function (e) {
        if (e.keyCode == 27) {
            $('.navi-cont').removeClass('active');
            $('.nav-button').removeClass('active');

            $('.popup_box').fadeOut("slow");
            $("[data-vb='blackbg']").hide();
            $(".login-popup").hide();
            $(".user-clear").val("");
            $(".pass-clear").val("");

        }
    });


// -------------- JAM (9-5-17) ------------- //
    // for Login popup
    $('.login > a').click(function () {
        $(".error-message").text("");
        $(".bg-black").show();
        $(".login-popup").show();
    });
    $(".close-pop > i, .bg-black").click(function () {
        $(".error-message").text("");
        $(".bg-black").hide();
        $(".login-popup").hide();
        $(".user-clear").val("");
        $(".pass-clear").val("");
    });

    // for Navigation
    $('.nav-button').click(function () {

        if ($('.nav-button').hasClass('active')) {
            $('.nav-button').removeClass('active');
            $(".navi-cont").removeClass('active');
            $('.bg-black').css({
                "z-index": "",
                "display": ""
            });
        }
        else {
            $('.nav-button').addClass('active');
            $(".navi-cont").addClass('active');
            $('.bg-black').css({
                "z-index": "6",
                "display": "block"
            });
            $('.navi-cont > ul > li.drop-icon > ul.drop-product').slideUp(300);
            $('.navi-cont > ul > li.drop-icon').css({
                "background": ""
            });
        }
    });


    $('.bg-black').click(function () {
        if ($('.navi-cont').hasClass('active')) {
            //$('.navi-cont').removeClass('active');
        }
        $(".navi-cont").removeClass('active');
        $('.bg-black').css({
            "z-index": "",
            "display": ""
        });
    });

    $('.bg-black').click(function () {
        $('.navi-cont').removeClass('active');
        $('.nav-button').removeClass('active');
    });
});