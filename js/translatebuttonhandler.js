
console.log('called');
var tb, tBox = {
    vars: {
        isOpen: false,
        domObj: $("#translation-section-container"),
        translateButton: $("#translate-button")
    },
    init: function () {
        tb = this.vars;
        this.bindUIElements();
        console.log('called');
    },
    bindUIElements: function () {
        console.log('called');
        tb.translateButton.on('click', function () {
          console.log('called');
          if (tb.isOpen) {
              tb.domObj.removeClass("open");
              tb.isOpen = false;
          } else {
              tb.domObj.addClass("open");
              tb.isOpen = true;
          }
        });
    }
};

tBox.init();