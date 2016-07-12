function isShort() {
  return $('#short-and-copy').html() === 'ENCURTAR';
}

function inputKeyEvent(event){
  if(event.keyCode == 13 && isShort()){
    shortifyEvent();
  }
}

function shortify(link){
  var randomString = Math.random().toString(36).replace(/[^a-z0-9]+/g, '').substr(0, 5);
  return 'http://chr.dc/' + randomString;

}

function clearTextEvent(){
  $('#input-link').val('');
  $('#short-and-copy').html('ENCURTAR');
  $("#notification").html("");
  $("#clear").html("");
  $('#input-link').css("color", "#f07225");

}

function shortifyEvent(){
  var link = $('#input-link').val();
  var reg = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

  if(link.search(reg) == -1) {
    $("#notification").html("Link inválido!");
    return;
  }
  $("#notification").html("");
  var shortLink = shortify(link);
  $('#input-link').css("color", "#fff");
  $('#input-link').val(shortLink);
  $("#short-and-copy").html("COPIAR");
  $("#clear").html("&times;");
  }

function copyEvent(){
  $('#input-link').select();
  document.execCommand('copy');
  $("#notification").html("Copiado com sucesso!");

}

function shortAndCopyEvent(){
  if(isShort()) {
    shortifyEvent();
  } else {
    copyEvent();
  }
}

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

function getURLs(){
  $.ajax({
    url: 'https://raw.githubusercontent.com/legraeff/frontend-intern-challenge/leticia-graeff/Assets/urls.json',
    cache: false,
    success: buildTop5
  });
}

getURLs();
