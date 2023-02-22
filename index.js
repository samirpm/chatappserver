const express = require("express")
const app =express()
const cors =require("cors")
const http = require("http")
const {Server} =require("socket.io")
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const server =http.createServer(app)
const io = new Server(server,{cors:{
    origin:"http://192.168.1.44:3000",
    methods:["GET","POST"]
}})
io.on("connection",(socket)=>{
    console.log("user connected",socket.id)
    
    // socket.emit('me',socket.id)

    socket.on("join-room",(data)=>{
        socket.join(data)
        console.log(`User with ID : ${socket.id} and Room ID : ${data}`);
    })
    socket.on("send-message",(data)=>{
      socket.to(data.room).emit("receive-message",data)
    })
    socket.on("disconnect",()=>{
        console.log("User disconnected",socket.id);
        console.log(`user with ${socket.id} disconnected`);
        // socket.broadcast.emit("call ended")
    })
    // socket.on("calluser",({userToCall,signalData,from,name})=>{
    //     io.to(userToCall).emit({signal:signalData,from,name})
    // })
    // socket.on("answerToCall",(data)=>{
    //     io.to(data.to).emit("callaccepted",data.signal)
    // })
})
server.listen(5000,()=>{
    console.log("port running");
})