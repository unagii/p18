/**
 * Created by unagii on 23.04.2017.
 */




function Demo1(){

    this.startDemo=function(){



        Sector = require('../my/aoi/sector.js');
        AoiViewer = require('../my/aoi/aoiViewer');


        s= new Sector(0);
        e={
            id:0,
            p:{x:0,y:0},
            t:0,
            keyWords : ['unit'],
            updatePoz:function(x,y) {
                this.p.x = x;
                this.p.y = y;

                //оповещаем сектор что позиция сущьности изменилась
                this.sector.updateEntityPoz(this);

            }
        }
       // s.addNewEntity(e)
//s.removeEntity(e)
        /*/
         /*/



            //trace(s)

        s.addNewEntity(e)


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

            var v= new AoiViewer(idCounter,10,10)

            socket.emit('hello')



            v.onSectorChangeEvent=function(){}; //это вообще что?

            v.onNewEntityEvent = function(a) {socket.emit('onNewEntity', a)};// a:Dynamic) { };
            v.onNewEntitysEvent = function(a) {socket.emit('onNewEntitys', a)};//a:Array<Dynamic>) { };

            v.onRemoveEntityEvent=function(a) {socket.emit('onRemoveEntity', a) };//a:Dynamic){};
            v.onRemoveEntitysEvent = function(a) { socket.emit('onRemoveEntitys', a)};//a:Dynamic) { };
            v.onEntityPozUpdateEvent = function(a) { socket.emit('onEntityPozUpdate', a)};


            s.addViewer(v)


            //u.emit('onNewEntitys', pack)
        })


        setInterval(function () {

            //var users=clientManager.userList;
            //var clients=clientManager.clients;
           // e.id++
          // e.p.x++
           // e.p.y++
            //s.addNewEntity(e)

            e.updatePoz(Math.random()*1000,Math.random()*1000)

        },2000);//1000/25);


    trace("hello")
    }


}






module.exports = Demo1;