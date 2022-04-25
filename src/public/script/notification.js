console.log("hello notification link");
let socket = io("http://localhost:4000");

let room = "";
let sender = "";
let roomID = "";
// display chatting Area

$(document).ready(() => {});
socket.on("server-send-notification-message", (data) => {
  console.log(data);
});
