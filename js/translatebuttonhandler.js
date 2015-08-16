var data, tb, tBox = {
    vars: {
        isOpen: false,
        domObj: $("#translation-section-container"),
        translateButton: $("#translate-button"),
        checkButton: $("#translate-check-button"),
        sendButton: $("#translate-send-button"),
        cancelButton: $("#translate-cancel-button")
    },
    init: function () {
        tb = this.vars;
        this.bindUIElements();
        tb.butts = this.butts;
    },  
    responseText: function(){
            
            //
    },
    butts: function () {
        data = $('#input-section--message-content').val();
        console.log(data);
        var url = "https://api.mymemory.translated.net/get?q=" + data + "&langpair=en|es";
        console.log(url);
        
        var oReq = new XMLHttpRequest();
        oReq.addEventListener('load', function(){
            console.log(JSON.parse(this.responseText).responseData.translatedText);
            sendMessageToServer('+15126087014', JSON.parse(this.response).responseData.translatedText);
        });
        oReq.open("get", url, true);
        oReq.send();
    },
    bindUIElements: function () {
        tb.translateButton.on('click', function () {
            tb.domObj.addClass("open");
            tb.isOpen = true;
        });

        tb.checkButton.on('click', function () {
            tb.domObj.addClass("open");
            tb.isOpen = true;
        });

        tb.cancelButton.on('click', function () {
            tb.domObj.removeClass("open");
            tb.isOpen = false;
        });

        tb.cancelButton.on('click', function () {
            tb.domObj.removeClass("open");
            tb.isOpen = false;
        });

        tb.sendButton.on('click', function () {
            tb.butts();
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
