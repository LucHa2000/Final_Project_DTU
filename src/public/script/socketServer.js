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

    // listening  username from client
    socket.on("user-name", (data) => {
      if (arrayUser.length == 0 && data != "") {
        arrayUser.push(data);
      } else {
        if (arrayUser.find((element) => element == data) === undefined) {
          arrayUser.push(data);
        } else {
          socket.emit("listUserActive", arrayUser);
          return;
        }
      }
      socket.username = data;
      usersId[data] = socket.id;
      socket.emit("listUserActive", arrayUser);

      console.log("arrayUser : " + arrayUser);
      console.log("arrayUserID : " + usersId[data]);
    });
    //listening content from client
    socket.on("content-message", (data) => {
      let socketId = usersId[data.receiver];
      io.to(socketId).emit("new-message-private", data);
    });

    //listening file

    // socket.on("base64file", function (msg) {
    //   console.log("received base64 file from" + msg.username);
    //   socket.username = msg.username;
    //   // socket.broadcast.emit('base64 image', //exclude sender
    //   io.sockets.emit(
    //     "base64file", //include sender

    //     {
    //       username: socket.username,
    //       file: msg.file,
    //       fileName: msg.fileName,
    //     }
    //   );
    // });

    //listening icon from client
    socket.on("content-emotion", (data) => {
      var socketId = usersId[data.receiver];
      io.to(socketId).emit("new-message-private-emotion", data);
    });
  });
}

module.exports = {
  socketServer: socketServer,
};
