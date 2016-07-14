
//Verify if the shortify button is enabled.
function isShort() {
  return $('#short-and-copy').html() === 'ENCURTAR';
}

//Generates random, short URL
function shortify(link){
  var randomString = Math.random().toString(36).replace(/[^a-z0-9]+/g, '').substr(0, 5);
  return 'http://chr.dc/' + randomString;
}

//Validates the input URL, outputs the short URL into the input field.
function shortifyEvent(){
  var link = $('#input-link').val();
  var reg = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  if(link.search(reg) == -1) {
    $('#notification').html('Link inválido!');
    return;
  }
  var input = $("#input-link");
  var clear = $("#clear");
  var shortAndCopy = $("#short-and-copy");
  $('#notification').html('');
  var shortLink = shortify(link);
  $(input).val(shortLink);
  $(input).addClass('blink');
  $(clear).removeClass('unclickable');
  $(clear).addClass('blink');
  $(shortAndCopy).text('COPIAR');
  $(shortAndCopy).addClass('blink');
}

//Copies the output, short URL.
function copyEvent(){
  $('#input-link').select();
  document.execCommand('copy');
  $('#notification').html('Copiado com sucesso!');
}

//Fire function with Enter key
$("#input-link").keyup(function inputKeyEvent(event){
  if(event.keyCode == 13 && isShort()){
    shortifyEvent();
  }
});

//Executes the commands when button is clicked.
$('#short-and-copy').click(function shortAndCopyEvent(){
  if(isShort()) {
    shortifyEvent();
  } else {
    copyEvent();
  }
});

//Clears the input field, resets color, notification, shortify and clear button.
$('#clear').click(function clearTextEvent() {
  var input = $("#input-link");
  var clear = $("#clear");
  var shortAndCopy = $("#short-and-copy");
  $(input).val('');
  $(input).removeClass('blink');
  $('#notification').html('');
  $(clear).addClass('unclickable');
  $(clear).removeClass('blink');
  $(shortAndCopy).removeClass('blink');
  $(shortAndCopy).html('ENCURTAR');
});

//Sorts the URLS in the JSON by hits. Appends the Top 5 and the sum of total hits into the HTML.
function buildTop5(data){
  var urlsData = JSON.parse(data);
  urlsData.sort(function(a, b){return b.hits - a.hits;});

  for (var i=0; i < 5; i++) {
    var urlInfo = urlsData[i];
    $('#urls').append('<li><a href="' +
      urlInfo.url + '">' +
      urlInfo.shortUrl + '</a><span>' +
      urlInfo.hits + '</span></li>');
  }

  var sum = 0;
  urlsData.forEach(function(item){
    sum += item.hits;
  });
  $('#total-hits').append(sum);
};

//Gets URLS from the JSON.
function getURLs(){
  $.ajax({
    url: 'https://raw.githubusercontent.com/legraeff/frontend-intern-challenge/leticia-graeff/Assets/urls.json',
    cache: false,
    success: buildTop5
  });
}

getURLs();
