(function($) {
    "use strict"; 

    /* Navbar Scripts */
    // Collapse the navbar on scroll
    $(window).on('scroll load', function() {
        if ($(".navbar").offset().top > 60) {
            $(".fixed-top").addClass("top-nav-collapse");
        } else {
            $(".fixed-top").removeClass("top-nav-collapse");
        }
    });
    
    // Page scrolling feature
    $(function() {
        $(document).on('click', 'a.page-scroll', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 600, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    // Offcanvas script from Bootstrap
    $('[data-toggle="offcanvas"], .navbar-nav li a:not(.dropdown-toggle)').on('click', function () {
        $('.offcanvas-collapse').toggleClass('open');
    });

    // Hover in desktop mode
    function toggleDropdown (e) {
        const _d = $(e.target).closest('.dropdown'),
            _m = $('.dropdown-menu', _d);
        setTimeout(function(){
            const shouldOpen = e.type !== 'click' && _d.is(':hover');
            _m.toggleClass('show', shouldOpen);
            _d.toggleClass('show', shouldOpen);
            $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
        }, e.type === 'mouseleave' ? 300 : 0);
    }
    $('body')
    .on('mouseenter mouseleave','.dropdown',toggleDropdown)
    .on('click', '.dropdown-menu a', toggleDropdown);

    /* Move Form Fields Label When User Types */
    // For input and textarea fields
    $("input, textarea").keyup(function(){
        if ($(this).val() != '') {
            $(this).addClass('notEmpty');
        } else {
            $(this).removeClass('notEmpty');
        }
    });

    /* Back To Top Button */
    // Create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });

    /* Removes Long Focus On Buttons */
    $(".button, a, button").mouseup(function() {
        $(this).blur();
    });

    /* Adjust iframe and div heights */
    function adjustElementHeight(selector) {
        var elements = document.querySelectorAll(selector);
        
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var iframe = element.querySelector('object');
            if (iframe) {
                var src = iframe.getAttribute('data-src');
                var message = {
                    messageType: 'requestHeight'
                };
                iframe.contentWindow.postMessage(message, src);
            }
        }
    }

    window.addEventListener('message', function(event) {
        if (event.origin === 'https://public.tableau.com') {
            var message = event.data;
            if (message.messageType === 'heightResponse') {
                var iframe = document.querySelector('object[data-src="' + event.source.location.href + '"]');
                if (iframe) {
                    iframe.style.height = message.height + 'px';
                }
            }
        }
    });

    window.onload = function() {
        adjustElementHeight('.tableauPlaceholder');
    };

    /* Back button functionality */
    $('a.back-to-top').on('click', function(event) {
        event.preventDefault();
        history.back();
    });

    /* Change text on scroll */
    var dynamicText = document.getElementById('dynamic-text');
    window.addEventListener('scroll', function() {
        if (window.scrollY > (window.innerHeight / 2)) {
            dynamicText.innerHTML = document.title;
        } else {
            dynamicText.innerHTML = '';
        }
    });

})(jQuery);
