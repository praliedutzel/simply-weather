//-------------------------------------------------------------------------------//
//--SIMPLY WEATHER WEB APP FUNCTIONALITY-----------------------------------------//
//-------------------------------------------------------------------------------//

$(document).ready(function() {
    $('.form__input').on('focusout', function() {
        if ( $(this).val() != '' ) {
            $(this).next('.form__label').addClass('is-active');
        } else {
            $(this).next('.form__label').removeClass('is-active');
        }
    });

    $('#submit').on('click', function() {
        var zipCode = $('#zip').val();
        var messageContainer = $('.form__message');

        if ( zipCode.length === 5 && $.isNumeric(zipCode) ) {
            $('#initialView').addClass('fade-out').slideUp();

            $.ajax({
                'url': '../amazonaws.com/dev/simply-weather?zip=' + zipCode,
                beforeSend: function(data) {
                    setTimeout(function() {
                        $('#loadingView').slideDown();
                    }, 500);
                }
            })
            .done(function(data) {
                if ( data.error != null ) {
                    setTimeout(function() {
                        $('#errorView .card__title').text(data.error);
                        $('#loadingView').slideUp();
                        $('#errorView').slideDown();
                    }, 1500);
                } else {
                    $('#currently').text(data.currently);
                    $('#location').text('in ' + data.city + ', ' + data.state);
                    $('#humidity').text(data.humidity);
                    $('#temp').text(data.temperature);
                    $('#wind').text(data.wind);

                    setTimeout(function() {
                        $('#loadingView').slideUp();
                        $('.icon').addClass('fade-out');
                    }, 500);

                    setTimeout(function() {
                        $('.icon').addClass('icon--' + data.icon).removeClass('fade-out');
                        $('#outputView').slideDown();
                    }, 1500);
                }
            })
            .fail(function(req, error) {
                setTimeout(function() {
                    $('#errorView .card__title').text("There was a problem with the submission. Please try again.");
                    $('#loadingView').slideUp();
                    $('#errorView').slideDown();
                }, 1500);
            });
        } else {
            messageContainer.text("Please make sure you've entered a valid zip code and try again.");
        }

        return false;
    });

    $('button.reset').on('click', function() {
        $('#outputView, #errorView').slideUp();
        $('.form__input').val('').next('.form__label').removeClass('is-active');
        $('.form__message').empty();
        $('.icon').addClass('fade-out');

        setTimeout(function() {
            $('.icon').attr('class', 'icon');
            $('#initialView').slideDown();
        }, 500);

        setTimeout(function() {
            $('#initialView').removeClass('fade-out');
        }, 800);

        return false;
    });
});