/**
 * Created by unagii on 28.04.2017.
 */


Aoi= require('../aoi/aoi.js');
Entity= require('./entity');

function MapControll(eType){
    this.eType=eType


    var aoi= new Aoi()
    this.aoi=aoi;


/*/
    scene.cmdList=[
        ['onNewEntity',scene.onNewEntity,scene],
        ['onNewEntitys',scene.onNewEntitys,scene],
        ['onRemoveEntity', scene.onRemoveEntity,scene],
        ['onRemoveEntitys', scene.onRemoveEntitys,scene],
        ['onEntityPozUpdate',scene.onMoveEntity,scene],
    ]
 /*/


    if (eType==null)trace('no eType in MapControll')
    else trace('MapControll ..ok')
}






MapControll.prototype.newEntity= function(arr){ //arr [id,x,y,t]


    //1 получаем доп информацию о сущьности
    var keyWords = this.eType[arr[3]].keyWords;

    //2 создаём сущьность
    var e = new Entity(arr[0],arr[1],arr[2],arr[3],keyWords)
    //3 разное...
    //4 добавляем в аои
    this.aoi.addNewEntity(e)



}


module.exports = MapControll;