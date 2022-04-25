const arrayUser = [];
const usersId = [];

function socketServer(io) {
  //check connect
  io.on("connection", (socket) => {
    //userConnect
    console.log("have a connect ID :" + socket.id);

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
      //send notification
      io.sockets.emit("server-send-notification-message", "ban co 1 tin nhan");
    });

    socket.on("user-chat", (data) => {
      io.sockets.in(data.room).emit("server-send-chat", data);
    });

    //send notification
    socket.emit("server-send-notification-message");
  });
}

module.exports = {
  socketServer: socketServer,
};
