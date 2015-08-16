function load() {
    function responseText() {
        var translated = JSON.parse(this.responseText).responseData.translatedText;
        console.log(translated);

        var MessageObject = Parse.Object.extend("Message");
        var messageObject = new MessageObject();
        messageObject.save({
            sendingNumber: TwilioNumber,
            BodyNotTranslated: data,
            BodyTranslated: translated
        });

        sendMessageToServer('+12144035793', translated); // after translation
    }
    var data = document.getElementById("input-section--message-content").value; // this will be the text before translation
    var url = "https://api.mymemory.translated.net/get?q=" + data +
        "&langpair=es|en";

    var oReq = new XMLHttpRequest();
    oReq.addEventListener('load', responseText);
    oReq.open("get", url, true);
    oReq.send();
}


// TRANSLATION
// ==============================================================================
var otherdata = '';
var data, tb, tBox = {
    vars: {
        isOpen: false,
        domObj: $("#translation-section-container"),
        translateButton: $("#translate-button"),
        checkButton: $("#translate-check-button"),
        sendButton: $("#translate-send-button"),
        cancelButton: $("#translate-cancel-button"),
        littlesendButton: $("#translate-translated-send-button")
    },
    init: function () {
        tb = this.vars;
        this.bindUIElements();
        tb.sendMessage = this.sendMessage;
    },
    sendMessage: function () {
        data = $('#input-section--message-content').val();
        console.log(data);
        console.log(selectLang);
        var url = "https://api.mymemory.translated.net/get?q=" + data + "&langpair=" + selectLang + "|en";
        console.log(url);
        console.log("I like this spot");
        var oReq = new XMLHttpRequest();
        oReq.addEventListener('load', function () {
            console.log(JSON.parse(this.responseText).responseData.translatedText);
            sendMessageToServer(OtherNumber, JSON.parse(this.response).responseData.translatedText);

            
            var elem = '<div class="message--container-RIGHT"> \
							<p class="message--text"> \
								' + data +' \
							</p> \
							<span class="message--translate-button"> \
								? \
							</span> \
						</div>';
						
    		  $('#message-conversation').append(elem);
    		  $("html, body").animate({ scrollTop: $(document).height() }, 1000);
    		  
    		  var MessageObject = Parse.Object.extend("Message");
    		  var messageObject = new MessageObject();
    		  messageObject.save({sendingNumber: TwilioNumber, LanguageOne: JSON.parse(this.response).responseData.translatedText, LanguageTwo: data});

        });
        oReq.open("get", url, true);
        oReq.send();
        
        $('#input-section--message-content').val('');
    },
    bindUIElements: function () {
        tb.translateButton.on('click', function () {
            tb.domObj.addClass("open");
            tb.isOpen = true;
            
            data = $('#input-section--message-content').val();
            
            var url = "https://api.mymemory.translated.net/get?q=" + data + "&langpair=en|"+selectLang;
            console.log(url);
            
            var oReq = new XMLHttpRequest();
            oReq.addEventListener('load', function(){
                console.log(JSON.parse(this.responseText).responseData.translatedText);
        		
                $('#translation-section--message-content').html(JSON.parse(this.responseText).responseData.translatedText);
                
                otherdata = JSON.parse(this.responseText).responseData.translatedText;
            });
            oReq.open("get", url, true);
            oReq.send();
        });

        tb.checkButton.on('click', function () {
            tb.domObj.addClass("open");
            tb.isOpen = true;
            
            data = $('#input-section--message-content').val();
            
            var url = "https://api.mymemory.translated.net/get?q=" + data + "&langpair="+selectLang+"|en";
            console.log(url);
            
            var oReq = new XMLHttpRequest();
            oReq.addEventListener('load', function(){
                console.log(JSON.parse(this.responseText).responseData.translatedText);
        		
                $('#translation-section--message-content').html(JSON.parse(this.responseText).responseData.translatedText);
                
                otherdata = data;
                data = JSON.parse(this.responseText).responseData.translatedText;
            });
            oReq.open("get", url, true);
            oReq.send();
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
            tb.sendMessage();
        });
        
        tb.littlesendButton.on('click', function () {
            var MessageObject = Parse.Object.extend("Message");
    		var messageObject = new MessageObject();
    		messageObject.save({sendingNumber: TwilioNumber, LanguageOne: data, LanguageTwo: otherdata});
            
            sendMessageToServer(OtherNumber, data);
            
            var elem = '<div class="message--container-RIGHT"> \
							<p class="message--text"> \
								' + otherdata +' \
							</p> \
							<span class="message--translate-button"> \
								? \
							</span> \
						</div>'
    		
    		  $('#message-conversation').append(elem);
    		  $("html, body").animate({ scrollTop: $(document).height() }, 1000);
            
            tb.domObj.removeClass("open");
            tb.isOpen = false;
            
            $('#input-section--message-content').val('');
        });

        $(document).keyup(function (e) {
            if (e.keyCode == 27 && tb.isOpen) {
                tb.domObj.removeClass("open");
                tb.isOpen = false;
            }
            if (e.keyCode == 13 && ($('#input-section--message-content').val != '') && !tb.isOpen) {
                tb.sendMessage();
                tb.domObj.removeClass("open");
                tb.isOpen = false;
            }
            else if (e.keyCode == 13 && ($('#input-section--message-content').val != '') && tb.isOpen) {
                var MessageObject = Parse.Object.extend("Message");
        		var messageObject = new MessageObject();
        		messageObject.save({sendingNumber: TwilioNumber, LanguageOne: data, LanguageTwo: otherdata});
                
                sendMessageToServer(OtherNumber, data);
                
                var elem = '<div class="message--container-RIGHT"> \
    							<p class="message--text"> \
    								' + otherdata +' \
    							</p> \
    							<span class="message--translate-button"> \
    								? \
    							</span> \
    						</div>'
        		
        		  $('#message-conversation').append(elem);
                
                tb.domObj.removeClass("open");
                tb.isOpen = false;
                
                $('#input-section--message-content').val('');
            }
        });

    }
};

tBox.init();

// MENU
// ==============================================================================

var menu, menuApp = {
    vars: {
        menuButton: $("#translate-change-lang-button"),
        menu: $("#language-menu"),
        mainWrapper: $("#main-wrapper"),
        menuList: $(".language-menu--list-item")
    },
    init: function () {
        menu = this.vars;
        this.bindUIElements();
    },
    bindUIElements: function () {
        menu.menuButton.click(function () {
            menu.mainWrapper.addClass("menu-open ");
            menu.menu.addClass("menu-open ");
        });
        menu.menuList.click(function(){
            selectLang = $(this).attr("id");
            menu.mainWrapper.removeClass("menu-open ");
            menu.menu.removeClass("menu-open ");
        });
    }
}
menuApp.init();

