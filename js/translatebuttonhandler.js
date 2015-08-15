console.log("life is okay...");
var data;
function loadXMLDoc()
{
  var xmlhttp;
  if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp=new XMLHttpRequest();
    }
  else
    {// code for IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  xmlhttp.onreadystatechange=function()
    {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
      {
      //  document.getElementById("myDiv").innerHTML=xmlhttp;
        data = document.getElementById("input-section--message-content").value;
        $("#translation-section--message-content").html(JSON.parse(xmlhttp.response).responseData.translatedText);
      }
  }
var url = "http://api.mymemory.translated.net/get?q=" + data + "&langpair=en|es";
  xmlhttp.open("GET",url,true);
  xmlhttp.send();

}

function tAndSButtonPressed(){
  loadXMLDoc();
}
