
var buildTop5 = function (data) {
  console.log(data);
};

function getURLs(){
  $.ajax({
    url: "../Assets/urls.json",
    cache: false,
    success: buildTop5
  });
}

getURLs();
