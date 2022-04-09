function openStream() {
  const config = { audio: true, video: true };
  //open luong
  return navigator.mediaDevices.getUserMedia(config);
}

function playStream(idVideoTag, stream) {
  const video = document.getElementById(idVideoTag);
  video.srcObject = stream;
  video.play();
}

const peer = new Peer();
peer.on("open", (id) => $("#myPeer").append(id));

//caller
$("#btnCall").click(() => {
  const id = $("#remoteId").val();
  openStream().then((stream) => {
    //open camera and mic
    playStream("localStream", stream);
    const call = peer.call(id, stream);
    //start Call
    let data = "message ne";
    call.on("stream", (remoteStream) => {
      playStream("remoteStream", remoteStream);
    });
  });
});

//send Message to
$("#btnSendMessage").click(() => {
  const message = $("#contentMessage").val();

  console.log(message);
});
//answer call
peer.on("call", (call) => {
  openStream().then((stream) => {
    call.answer(stream);
    //confirm calling
    if (window.confirm("Someone is calling you, do you want to accept ?")) {
      playStream("localStream", stream);
      call.on("stream", (remoteStream) => {
        playStream("remoteStream", remoteStream);
        console.log(remoteStream);
      });
    }
  });
});

// openStream()
// .then(stream => playStream('localStream',stream))
