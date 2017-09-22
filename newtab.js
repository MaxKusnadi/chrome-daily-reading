$(document).ready(function(){
  let URL = "https://imgratefultoday.com:3010/";
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let params = "month=" + month + "&day=" + day + "&year=" + year;
  let http = new XMLHttpRequest();
  let title = $('#daily-reading-title');
  let content = $('#daily-reading-content');
  title.hide();
  content.hide();
  http.open("GET", URL +"?"+params, true);
  http.onreadystatechange = function(){
    if(http.readyState == 4 && http.status == 200) {
      let json = JSON.parse(http.responseText);
      title.text(json['title']);
      content.text(json['result']);
      title.fadeIn('slow');
      content.fadeIn('slow');
    }
  };
  http.send(null);

});

