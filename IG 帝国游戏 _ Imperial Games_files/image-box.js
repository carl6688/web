$(document).ready(function () {
    setTimeout(function () {
        $(".image-box-plus").css("height", $(".image-box:nth-child(2), .image-box-product-section").height());
    }, 1000);

    $(window).resize(function () {
        $(".image-box-plus").css("height", $(".image-box:nth-child(2), .image-box-product-section").height());
    });
});