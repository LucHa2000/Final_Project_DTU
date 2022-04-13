let socket = io("http://localhost:4000");

let receiver = "";
let sender = "";
// display chatting Area

$(document).ready(() => {
  $(".inbox-container").hide();

  // send username to server
  socket.emit("user-name", $(".account").text().trim());

  //get list user Online
  socket.on("listUserActive", (data) => {
    console.log(data);
  });

  //listening new message

  socket.on("new-message-private", (data) => {
    //console.log(data);
    receiver = data.sender;
    $(".chat-container").append(
      '<li class="collection-item"><h1>' +
        data.message +
        '</h1><h6 class="nameUser">' +
        data.sender +
        "</h6></li>"
    );
  });

  $(".user-chat").click(function (e) {
    //get sender and receiver
    receiver = $(this).text().trim();
    sender = $(".account").text().trim();
    //show chat container
    $(".inbox-container").show();
  });
  //send message
  $("#send-message").click(function (e) {
    let message = $("#message-inbox").val();
    let content = {
      message: message,
      receiver: receiver.trim(),
      sender: sender,
    };
    socket.emit("content-message", content);

    $(".chat-container").append(
      '<li class="collection-item"><h1>' +
        content.message +
        '</h1><p class="nameUser red-text text-darken-2">' +
        content.sender +
        "</p></li>"
    );
  });
  //send file
  // $("#uploadfile").bind("change", function (e) {
  //   console.log("change");
  //   var data = e.originalEvent.target.files[0];
  //   readThenSendFile(data);
  // });
  // function readThenSendFile(data) {
  //   var reader = new FileReader();
  //   reader.onload = function (evt) {
  //     var msg = {};
  //     //msg.username = username;
  //     msg.file = evt.target.result;
  //     //msg.fileName = data.name;
  //     socket.emit("base64file", msg);
  //   };
  //   reader.readAsDataURL(data);
  // }

  //send icon

  //send icon

  $(".image-emotion").click(function (event) {
    var message = $(this).attr("src");
    socket.emit("content-emotion", {
      message: message,
      receiver: receiver.trim(),
      sender: sender,
    });
    $("#chat-content").append(
      '<div class="message-container"><img class="image-infor-focus text-message message-icon" src="' +
        message +
        '">' +
        '<h6 class="nameUser">' +
        "You</h6></div>"
    );
  });
});
