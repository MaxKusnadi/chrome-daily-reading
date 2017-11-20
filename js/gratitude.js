/**
 * Created by max on 18/4/17.
 */
$(document).ready(function(){
  $("#title, #verse, #gratitude, #log, #link").hide().each(function(i){
    $(this).delay(i*500).fadeIn('slow');
  });
});

function get_gratitudes() {
  let URL = "https://imgratefultoday.com:8888/api/gratitude";
  let http = new XMLHttpRequest();
  http.open("GET", URL, true);
  http.onreadystatechange = function(){
    if(http.readyState === 4 && http.status === 200) {
      let json = JSON.parse(http.responseText);
      for(let i=0; i < 2; i++){
        let msg = json[i];
        let item = document.createElement('div');
        item.className = "message";
        let content = document.createElement('p');
        content.className = "content";
        let date = document.createElement('p');
        date.className = "date";
        let message = msg.message;
        let content_text = document.createTextNode('"' + message + '"');
        content.appendChild(content_text);
        content.innerHTML = convert(content.innerHTML);
        let date_text = document.createTextNode(msg.datetime);
        date.appendChild(date_text);
        item.appendChild(content);
        item.appendChild(date);
        $(item).appendTo('#log');
      }
    }
  };
  http.send(null);
}

$(document).ready(function() {

  get_gratitudes();

  let namespace = '/gratitude';
  let socket = io.connect("https://imgratefultoday.com:8888" + namespace);

  socket.on('connect', function() {
    socket.emit('my_event', {data: true});
  });

  socket.on('my_response', function(msg) {
    let item = document.createElement('div');
    item.className = "message";
    let content = document.createElement('p');
    content.className = "content";
    let date = document.createElement('p');
    date.className = "date";
    let message = msg.message;
    let content_text = document.createTextNode('"' + message + '"');
    content.appendChild(content_text);
    content.innerHTML = convert(content.innerHTML);
    let date_text = document.createTextNode(msg.datetime);
    date.appendChild(date_text);
    item.appendChild(content);
    item.appendChild(date);
    $('#log').children().last().remove();
    $(item).hide().prependTo('#log').fadeIn('slow');
    twemoji.parse(document.body)
  });
  $('form#gratitude').submit(function(event) {
    socket.emit('add_gratitude', {data: $('#gratitude_data').val()});
    $('#gratitude_data').val('');
    return false;
  });

  let contents = document.getElementsByClassName("content");
  for(let i=0; i<contents.length; i++){
    contents[i].innerHTML=convert(contents[i].innerHTML);
  }
  twemoji.parse(document.body);
});