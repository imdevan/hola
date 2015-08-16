// VIEW MESSAGE TRANSLATION
// ==============================================================================

setInterval(function() {
    
    $(".message--translate-button").on('click', function () {
        console.log('click');
        $(this).parent().parent().toggleClass("view-translation");
    });
    }, 100);
    
