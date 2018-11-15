const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let messages = []

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/messages', (req, res, next) => {
  res.json(messages);
  next();
});

io.on('connection', function(socket){
  console.log('-- user connected');
  socket.on('disconnect', function(){
    console.log('-- user disconnected');
  });

  socket.on('message-sent', (newMessage) => {
    console.log('-- message received')
    console.log(newMessage);
    console.log('--------------');
    messages = [newMessage, ...messages];
    socket.broadcast.emit('new-message', newMessage);
  })

  socket.on('event-sent', (newEvent) => {
    console.log('-- event received')
    console.log(newEvent);
    console.log('--------------');
    socket.broadcast.emit('new-event', newEvent);
  })
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
