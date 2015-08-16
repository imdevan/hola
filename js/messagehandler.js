// VIEW MESSAGE TRANSLATION
// ==============================================================================
$(document).ready(function () {
    console.log('click');
    $(".message--translate-button").on('click', function () {
        console.log('click');
        $(this).parent().parent().toggleClass("view-translation");
    });

});
