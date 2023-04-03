
const express = require("express");
const { createServer } = require("http");
const app = express();
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer);

const port = process.env.PORT || 3000;

io.use((socket, next) => {
  if (socket.handshake.query) {
    let callerId = socket.handshake.query.callerId;
    if (callerId) {
      socket.user = callerId;
      next();
    } else {
      next(new Error("Missing caller ID"));
    }
  } else {
    next(new Error("Missing query parameters"));
  }
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.join(socket.user);

  socket.on("makeCall", (data) => {
    let calleeId = data.calleeId;
    let sdpOffer = data.sdpOffer;

    if (!calleeId) {
      socket.emit("callError", {
        message: "Missing callee ID",
      });
    } else if (!sdpOffer) {
      socket.emit("callError", {
        message: "Missing SDP offer",
      });
    } else {
      console.log(`Call Requested from ${socket.id} for user ${data.calleeId}: ${data.sdpOffer}`);

      socket.broadcast.emit("newCall", {
        callerId: socket.user,
        sdpOffer: sdpOffer,
      });
    }
  });

  socket.on("answerCall", (data) => {
    let callerId = data.callerId;
    let sdpAnswer = data.sdpAnswer;

    if (!callerId) {
      socket.emit("callError", {
        message: "Missing caller ID",
      });
    } else if (!sdpAnswer) {
      socket.emit("callError", {
        message: "Missing SDP answer",
      });
    } else {
      console.log(`Received answer from user ${data.callerId}: ${data.sdpAnswer}`);

      socket.to(callerId).emit("callAnswered", {
        callee: socket.user,
        sdpAnswer: sdpAnswer,
      });
    }
  });

  socket.on("IceCandidate", (data) => {
    let calleeId = data.calleeId;
    let iceCandidate = data.iceCandidate;

    if (!calleeId) {
      socket.emit("callError", {
        message: "Missing callee ID",
      });
    } else if (!iceCandidate) {
      socket.emit("callError", {
        message: "Missing ICE candidate",
      });
    } else {
      console.log(`Received ICE candidate from user ${socket.id}: ${data.iceCandidate} and [${data}]`);

      socket.to(calleeId).emit("IceCandidate", {
        sender: socket.user,
        iceCandidate: iceCandidate,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});




































// const express = require("express");
// const {createServer} = require("http");
// const app = express();
// const {Server} = require("socket.io");
// const httpServer = createServer(app);
// const io = new Server(httpServer);

// const port = process.env.PORT || 3000;

// io.use((socket, next) => {
//   if (socket.handshake.query) {
//     let callerId = socket.handshake.query.callerId;
//     socket.user = callerId;
//     next();
//   }
// });
 
// io.on('connection', (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   socket.join(socket.user);

//   socket.on("makeCall", (data) => {
//     let calleeId = data.calleeId;
//     let sdpOffer = data.sdpOffer;

//     console.log(`Call Requested from ${socket.id} for user ${data.calleeId}: ${data.sdpOffer}`);

//     socket.to(calleeId).emit("newCall", {
//       callerId: socket.user,
//       sdpOffer: sdpOffer,
//     });
//   });

//   socket.on("answerCall", (data) => {
//     let callerId = data.callerId;
//     let sdpAnswer = data.sdpAnswer;

//     console.log(`Received answer from user ${data.callerId}: ${data.sdpAnswer}`);

//     socket.to(callerId).emit("callAnswered", {
//       callee: socket.user,
//       sdpAnswer: sdpAnswer,
//     });
//   });

//   socket.on("IceCandidate", (data) => {
//     let calleeId = data.calleeId;
//     let iceCandidate = data.iceCandidate;

//     console.log(`Received ICE candidate from user ${socket.id}: ${data.iceCandidate} and [${data}]`);

//     socket.to(calleeId).emit("IceCandidate", {
//       sender: socket.user,
//       iceCandidate: iceCandidate,
//     });
//   });

//   socket.on('disconnect', () => {
//     console.log(`User disconnected: ${socket.id}`);
//   });
// });



// httpServer.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });
















// const express = require('express');
// const app = express();

// const http = require('http');
// const server = http.createServer(app);

// const io = require('socket.io')(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST']
//   }
// });

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });

//   socket.on('message', (data) => {
//     console.log('Received message:', data);
//     // Handle incoming messages here
//   });

 
// });

// const port = 3000;
// server.listen(port, () => {
//   console.log(`Signaling server listening on port ${port}`);
// });
