/**
 * Created by unagii on 22.04.2017.
 */


function AoiViewer(id,x,y,socket){
    this.id=id;
    this.x=x;
    this.y=y;



    this.targetSector={}// его нам даёт сектор

    this.entitys={}




    //както так
    this.onSectorChangeEvent=function(){}; //это вообще что?
    this.onNewEntityEvent = function(a) {socket.emit('onNewEntity', a)};// a:Dynamic) { };
    this.onNewEntitysEvent = function(a) {socket.emit('onNewEntitys', a)};//a:Array<Dynamic>) { };
    this.onRemoveEntityEvent=function(a) {socket.emit('onRemoveEntity', a) };//a:Dynamic){};
    this.onRemoveEntitysEvent = function(a) { socket.emit('onRemoveEntitys', a)};//a:Dynamic) { };
    this.onEntityPozUpdateEvent = function(a) { socket.emit('onEntityPozUpdate', a)};
/*/
    this.onSectorChangeEvent=function(){};
    this.onNewEntityEvent = function() { };// a:Dynamic) { };
    this.onNewEntitysEvent = function() { };//a:Array<Dynamic>) { };
    this.onRemoveEntityEvent=function() { };//a:Dynamic){};
    this.onRemoveEntitysEvent = function() { };//a:Dynamic) { };
    this.onEntityPozUpdateEvent = function() { };
 /*/
}


//это вызывается один рас при входе на карту




AoiViewer.prototype.onEnterMap= function(){


    //map = map_;


    //заносим все видимые ентити в наш список видимых ентитей // это надо чтобы знать какие ентити мы передавали клиенту
    var eLists = this.targetSector.allEntitys;
    for (eListName in eLists) {
        var eList=eLists[eListName]
        for (eName in eList){
            var e=eList[eName]
           this.entitys[e.id]= e;
        }
    }

    //передаём сущьности клиенту
    this.onNewEntitys( this.entitys);

}



AoiViewer.prototype.onSectorChange= function(data){ //data [x,y]



    //1 получаем новый сектор
    var newSector=this.targetSector.getSector(data[0],data[1])
    //2 получаем список всех соседей из этого сектора
    var newNeibours=newSector.allNeibours

    //3 ищим новых соседий
    for (neibourName in newNeibours){
        //var newNeibour=newNeibours[neibourName]
        if (this.targetSector.allNeibours[neibourName]==null) {
            if (Object.keys(newNeibours[neibourName].entitys).length != 0){ //чтоб небыло пустых пакетов
                this.onNewEntitys(newNeibours[neibourName].entitys)
            }
        }  //если это новый сосед то..


    }

    for (neibourName in this.targetSector.allNeibours){
        //var newNeibour=newNeibours[neibourName]
        if (newNeibours[neibourName]==null) {
            if (Object.keys(this.targetSector.allNeibours[neibourName].entitys).length != 0) { //чтоб небыло пустых пакетов
                this.onRemoveEntitys(this.targetSector.allNeibours[neibourName].entitys)
            }
        }  //если это новый сосед то..
    }

    delete this.targetSector.viewers[this.id]
    newSector.viewers[this.id]=this
    this.targetSector= newSector;
}


//добавление ентити
AoiViewer.prototype.onNewEntity= function (entity){

    //проверяем. сообщали ли мы клиенту об этой сущьности или нет
    //if (entitys.exists(e.id)) {
    //}else {
    //делаем поментку что сообщали
    this.entitys[entity.id]= entity;

    //вызываем событее onAddEntityEvent
    //c параметром [id,x,y,type]
    this.onNewEntityEvent([entity.id, entity.p.x, entity.p.y, entity.t]);
    //}


    //просто сообщаем клиенту
    //onAddEntityEvent([e.id, Std.int(e.p.x), Std.int(e.p.y), e.t]);
}

//добавление многа ентитей
AoiViewer.prototype.onNewEntitys= function (eList){//eList:Map<Int,Entity>){


    //для списка сущьностей..
    var arr=[]// Array<Array<Int>>();
    for (eName in eList) {
       var e=eList[eName]
        //готовим массив из элементов
        //c параметром [id,x,y,type]
        this.entitys[e.id]= e;//gjdnjhztnc
       // trace(e.id)
        arr.push([e.id, e.p.x, e.p.y, e.t]);
    }

    //trace(arr)

    //вызываем событее
    this.onNewEntitysEvent(arr);
}


AoiViewer.prototype.onEntityEntersSector= function (entity){
    //это событее происходит при перемещение энтити из одного сектора в другой
    //и мы могли уже передовать информацию об этом ентити нашему клиенту.. а могли и непередовать

    //проверяем. сообщали ли мы клиенту об этой сущьности или нет
    if (this.entitys[entity.id]!=null) {


    }else {

        //делаем поментку что сообщали
        this.entitys[entity.id]= entity;

        //вызываем событее onAddEntityEvent
        //c параметром [id,x,y,type]
        this.onNewEntityEvent([entity.id, entity.p.x, entity.p.y, entity.t]);
    }


    //просто сообщаем клиенту
    //this.onNewEntityEvent([e.id, Std.int(e.p.x), Std.int(e.p.y), e.t]);
}

//удаление ентити
AoiViewer.prototype.onRemoveEntity= function (entity){
    //удаляяем из списка увиденых
    entitys.remove(e.id);

    //сообщаем ид адаленной сущьности
    this.onRemoveEntityEvent(e.id);
}

//удаление много ентити
AoiViewer.prototype.onRemoveEntitys= function (eList){//eList:Map<Int,Entity>){
    //для списка сущьностей..
    var arr=[]// Array<Int>();
    for (e in eList) {
        //готовим массив из id сущьностей подлежащих удалению
        arr.push(e)
       delete this.entitys[e];
        //arr.push(eList[e.id]);
    }
    this.onRemoveEntitysEvent(arr);
}

AoiViewer.prototype.onEntityLeavesSector= function(entity,newSector){

    //удаление ентити из одного сектора с переносом в новый сектор
    //надо проверить есть ли новый сектор в диапазоне нашей видемости

    if (this.targetSector.allNeibours[newSector.id] == null) {//если целевой сектор не входит в число соседних секторов
        //смело удаляем ентити
        //удаляяем из списка увиденых
        delete this.entitys[entity.id];
            //entitys.remove(entity.id);

        //сообщаем ид адаленной сущьности
        this.onRemoveEntityEvent(entity.id);

    }


}





////////
//движение ентитей
///////

AoiViewer.prototype.onEntityPozUpdate= function (entity){
    //trace([entity.id, entity.p.x, entity.p.y])
    this.onEntityPozUpdateEvent([entity.id, entity.p.x, entity.p.y]);
}



module.exports = AoiViewer;