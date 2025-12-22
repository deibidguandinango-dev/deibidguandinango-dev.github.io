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

        // Abrir modal con código QR para video sorpresa
        function openQRModal(videoUrl, title) {
            var $modal = $("#christmas-modal");
            var qrSrc = 'https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=' + encodeURIComponent(videoUrl) + '&chld=L|1';
            var body = '<div style="text-align:center;"><img src="'+qrSrc+'" alt="QR code" style="max-width:260px;width:100%;height:auto;border-radius:8px;"/></div>';
            body += '<p style="text-align:center;margin-top:10px;"><a class="btn btn--primary" href="'+videoUrl+'" target="_blank" rel="noopener">Abrir video</a></p>';
            $modal.find('.christmas-modal__title').text(title || 'Video sorpresa');
            $modal.find('.christmas-modal__body').html(body);
            $modal.attr('aria-hidden', 'false').addClass('is-open');
        }

        $(document).on('click', '.js-open-qr', function(e){
            e.preventDefault();
            var video = $(this).attr('data-video');
            if (video) openQRModal(video, 'Video sorpresa');
        });

        $(document).on('click', '#christmas-modal [data-close]', function(e) {
            e.preventDefault();
            closeChristmasModal();
        });

        $(document).on('keyup', function(e) {
            if (e.key === 'Escape') closeChristmasModal();
        });

        // Mostrar modal automáticamente en la mitad de la pantalla (solo 1 vez por sesión)
        try {
            var shouldShow = !sessionStorage.getItem('christmas_shown');
            if (shouldShow) {
                setTimeout(function() {
                    var welcomeMsg = '¡Bienvenido! Felices fiestas y gracias por visitar.';
                    openChristmasModal(welcomeMsg);
                    sessionStorage.setItem('christmas_shown', '1');
                }, 700);
            }
        } catch (e) {
            // sessionStorage puede fallar en modos privados; en ese caso, mostrar igualmente
            setTimeout(function() { openChristmasModal('¡Bienvenido! Felices fiestas.'); }, 700);
        }
        
    });

}(jQuery));
