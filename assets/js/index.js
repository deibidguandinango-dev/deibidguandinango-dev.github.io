/**
 * Main JS file for Casper behaviours
 */

/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function(){

        $(".post-content").fitVids();
        
        // Calculates Reading Time
        $('.post-content').readingTime({
            readingTimeTarget: '.post-reading-time',
            wordCountTarget: '.post-word-count',
        });
        
        // Creates Captions from Alt tags
        $(".post-content img").each(function() {
            // Let's put a caption if there is one
            if($(this).attr("alt") && !$(this).hasClass("emoji"))
              $(this).wrap('<figure class="image"></figure>')
              .after('<figcaption>'+$(this).attr("alt")+'</figcaption>');
        });

        // Modal navideño en español
        function openChristmasModal(message) {
            var $modal = $("#christmas-modal");
            $modal.find('.christmas-modal__body').text(message);
            $modal.attr('aria-hidden', 'false').addClass('is-open');
        }

        function closeChristmasModal() {
            var $modal = $("#christmas-modal");
            $modal.attr('aria-hidden', 'true').removeClass('is-open');
        }

        $(document).on('click', '.js-open-modal', function(e) {
            e.preventDefault();
            var msg = $(this).attr('data-message') || '¡Felices fiestas!';
            openChristmasModal(msg);
        });

        $(document).on('click', '#christmas-modal [data-close]', function(e) {
            e.preventDefault();
            closeChristmasModal();
        });

        $(document).on('keyup', function(e) {
            if (e.key === 'Escape') closeChristmasModal();
        });
        
    });

}(jQuery));
