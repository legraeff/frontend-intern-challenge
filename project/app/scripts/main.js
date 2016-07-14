//Verify if the shortify button is enabled.
function isShort() {
  return $('#short-and-copy').html() === 'ENCURTAR';
}

//Validates the input URL, outputs the short URL into the input field.
function shortifyEvent(){
  var input = $('#input-link');
  var clear = $('#clear');
  var shortAndCopy = $('#short-and-copy');
  var notification = $('#notification');

  var link = input.val();
  var reg = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  if(link.search(reg) == -1) {
    notification.html('Link inválido!');
    return;
  }
  notification.html('');

  //Generates random, short URL
  var randomString = Math.random().toString(36).replace(/[^a-z0-9]+/g, '').substr(0, 5);
  var shortLink = 'http://chr.dc/' + randomString;

  input.val(shortLink);
  input.addClass('blink');
  clear.removeClass('unclickable');
  clear.addClass('blink');
  shortAndCopy.text('COPIAR');
  shortAndCopy.addClass('blink');
}

//Fire function with Enter key
$('#input-link').keyup(function inputKeyEvent(event){
  if(event.keyCode == 13 && isShort()){
    shortifyEvent();
  }
});

//Executes the commands when button is clicked.
$('#short-and-copy').click(function shortAndCopyEvent(){
  if(isShort()) {
    shortifyEvent();
  } else {
    //Copies the output, short URL.
    $('#input-link').select();
    document.execCommand('copy');
    $('#notification').html('Copiado com sucesso!');
  }
});

//Clears the input field, resets color, notification, shortify and clear button.
$('#clear').click(function clearTextEvent() {
  var input = $('#input-link');
  var clear = $('#clear');
  var shortAndCopy = $('#short-and-copy');
  var notification = $('#notification');
  input.val('');
  input.removeClass('blink');
  notification.html('');
  clear.addClass('unclickable');
  clear.removeClass('blink');
  shortAndCopy.removeClass('blink');
  shortAndCopy.html('ENCURTAR');
});

//Gets URLS from the JSON.
(function getURLs(){
  $.ajax({
    url: 'https://raw.githubusercontent.com/legraeff/frontend-intern-challenge/leticia-graeff/Assets/urls.json',
    cache: false,
//Sorts the URLS in the JSON by hits. Appends the Top 5 and the sum of total hits into the HTML.
    success: function (data){
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
    }
  });
})();