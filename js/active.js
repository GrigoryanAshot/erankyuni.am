(function ($) {
    'use strict';

    var $window = $(window);

    // :: Preloader Active Code
    $window.on('load', function () {
        $('#preloader').fadeOut('slow', function () {
            $(this).remove();
        });
    });

    // :: Search Form Active - Removed (replaced with social media icons)

    // :: More Filter Active Code
    $("#moreFilter").on('click', function () {
        $(".search-form-second-steps").slideToggle('1000');
    });

    // :: Nav Active Code
    if ($.fn.classyNav) {
        $('#southNav').classyNav({
            theme: 'dark'
        });
    }

    // :: Current Page Active Link
    setTimeout(function() {
        var currentPage = window.location.pathname.split('/').pop() || 'index.html';
        if (currentPage === '') {
            currentPage = 'index.html';
        }
        $('#southNav .classynav ul li a').each(function() {
            var linkHref = $(this).attr('href');
            if (linkHref === currentPage || (currentPage === 'index.html' && (linkHref === 'index.html' || linkHref === './' || linkHref === '/'))) {
                $(this).addClass('active');
                $(this).parent('li').addClass('active');
            }
        });
    }, 100);

    // :: Sticky Active Code
    if ($.fn.sticky) {
        $("#stickyHeader").sticky({
            topSpacing: 0
        });
    }

    // :: Tooltip Active Code
    if ($.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip()
    }

    // :: Nice Select Active Code
    if ($.fn.niceSelect) {
        // Apply Nice Select to all selects except multi-select
        $('select:not(.multi-select)').niceSelect();
        
        // Custom multi-select with checkmarks
        $('.multi-select').each(function() {
            var $select = $(this);
            var selectedValues = [];
            
            // Initialize Nice Select
            $select.niceSelect();
            var $niceSelect = $select.next('.nice-select');
            var selectId = $select.attr('id');
            
            // Store selected values on the select element
            $select.data('selectedValues', selectedValues);
            
            // Add checkbox to options after Nice Select initializes
            setTimeout(function() {
                $niceSelect.find('.option').each(function() {
                    var $option = $(this);
                    if (!$option.find('.checkbox').length) {
                        $option.prepend('<span class="checkbox"><span class="checkmark">✓</span></span>');
                    }
                });
                
                // Unbind default Nice Select click handler for this dropdown's options
                $niceSelect.find('.option').off('click.nice_select');
            }, 100);
        });
        
        // Handle multi-select option clicks (use a different namespace to avoid conflicts)
        $(document).on('click', '.multi-select + .nice-select .option', function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            var $option = $(this);
            var $niceSelect = $option.closest('.nice-select');
            var $select = $niceSelect.prev('select.multi-select');
            var value = $option.data('value');
            var selectedValues = $select.data('selectedValues') || [];
            var $checkbox = $option.find('.checkbox');
            
            if (!value || value === '') {
                // "All" option - clear all selections
                selectedValues = [];
                $niceSelect.find('.option').removeClass('selected');
                $niceSelect.find('.checkbox').removeClass('checked');
                $niceSelect.find('.current').text($select.find('option[value=""]').text());
            } else {
                // Toggle selection
                var index = selectedValues.indexOf(value);
                if (index > -1) {
                    // Deselect
                    selectedValues.splice(index, 1);
                    $option.removeClass('selected');
                    $checkbox.removeClass('checked');
                } else {
                    // Select
                    selectedValues.push(value);
                    $option.addClass('selected');
                    $checkbox.addClass('checked');
                }
                
                // Update display text
                if (selectedValues.length === 0) {
                    $niceSelect.find('.current').text($select.find('option[value=""]').text());
                } else if (selectedValues.length === 1) {
                    $niceSelect.find('.current').text(selectedValues[0]);
                } else {
                    $niceSelect.find('.current').text(selectedValues.length + ' ընտրված');
                }
            }
            
            // Store selected values
            $select.data('selectedValues', selectedValues);
            
            // Keep dropdown open
            $niceSelect.addClass('open');
            return false;
        });
    }

    // :: Owl Carousel Active Code
    if ($.fn.owlCarousel) {

        var welcomeSlide = $('.hero-slides');

        welcomeSlide.owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: true,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1000
        });

        welcomeSlide.on('translate.owl.carousel', function () {
            var slideLayer = $("[data-animation]");
            slideLayer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).removeClass('animated ' + anim_name).css('opacity', '0');
            });
        });

        welcomeSlide.on('translated.owl.carousel', function () {
            var slideLayer = welcomeSlide.find('.owl-item.active').find("[data-animation]");
            slideLayer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).addClass('animated ' + anim_name).css('opacity', '1');
            });
        });

        $("[data-delay]").each(function () {
            var anim_del = $(this).data('delay');
            $(this).css('animation-delay', anim_del);
        });

        $("[data-duration]").each(function () {
            var anim_dur = $(this).data('duration');
            $(this).css('animation-duration', anim_dur);
        });

        $('.testimonials-slides').owlCarousel({
            items: 3,
            margin: 50,
            loop: true,
            center: true,
            nav: true,
            navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1000,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 3
                }
            }
        });

        $('.featured-properties-slides, .single-listings-sliders').owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1000,
            nav: true,
            navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>']
        });
    }

    // :: CounterUp Active Code
    if ($.fn.counterUp) {
        $('.counter').counterUp({
            delay: 10,
            time: 2000
        });
    }

    // :: ScrollUp Active Code
    if ($.fn.scrollUp) {
        $.scrollUp({
            scrollSpeed: 1000,
            easingType: 'easeInOutQuart',
            scrollText: '<i class="fa fa-angle-up" aria-hidden="true"></i>'
        });
    }

    // :: PreventDefault a Click
    $("a[href='#']").on('click', function ($) {
        $.preventDefault();
    });

    // :: wow Active Code
    if ($window.width() > 767) {
        new WOW().init();
    }

    // :: Slider Range
    $('.slider-range-price').each(function () {
        var min = jQuery(this).data('min');
        var max = jQuery(this).data('max');
        var unit = jQuery(this).data('unit');
        var value_min = jQuery(this).data('value-min');
        var value_max = jQuery(this).data('value-max');
        var t = $(this);
        $(this).slider({
            range: true,
            min: min,
            max: max,
            values: [value_min, value_max],
            slide: function (event, ui) {
                var result = ui.values[0] + unit + ' - ' + ui.values[1] + unit;
                t.closest('.slider-range').find('.range').html(result);
            }
        });
    })

})(jQuery);