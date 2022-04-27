const arrayUser = [];
const usersId = [];
let info;
function socketServer(io) {
  //check connect
  io.on("connection", (socket) => {
    //userConnect
    console.log("have a connect ID :" + socket.id);
    //send notification
    io.sockets.emit("server-send-notification-message", "ban co 1 tin nhan");
    //disconnect
    socket.on("disconnect", (data) => {
      //arrayUserGroup.splice(arrayUserGroup.indexOf(userMember), 1);
      //io.sockets.emit("member-out-group", arrayUserGroup);
      console.log("disconnect ....." + socket.id);
    });

    //socket.adapter.rooms  show list room detail
    //listening create room
    socket.on("create-room", (data) => {
      socket.join(data);
      //socket.room = data;
      //push room to array rooms
      let rooms = [];

      for (let e of socket.adapter.rooms.keys()) {
        rooms.push(e);
      }

      //send rooms to everyone
      io.sockets.emit("server-send-rooms", rooms);
      //send room when switch , just emit user send request switch room
      socket.emit("server-send-room-socket", data);
    });

    socket.on("user-chat", (data) => {
      io.sockets.in(data.room).emit("server-send-chat", data);
    });

    //send notification
    socket.emit("server-send-notification-message");
  });
}

let bookingNotification = (data) => {
  // let notification = {
  //   receiver: data.receiver,
  //   content: "Bạn có một thông báo mới !",
  //   sender: userID,
  //   type: data.type,
  // };
  return data;
};

function serverNotification(io, notification) {
  info = notification;
  io.on("connection", (socket) => {
    //userConnect
    console.log("have a connect ID :" + socket.id);

    //send notification
    socket.on("accountLogin", (data) => {
      arrayUser.push(data);
      socket.username = data;
      usersId[data] = socket.id;
      socket.emit("Server-success-regsiter", data);
    });

    if (info) {
      //send doctor
      let doctorSocketId = usersId[info.doctorID];
      io.to(doctorSocketId).emit("new-notification", info.content);

      // //send user
      // let userSocketId = usersId[info.fromUserID];
      // io.to(userSocketId).emit(
      //   "new-notification",
      //   "Bạn đã đặt lịch thành công !"
      // );
      info = "";
    }
  });
}

module.exports = {
  socketServer: socketServer,
  serverNotification,
  bookingNotification,
};
