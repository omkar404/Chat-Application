const express = require('express');
const { Socket } = require('socket.io');
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 4000;

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public')) // express.static use for import images css and js files

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

//socket
const io= require('socket.io')(http)

io.on('connection', (socket)=>{
    console.log("connected..")

    socket.on('message', (msg) =>{  // coming from client msg and user 
        socket.broadcast.emit('message', msg)
    })
})