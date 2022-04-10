var socket = io("http://localhost:4000");

var receiver = "";
var sender = "";
// display chatting Area

$(document).ready(() => {
  $(".inbox-container").hide();

  $(".user-chat").click(function (e) {
    receiver = $(this).text();
    console.log($(this).text());
    $(".inbox-container").show();
  });
});
