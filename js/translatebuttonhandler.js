var tb, tBox = {
    vars: {
        isOpen: false,
        domObj: $("#translation-section-container"),
        translateButton: $("#translate-button"),
        cancelButton: $("#translate-cancel-button")
    },
    init: function () {
        tb = this.vars;
        this.bindUIElements();
    },
    bindUIElements: function () {
        tb.translateButton.on('click', function () {
            if (tb.isOpen) {
                tb.domObj.removeClass("open");
                tb.isOpen = false;
            } else {
                tb.domObj.addClass("open");
                tb.isOpen = true;
            }
        });

        tb.cancelButton.on('click', function () {
            tb.domObj.removeClass("open");
            tb.isOpen = false;
        });

        $(document).keyup(function (e) {
            if (e.keyCode == 27 && tb.isOpen) {
                tb.domObj.removeClass("open");
                tb.isOpen = false;
            }
        });

    }
};

tBox.init();
