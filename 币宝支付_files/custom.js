(function () {

    "use strict";
    var Core = {
        initialized: false,
        initialize: function () {
            if (this.initialized)
                return;
            this.initialized = true;
            if (!this.isMobileBrowser()) {
                $("#pcbody").addClass("pcBody");
                $("#allPccontent").removeClass("isnone");

            } else {
                var oMeta = document.createElement('meta');
                oMeta.name = 'viewport';
                oMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
                document.getElementsByTagName('head')[0].appendChild(oMeta);
                var head = document.getElementsByTagName('HEAD').item(0);
                var style = document.createElement('link');
                style.href = 'css/aui.css';
                style.rel = 'stylesheet';
                style.type = 'text/css';
                head.appendChild(style);
                $("body").css("margin-left", "0px")
                $("#allMobilecontent").removeClass("isnone");
                var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                if (scrollTop > 69) {
                    $("#menu").css("top", (scrollTop + 60) + 'px')
                    $("#menu").hide();
                    $(".aui-bar-nav").css({
                        "top": (scrollTop) + 'px',
                        "background": "#000"
                    });
                }
            }
            this.build();

        },
        isMobileBrowser: function () {
            var browser = {
                versions: function () {
                    var u = navigator.userAgent, app = navigator.appVersion;
                    return {
                        trident: u.indexOf('Trident') > -1, //IE内核
                        presto: u.indexOf('Presto') > -1, //opera内核
                        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                        mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                        iPad: u.indexOf('iPad') > -1, //是否iPad
                        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                    };
                }()
            }
            if (browser.versions.ios == true || browser.versions.android == true) {
                return true;
            } else {
                return false
            }
            //console.log(" 是否为移动终端: " + browser.versions.mobile);
            //console.log(" ios终端: " + browser.versions.ios);
            //console.log(" android终端: " + browser.versions.android);
            //console.log(" 是否为iPhone: " + browser.versions.iPhone);
            //console.log(" 是否iPad: " + browser.versions.iPad);
            //console.log(navigator.userAgent);
        },
        build: function () {
            // Dropdown menu
            this.cotentslide();
            // Owl carousel init
            this.initOwlCarousel();
            // Stick slider init
            this.initStickSlider();
            // Fixed header 
            this.fixedHeader();
            // Progress bar animation
            this.progressBarAnimation();
            // Wow init
            this.wowInit();
            // Loader
            this.loaderInit();
            // Start video
            this.startVideo();
            // Toggle search
            this.toggleSearch();
            // Top slider init
            this.initSliderPro();
            // Init fancybox
            this.initFancyBox();
            // Init fancybox video
            this.initFancyBoxVideo();
            this.textillate();
            this.enabled();

        },
        enabled: function () {
            $(window).scroll(function () {
                var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                if (scrollTop == 0) {
                    $("#menu").css("top", (scrollTop + 60) + 'px')
                    $("#menu").hide();
                    $(".aui-bar-nav").css({
                        "top": (scrollTop) + 'px',
                        "background": "none",
                    });
                } else {
                    $("#menu").css("top", (scrollTop + 60) + 'px')
                    $("#menu").hide();
                    $(".aui-bar-nav").css({
                        "top": (scrollTop) + 'px',
                        "background": "#000"
                    });
                }

                return false;
            })
            $("#fenlieImg").click(function () {
                $("#menu").slideToggle(500);
            })
            $("#menu1").click(function () {
                $(".aui-bar-nav").css({
                    "top": ($("#Mobile1").offset().top) + 'px',
                    "background": "#000"
                });
                $("#menu").css("top", ($("#Mobile1").offset().top + 60) + 'px')
                $("#menu").hide();
                $("html, body").animate({
                    scrollTop: $("#Mobile1").offset().top
                }, {duration: 500, easing: "swing"});
                return false;
            });

            $("#menu2").click(function () {
                $(".aui-bar-nav").css({
                    "top": ($("#Mobile2").offset().top) + 'px',
                    "background": "#000"
                });
                $("#menu").css("top", ($("#Mobile2").offset().top + 60) + 'px')
                $("#menu").hide();
                $("html, body").animate({
                    scrollTop: $("#Mobile2").offset().top
                }, {duration: 500, easing: "swing"});
                return false;
            });

            $("#menu3").click(function () {
                $(".aui-bar-nav").css({
                    "top": ($("#Mobile3").offset().top) + 'px',
                    "background": "#000"
                });
                $("#menu").css("top", ($("#Mobile3").offset().top + 60) + 'px')
                $("#menu").hide();
                $("html, body").animate({
                    scrollTop: $("#Mobile3").offset().top
                }, {duration: 500, easing: "swing"});
                return false;
            });

            $("#menu4").click(function () {
                $(".aui-bar-nav").css({
                    "top": ($("#Mobile4").offset().top) + 'px',
                    "background": "#000"
                });
                $("#menu").css("top", ($("#Mobile4").offset().top + 60) + 'px')
                $("#menu").hide();
                $("html, body").animate({
                    scrollTop: $("#Mobile4").offset().top
                }, {duration: 500, easing: "swing"});
                return false;
            });

            $("#menu5").click(function () {
                $(".aui-bar-nav").css({
                    "top": ($("#Mobile5").offset().top) + 'px',
                    "background": "#000"
                });
                $("#menu").css("top", ($("#Mobile5").offset().top + 60) + 'px')
                $("#menu").hide();
                $("html, body").animate({
                    scrollTop: $("#Mobile5").offset().top
                }, {duration: 500, easing: "swing"});
                return false;
            });


            $("#div0Link").click(function () {
                $("html, body").animate({
                    scrollTop: 0
                }, {duration: 500, easing: "swing"});
                return false;
            });
            $("#div1Link").click(function () {
                $("html, body").animate({
                    scrollTop: $("#section1").offset().top
                }, {duration: 500, easing: "swing"});
                return false;
            });
            $("#div2Link").click(function () {
                $("html, body").animate({
                    scrollTop: $("#section2").offset().top
                }, {duration: 500, easing: "swing"});
                return false;
            });
            $("#div3Link").click(function () {
                $("html, body").animate({
                    scrollTop: $("#section3").offset().top
                }, {duration: 500, easing: "swing"});
                return false;
            });
            $("#div4Link").click(function () {
                $("html, body").animate({
                    scrollTop: $("#section4").offset().top
                }, {duration: 500, easing: "swing"});
                return false;
            });
        },
        textillate: function () {
            $('.nav_infor p')
                .fitText(0.5, {maxFontSize: 30})
                .textillate({initialDelay: 1000, in: {delay: 3, shuffle: true}});
        },
        initFancyBox: function () {
            //$('.fancybox').fancybox();
        },
        initFancyBoxVideo: function () {
            $(".fancybox-video").click(function () {
                $.fancybox({
                    'padding': 0,
                    'autoScale': false,
                    'transitionIn': 'none',
                    'transitionOut': 'none',
                    'title': this.title,
                    'width': 680,
                    'height': 495,
                    'href': this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
                    'type': 'swf',
                    'swf': {
                        'wmode': 'transparent',
                        'allowfullscreen': 'true'
                    }
                });

                return false;
            });
        },
        cotentslide: function (options) {

            var scrollPane = $(".scroll-pane"),
                scrollContent = $(".scroll-content");
            //build slider
            var scrollbar = $(".scroll-bar").slider({
                slide: function (event, ui) {
                    if (scrollContent.width() > scrollPane.width()) {
                        scrollContent.css("margin-left", Math.round(
                            ui.value / 100 * (scrollPane.width() - scrollContent.width())
                        ) + "px");
                    } else {
                        scrollContent.css("margin-left", 0);
                    }
                }
            });
            //append icon to handle
            var handleHelper = scrollbar.find(".ui-slider-handle")
                .mousedown(function () {
                    scrollbar.width(handleHelper.width());
                })
                .mouseup(function () {
                    scrollbar.width("100%");
                })
                .append("<span class='ui-icon ui-icon-grip-dotted-vertical'></span>")
                .wrap("<div class='ui-handle-helper-parent'></div>").parent();
            //change overflow to hidden now that slider handles the scrolling
            scrollPane.css("overflow", "hidden");

            //size scrollbar and handle proportionally to scroll distance
            function sizeScrollbar() {
                var remainder = scrollContent.width() - scrollPane.width();
                var proportion = remainder / scrollContent.width();
                var handleSize = scrollPane.width() - (proportion * scrollPane.width());
                scrollbar.find(".ui-slider-handle").css({
                    width: handleSize,
                    "margin-left": -handleSize / 2
                });
                handleHelper.width("").width(scrollbar.width() - handleSize);
            }

            //change handle position on window resize
            $(window).resize(function () {
                sizeScrollbar();
            });
            //init scrollbar size
            setTimeout(sizeScrollbar, 10); //safari wants a timeout

        },
        initStickSlider: function (options) {
            $(".enable-stick-slider").each(function (i) {
                var $stick = $(this);
                $stick.slick({
                    responsive: [
                        {
                            breakpoint: 500,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
            });

        },
        initOwlCarousel: function (options) {

            $(".enable-owl-carousel").each(function (i) {
                var $owl = $(this);
                var navigationData = $owl.data('navigation');
                var paginationData = $owl.data('pagination');
                var singleItemData = $owl.data('single-item');
                var autoPlayData = $owl.data('auto-play');
                var transitionStyleData = $owl.data('transition-style');
                var mainSliderData = $owl.data('main-text-animation');
                var afterInitDelay = $owl.data('after-init-delay');
                var stopOnHoverData = $owl.data('stop-on-hover');
                var min600 = $owl.data('min600');
                var min800 = $owl.data('min800');
                var min1200 = $owl.data('min1200');
                $owl.owlCarousel({
                    navigation: navigationData,
                    pagination: paginationData,
                    singleItem: singleItemData,
                    autoPlay: autoPlayData,
                    transitionStyle: transitionStyleData,
                    stopOnHover: stopOnHoverData,
                    navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                    itemsCustom: [
                        [0, 1],
                        [600, min600],
                        [800, min800],
                        [1200, min1200]
                    ],
                    afterInit: function (elem) {
                        if (mainSliderData) {
                            setTimeout(function () {
                                $('.main-slider_zoomIn').css('visibility', 'visible').removeClass('zoomIn').addClass('zoomIn');
                                $('.main-slider_fadeInLeft').css('visibility', 'visible').removeClass('fadeInLeft').addClass('fadeInLeft');
                                $('.main-slider_fadeInLeftBig').css('visibility', 'visible').removeClass('fadeInLeftBig').addClass('fadeInLeftBig');
                                $('.main-slider_fadeInRightBig').css('visibility', 'visible').removeClass('fadeInRightBig').addClass('fadeInRightBig');
                            }, afterInitDelay);
                        }
                    },
                    beforeMove: function (elem) {
                        if (mainSliderData) {
                            $('.main-slider_zoomIn').css('visibility', 'hidden').removeClass('zoomIn');
                            $('.main-slider_slideInUp').css('visibility', 'hidden').removeClass('slideInUp');
                            $('.main-slider_fadeInLeft').css('visibility', 'hidden').removeClass('fadeInLeft');
                            $('.main-slider_fadeInRight').css('visibility', 'hidden').removeClass('fadeInRight');
                            $('.main-slider_fadeInLeftBig').css('visibility', 'hidden').removeClass('fadeInLeftBig');
                            $('.main-slider_fadeInRightBig').css('visibility', 'hidden').removeClass('fadeInRightBig');
                        }
                    },
                    afterMove: sliderContentAnimate,
                    afterUpdate: sliderContentAnimate,
                });
            });

            function sliderContentAnimate(elem) {
                var $elem = elem;
                var afterMoveDelay = $elem.data('after-move-delay');
                var mainSliderData = $elem.data('main-text-animation');
                if (mainSliderData) {
                    setTimeout(function () {
                        $('.main-slider_zoomIn').css('visibility', 'visible').addClass('zoomIn');
                        $('.main-slider_slideInUp').css('visibility', 'visible').addClass('slideInUp');
                        $('.main-slider_fadeInLeft').css('visibility', 'visible').addClass('fadeInLeft');
                        $('.main-slider_fadeInRight').css('visibility', 'visible').addClass('fadeInRight');
                        $('.main-slider_fadeInLeftBig').css('visibility', 'visible').addClass('fadeInLeftBig');
                        $('.main-slider_fadeInRightBig').css('visibility', 'visible').addClass('fadeInRightBig');
                    }, afterMoveDelay);
                }
            }
        },
        fixedHeader: function (options) {
            if ($(window).width() > 767) {
                // Fixed Header
                var topOffset = $(window).scrollTop();
                if (topOffset > 0) {
                    $('body').addClass('fixed-header');
                }
                $(window).on('scroll', function () {
                    var fromTop = $(this).scrollTop();
                    if (fromTop > 0) {
                        $('body').addClass('fixed-header');
                    } else {
                        $('body').removeClass('fixed-header');
                    }

                });
            }
        },
        progressBarAnimation: function (options) {
            $('.skills').waypoint(function () {
                $('.skills-animated').each(function () {
                    var persent = $(this).attr('data-percent');
                    $(this).find('.progress').animate({
                        width: persent + '%'
                    }, 300);
                });
            }, {
                offset: '100%',
                triggerOnce: true
            });
        },
        wowInit: function () {
            var scrollingAnimations = $('body').data("scrolling-animations");
            if (scrollingAnimations) {
                new WOW().init();
            }
        },
        loaderInit: function () {
            $(window).on('load', function () {
                var $preloader = $('.page-preloader'),
                    $spinner = $preloader.find('.spinner');
                $spinner.fadeOut();
                $preloader.delay(350).fadeOut(800);
            });
        },
        startVideo: function () {
            if (!Modernizr.touch) {
                //$(".video-play").mb_YTPlayer();
            }
        },
        toggleSearch: function () {
            $(document).on('click', "#search-open, #search-close", function () {
                $('.header').toggleClass('search-open');
            });
        },
        initSliderPro: function () {
            if ($('#topSlider').length > 0) {

                $('#topSlider').sliderPro({
                    width: 1600,
                    height: 800,
                    fade: true,
                    arrows: true,
                    buttons: false,
                    waitForLayers: true,
                    thumbnailPointer: false,
                    touchSwipe: false,
                    autoplay: true,
                    autoScaleLayers: false,
                    captionFadeDuration: 100

                });

            }
        }
    };
    Core.initialize();
})();