let socket = io("http://localhost:4000");

const userID = $("#userID").html();
const notificationMessage = $("#message-notification").html();
if (notificationMessage == "") {
  $(".notification-container").hide();
}
$(document).ready(() => {
  if (userID) {
    //send account to server
    socket.emit("accountLogin", userID);

    //send notification
    //bookingNotification(data);
  } else console.log("Not login");
});

socket.on("new-notification", (data) => {
  //set notification Data
  if (data) {
    $(".notification-container").show();
    $("#message-notification").text(data);
  }
});
