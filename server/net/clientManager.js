/**
 * Created by unagii on 15.04.2017.
 *
 'эта хрень отвечает за клиенты и за сеть
 *и за команды клиентам
 *
 *использование
 *  ClientManager = require('../net/clientManager.js');
 //создаем менеджер клиентов.. и какбы всё
 clientManager = new ClientManager
 *
 * что же происходит
 *1 io ждет события connection
 *2 создется обьект клиент
 *3 клиенту присваеваются команды по умолчанию (дисконект обязательно)
 * и дальше уже в соответствие с ними это вся муть развивается
 *
 */

Client = require('../net/client.js');


function ClientManager(){


    this.clients={};
    this.clientCounter=0

//ждем подключений
    var io = require('socket.io')(serv, {});
    io.sockets.on('connection', this.newClient.bind(this))
    this.io=io;

    this.cmdList={}


//готовим список команд// формат. команда фунция контекст
    var defaultCMD=[   //this это сам клиент если в контексте указано null
        ['hello',function () {
          trace("connect",this.id);
        },null],
        ['disconnect',function () {
            trace("disconect",this.id);
            clientManager.removeClient(this)
        },null]

    ]

    this.cmdList.default=defaultCMD;

    trace('ClientManager ..ok')
}


ClientManager.prototype.newClient=function (socket) {
    //1 ид
    var c = new Client(this.clientCounter,socket)
    //команды клиента по умолчанию
    c.setCMD(this.cmdList.default)

    //добавляем в список клиентов
    this.clients[this.clientCounter]=c
    //подтверждение??
   // socket.emit("hello")


    //надо расширить както это.. както


    this.clientCounter++;

}


ClientManager.prototype.removeClient=function (client) {
    delete  this.clients[client.id]
}




module.exports = ClientManager;