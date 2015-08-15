function load(){
  function responseText () {
    // console.log(this.responseText);
   console.log(JSON.parse(this.responseText).responseData.translatedText);
   sendMessageToServer('+12144035793', JSON.parse(this.response).responseData.translatedText);
  }
  var data = document.getElementById("input-section--message-content").value;
  var url = "https://api.mymemory.translated.net/get?q=" + data + "&langpair=es|en";

  var oReq = new XMLHttpRequest();
  oReq.addEventListener('load', responseText);
  oReq.open("get", url, true);
  oReq.send();
}