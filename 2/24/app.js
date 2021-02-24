const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        console.log(msg);
        io.emit('chat message', msg);
    })
})

http.listen(3000, () => {
    console.log('Listening on port: 3000');
});