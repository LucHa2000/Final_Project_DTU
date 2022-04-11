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

    // listening  username
    socket.on("user-name", (data) => {
      arrayUser.push(data);
      socket.username = data;
      usersId[data] = socket.id;
      socket.emit("Server-success-regsiter", data);
    });
  });
}

module.exports = {
  socketServer: socketServer,
};
