
trace=console.log;


//init//
var express = require('express');
var app = express();
serv = require('http').Server(app);

app.get('/',function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));
serv.listen(2000);
///










//Demo1 = require('./server/demo/t6ClientTest.js');
Demo1 = require('./server/demo/t8.js');

demo= new Demo1()


demo.startDemo()













/*/

var ClientManager = require('./server/clientManager.js');

User = require('./server/user.js');


//init//
var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/',function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));
serv.listen(2000);
///

trace=console.log;
trace('hello');


Sector = require('./server//my/aoi/sector.js');

s= new Sector(0);
e={
   id:0,
   p:{x:0,y:0},
   t:0,
   keyWords : ['unit']

}
s.addNewEntity(e)
//s.removeEntity(e)
 /*/
/*/
trace(s)

//разное
clientManager= new ClientManager()




idCounter=0
clients={}


var io=require('socket.io')(serv,{});

io.sockets.on('connection',function(socket){

   // clientManager.addClient(socket)

    idCounter++
    socket.id=idCounter
    socket.x=0
    socket.y=0
    clients[idCounter]=socket

    //создаём все энтити
    var pack=[];
    for (var i in clients ){
        var u=clients[i];
       // u.x++;//= Math.random()*1000;
        //u.y++;//= Math.random()*1000;
        //  u.updatePosition();

        pack.push([u.id,u.x,u.y,0])
    }
    u.emit('onNewEntitys', pack)
})




///основной цикл апдейта. потом заменить на что то более

setInterval(function () {

    //var users=clientManager.userList;
    //var clients=clientManager.clients;


   var pack=[];
   for (var i in clients ){
       var u=clients[i];
        u.x++;//= Math.random()*1000;
        u.y++;//= Math.random()*1000;
      //  u.updatePosition();

       pack.push([u.id,u.x,u.y])
    }

    for (var i in clients ) {
        var cli = clients[i];
        cli.emit('onMoveEntitys', pack)
    }


},1000/25);
/*/

/*/
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

///////////


trace('qwewe');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
/*/