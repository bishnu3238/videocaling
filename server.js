
const express = require("express");
const {createServer} = require("http");
const app = express();
const {Server} = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer);



// const app = require('http').createServer();
// const io = require('socket.io')(app);

const port = process.env.PORT || 3000;

  
// io.on('connection', (socket) => {
//   console.log(`User connected: ${socket.id}`);
  
//   socket.on('disconnect', () => {
//     console.log(`User disconnected: ${socket.id}`);
//   });
// });
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  // socket.on('offer', (offer) => {
  //   console.log(`Received offer from user ${socket.id}: ${offer}`);
  //   socket.broadcast.emit('offer', offer);
  // });
  
  // socket.on('answer', (answer) => {
  //   console.log(`Received answer from user ${socket.id}: ${answer}`);
  //   socket.broadcast.emit('answer', answer);
  // });
  
  // socket.on('ice-candidate', (candidate) => {
  //   console.log(`Received ICE candidate from user ${socket.id}: ${candidate}`);
  //   socket.broadcast.emit('ice-candidate', candidate);
  // });
  
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});



httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
















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
