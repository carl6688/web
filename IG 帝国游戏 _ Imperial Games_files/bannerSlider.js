$(document).ready(function () {
    var count = 1;
    auto();

    function auto() {
        autoslide = setInterval(function () {
            if (count == 4) {
                count = 1;
                bannerContent(count);
                $(".banner-container").css("background-image", "url(bg" + count + ".jpg)");
            } else {
                count++;
                bannerContent(count);
                $(".banner-container").css("background-image", "url(bg" + count + ".jpg)");
            }
        }, 8000);
    }

    $(".banner-arrow-left").click(function () {
        clearInterval(autoslide);
        if (count > 1) {
            count--;
            bannerContent(count);
            $(".banner-container").css("background-image", "url(bg" + count + ".jpg)");
        } else {
            count = 4;
            bannerContent(count);
            $(".banner-container").css("background-image", "url(bg" + count + ".jpg)");
        }
        auto();
    });

    $(".banner-arrow-right").click(function () {
        clearInterval(autoslide);
        if (count < 4) {
            count++;
            bannerContent(count);
            $(".banner-container").css("background-image", "url(bg" + count + ".jpg)");
        } else {
            count = 1;
            bannerContent(count);
            $(".banner-container").css("background-image", "url(bg" + count + ".jpg)");
        }
        auto();
    });
});

function bannerContent(count) {
    $(".banner-element > .banner-content").hide();
    $(".banner-container").removeClass("banner-zoom");

    $(".banner-slide-" + count).fadeIn();
    $(".banner-container").addClass("banner-zoom");
}