function load(){
  function responseText () {
   var translated = JSON.parse(this.responseText).responseData.translatedText;
   console.log(translated);
   
    var MessageObject = Parse.Object.extend("Message");
    var messageObject = new MessageObject();
    messageObject.save({sendingNumber: TwilioNumber, BodyNotTranslated: data, BodyTranslated: translated});
   
   sendMessageToServer('+12144035793', translated); // after translation
  }
  var data = document.getElementById("input-section--message-content").value; // this will be the text before translation
  var url = "https://api.mymemory.translated.net/get?q=" + data + "&langpair=es|en";
 
  var oReq = new XMLHttpRequest();
  oReq.addEventListener('load', responseText);
  oReq.open("get", url, true);
  oReq.send();
}

// { Phonenumber : nunmber, origionaltext : data, translatedtext: data}

// {phonenumber: number,
//   conversation:{
//     [message:{
//       sent/received
      
//     }]
    
//   }