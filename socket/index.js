const { Server } = require("socket.io");

const io = new Server({cors:"http://localhost:5173" });

let onlineUsers =[]
io.on("connection", (socket) => { //create a new connection
  console.log("new connection", socket.id)

  //listen to a connection (listen event from client)
  socket.on("addNewUser", (userId)=>{
    !onlineUsers.some(user => user.userId === userId)&&
    onlineUsers.push({
        userId,
        socketId: socket.id,
    })
    console.log("Online", onlineUsers)
  io.emit("getOnlineUsers", onlineUsers)//send  event to any client
  })

  //add message
  socket.on("sendMessage",(message) =>{
    const user = onlineUsers.find(user => user.userId === message.recipientId)

    if(user){
        io.to(user.socketId).emit("getMessage", message);
        io.to(user.socketId).emit("getNotification", {
          senderId: message.senderId,
          isRead: false,
          date: new Date(),
        });
    }
  })
  socket.on("disconnect",()=>{
    onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)

    io.emit("getOnlineUsers", onlineUsers)//send  event to any client

  })

});

io.listen(3000);//make sure this port is different from port client and server