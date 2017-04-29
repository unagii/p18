/**
 * Created by unagii on 28.04.2017.
 */







function Demo1() {

    this.startDemo = function () {

        ClientManager = require('../net/clientManager.js');
        MapControll = require('../my/map/mapControll.js');
        Conf=require('../data/config.js');
        AoiViewer = require('../my/aoi/aoiViewer');


        //создаем менеджер клиентов.. и какбы всё

        var conf=new Conf() //data
        clientManager = new ClientManager()//net
        mapControll= new MapControll(conf.eType)//map

        //тесты
        //итак.. мы создали грид 16x16  256x256

        //1 добавляем ентити в разнве сектора
        mapControll.newEntity([100,100,100,0])
        mapControll.newEntity([101,300,100,0])
        mapControll.newEntity([102,100,300,0])
        mapControll.newEntity([103,300,300,0])
        mapControll.newEntity([104,600,600,0])

        //trace(mapControll.aoi.allEntitys)

//переделать!!!

        //это неправельно. но???
        clientManager.cmdList.default.push( ['map', function() {
            var v = new AoiViewer(this.id, 0, 0, this.socket)
            this.mapViewer=v
            mapControll.newEntity([this.id,0,0,2])
            mapControll.aoi.allSectors[0].addViewer(v)
        },null])

        clientManager.cmdList.default.push( ['CameraSectorChenge', function(data) { //data [x,y]
            this.mapViewer.onSectorChange(data)
        },null])
        clientManager.cmdList.default.push( ['OnCameraPozChenge', function(data) { //data [x,y]
            //this.mapViewer.onSectorChange(data)
           // trace(mapControll.aoi.allEntitys[0])
           // trace(data);
            //trace(data.x,data.y);
            if( mapControll.aoi.allEntitys[this.id]!=null)mapControll.aoi.allEntitys[this.id].updatePoz(data[0],data[1])
        },null])



       /*/
        var v= new AoiViewer(0,10,10)
        v.onSectorChangeEvent=function(){}; //это вообще что?

        v.onNewEntityEvent = function(a) {socket.emit('onNewEntity', a)};// a:Dynamic) { };
        v.onNewEntitysEvent = function(a) {socket.emit('onNewEntitys', a)};//a:Array<Dynamic>) { };

        v.onRemoveEntityEvent=function(a) {socket.emit('onRemoveEntity', a) };//a:Dynamic){};
        v.onRemoveEntitysEvent = function(a) { socket.emit('onRemoveEntitys', a)};//a:Dynamic) { };
        v.onEntityPozUpdateEvent = function(a) { socket.emit('onEntityPozUpdate', a)};

        mapControll.aoi.allSectors[0].addViewer(v)
        /*/


    }
}

module.exports = Demo1;