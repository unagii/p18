/**
 * Created by unagii on 22.04.2017.
 */
/* сектор карты
* эта штука отвечает за аои
* это один из секторов на которые разбита карта
* позволяет отслеживать перемешения сущьностий по секторам..  както так
*
* что должен уметь
* новая сущьность\ удаление сущьности
* вход в сектор\ выход из сектора
* проверять чтоб сущьности не выходили за карту
* и содержать инфу о сущьностях с разбивкой на группы..
* .. тоесть дофига да
*
*
*
*
* функции
*
* new(id_:Int,config_:MapConfig,mapSize:Dynamic,sectorSize:Dynamic,?allSectors_:Array<MapSector>)
* id_- ид сектора.. оно нужно чтоб сектор знал где он находится и мог общатся с другими секторами
* config_ надо чтоб карта заработала.. там мы будем ещё менять
* mapSize - размер карты в секторах например 16*16
* sectorSize - размер сектора например 256*256
* warparound да нет
* allSectors_ если сектор не один то надо список всех секторов на карте а не только соседних
*
*
*
* addNeibour(neibour:MapSector) //добавляет соседний сектор
* addViewer(v:MapViewer) //добавляет вьюер
*
* //работа с сущьностями
* addNewEntity(id:Int,x:Int,y:Int,type:Int):Entity//событее onNewEntity
* removeEntity(e:Entity) //событее onRemoveEntity
*
* onEntityEntersSector(e:Entity) //событее onEntityEntersSector
* onEntityLeavesSector(e:Entity,newSector:MapSector) //событее onEntityLeavesSector
*
* updateEntityPoz:Function //событее onEntityPozUpdate
* либо
* 	onEntityPozUpdateM(e:Entity)//если сущьность вышла за приделы экрана посылает её в новый сектор
* 	onEntityPozUpdateS(e:Entity)//если сущьность вышла за приделы экрана делает ей варпараунд
*
*

*
* про систему координат
* 0xfff000 ??
* 0x000f00 сектор
* 0x0000f0 тайл
* 0x00000f пиксель
*
*/



function Sector(id,config,allSectors){

    if (config==undefined){
        var config={
            sectorsInMap:1,
            sectorSize:256,
            warparound:true,
            keyWords:['unit','structure','fx','bullet']
        }
    }
//маски
    this.idMask=config.sectorsInMap-1;  //0xf // //int
    this.inSectorMask= config.sectorSize-1;//0x0ff //int
    this.sectorMask=this.idMask<<this.inSectorMask.toString(2).length;//0xf00 //int
    this.mapMask=this.sectorMask | this.inSectorMask ;//0xfff //int
    this.inSectorDigit=this.inSectorMask.toString(2).length
    this.sectorDigit= this.inSectorMask.toString(2).length>>1

    //параметры сектора
    this.id=id;//локальное ид сектора //int
    this.x=id & this.idMask;//локальное x сектора //зачем? //int
    this.y=(id & (this.idMask<<this.idMask.toString(2).length ))>>this.idMask.toString(2).length;//локальное y сектора //int
    this.size=config.sectorSize;//размер сектора //int
    this.sectorsInMap=config.sectorsInMap; //int


    this.warparound=config.warparound; //переделать



//структура данных. //сам сектор
    //public var neibours:Array<SectorData>;//соседи/ ненужны
    this.entitys={};//свои ентити Map<Int,Entity>
    this.keyWords={};//свои группы Map<String,Array<Entity>>
    this.viewers={};//свои вюеры Array<MapViewer>

    //соседнии массивы//область видимости сектора
    this.allNeibours={};//все соседи и этот сектор Array<MapSector>  //это должен быть массив но нет
    this.allEntitys=[];//все ентити Array<Map<Int,Entity>>
    this.allKeyWords=[];//все группы Array<Map<String,Array<Entity>>>
    this.allViewers=[];//все вюеры Array<Array<MapViewer>>


    //глобальные данные карты//вообще вся карта
    if (allSectors==null){
        allSectors = [];
        allSectors.push(this);
    }else {
        this.allSectors = allSectors; //вообще все сектора на карте Array<MapSector>
    }

    //добовляем себя к соседям
    this.allNeibours[this.id]=this;
    this.allEntitys.push(this.entitys);
    this.allKeyWords.push(this.keyWords);
    this.allViewers.push(this.viewers);

    //важно чтоб список слов был конечный
    var keyWordsList = config.keyWords;
    for (key in keyWordsList){
        this.keyWords[keyWordsList[key]]={}; //в других языках это может быть массив
    }

    //Переделать!!!!

    //границы
    //если нам нужен варпараун заменяем функцию
//trace(this.chekBorders.toString())

    ///ЕРЕСЬ!!!
    if (this.warparound) this.chekBorders = this.chekBordersWarparound;
    // else this.chekBorders =  this.chekBordersSolid;  //можно проще
    else if (this.id==0) this.chekBorders=this.chekBordersSolidTL
    else if (this.id==this.idMask) this.chekBorders=this.chekBordersSolidTR
    else if (this.id==(config.sectorsInMap*config.sectorsInMap)-this.idMask) this.chekBorders=this.chekBordersSolidDL
    else if (this.id==(config.sectorsInMap*config.sectorsInMap)) this.chekBorders=this.chekBordersSolidDR


    //если сектор не скраю карты то нафик проверять границы?
  //  if (this.x!=0 || this.x^this.idMask!=0 ){
  //      this.chekBorders = function(e) { };
  //  }
  //  if (this.y!=0 || this.y^this.idMask!=0 ){
  //      this.chekBorders = function(e) { };
  //  }



}

//к нам пришол вьюер
Sector.prototype.addViewer= function (viewer) {
    this.viewers[viewer.id]=viewer;
    viewer.targetSector = this;
    viewer.onEnterMap();
}

//новое ентити пришло в сектор.. откуда неважно
Sector.prototype.addNewEntity= function (entity) {
    //неважно есть оно или нет мы его заменим.. это не наша проблема
    this.entitys[entity.id]=entity;

    //2 разнести его по группам
    for (key in entity.keyWords) {
        var arr= this.keyWords[entity.keyWords[key]];
        arr[entity.id]=entity;
        //arr.push(entity);
    }
    //3 сообщить ентити куда оно попало
    entity.sector = this;

    //4 оповестить все вьюеры
    var allViewers=this.allViewers
    for (vList in allViewers) {
        var viewers=allViewers[vList]
        for (v in viewers) {
            viewers[v].onNewEntity(entity);
        }
    }
     //return e;
}


//это должно вызываться при полном удаление ентити.. например при смерти
Sector.prototype.removeEntity=function (entity){
    //чтобы удалить энтити нам надо

    //1 удалить из списка ентитей
    delete this.entitys[entity.id];

    //2 удалить из групп
    for (key in entity.keyWords) {
        var arr=this.keyWords[entity.keyWords[key]];
        delete arr[entity.id]
    }

    //3 оповестить всех вьюеров
    var allViewers=this.allViewers
    for (vList in allViewers) {
        var viewers=allViewers[vList]
        for (v in viewers) {
            viewers[v].onRemoveEntity(entity);
        }
    }


}



Sector.prototype.chekBordersSolid= function(entity){
    // trace(entity);
    var mapMask=this.mapMask
    if (entity.p.x > mapMask ) entity.p.x = mapMask;
    else if (entity.p.x < 0 ) entity.p.x = 0;

    if (entity.p.y > mapMask ) entity.p.y = mapMask;
    else if (entity.p.y < 0 ) entity.p.y = 0;


}

//зачем 4 функции??  чтоб лишний рас не проверять чтоли?
Sector.prototype.chekBordersSolidTL= function(entity){
   // trace(entity);
    var mapMask=this.mapMask
    //if (entity.p.x > mapMask ) entity.p.x = mapMask;
    if (entity.p.x < 0 ) entity.p.x = 0;

   // if (entity.p.y > mapMask ) entity.p.y = mapMask;
    if (entity.p.y < 0 ) entity.p.y = 0;


}

Sector.prototype.chekBordersSolidTR= function(entity){
    // trace(entity);
    var mapMask=this.mapMask
    if (entity.p.x > mapMask ) entity.p.x = mapMask;
   // else if (entity.p.x < 0 ) entity.p.x = 0;

   // if (entity.p.y > mapMask ) entity.p.y = mapMask;
     if (entity.p.y < 0 ) entity.p.y = 0;


}

Sector.prototype.chekBordersSolidDL= function(entity){
    // trace(entity);
    var mapMask=this.mapMask
   // if (entity.p.x > mapMask ) entity.p.x = mapMask;
    if (entity.p.x < 0 ) entity.p.x = 0;

    if (entity.p.y > mapMask ) entity.p.y = mapMask;
    //else if (entity.p.y < 0 ) entity.p.y = 0;


}
Sector.prototype.chekBordersSolidDR= function(entity){
    // trace(entity);
    var mapMask=this.mapMask
    if (entity.p.x > mapMask ) entity.p.x = mapMask;
   // else if (entity.p.x < 0 ) entity.p.x = 0;

    if (entity.p.y > mapMask ) entity.p.y = mapMask;
    //else if (entity.p.y < 0 ) entity.p.y = 0;


}




Sector.prototype.chekBordersWarparound= function (entity) {


    entity.p.x = entity.p.x &this.mapMask;
    entity.p.y = entity.p.y & this.mapMask;


}


Sector.prototype.updateEntityPoz= function (entity) {
   // trace(entity)
    //гарантируем чтоб сущьность оставалась в приделах карты
//trace(this.chekBorders)
   // this.chekBordersWarparound(entity)
//trace(entity)
   // trace(this.chekBorders)
  //  trace(this.chekBordersWarparound)

    this.chekBorders(entity);


  //  this.chekBordersWarparound(entity);
//trace(entity.p.x, entity.p.y)
    //определяем сектор в котором должно быть наше ентити
    var newSector=this.getSector(entity.p.x, entity.p.y);

    if (newSector.id != this.id) { //если новые координаты ентити подразумевают что оно должно находится в другом секторе..

        this.onEntityLeavesSector(entity,newSector); //удаляем из этого сектора
        newSector.onEntityEntersSector(entity);//добавляем в другой
        //оповещение вьюеров о смене сектора сделано в removeEntityFromSector и в addExistingEntity


    }

    //оповещаем
    var allViewers=this.allViewers
    for (vList in allViewers) {
        var viewers=allViewers[vList]
        for (v in viewers) {
            viewers[v].onEntityPozUpdate(entity);
        }
    }



}



/////////
//работа с соседями
//////////



Sector.prototype.addNeibour= function(neibour){
    this.allNeibours[neibour.id]=neibour;
    this.allEntitys.push(neibour.entitys);
    this.allKeyWords.push(neibour.keyWords);
    this.allViewers.push(neibour.viewers);
}

//добавляем уже существующее ентити из другова сектора. разница в событее  viewers[v].onEntityEntersSector(entity);
Sector.prototype.onEntityEntersSector=function(entity){
    //чтобы добавить энтити нам нужно

    //1 добавить его с список всех сущьностей этого сектора
    this.entitys[entity.id]= entity;

    //2 разнести его по группам
    for (key in entity.keyWords) {
        var arr= this.keyWords[entity.keyWords[key]];
        arr[entity.id]=entity;
        //arr.push(entity);
    }
    //3 сообщить ентити куда оно попало
    entity.sector = this;

    //4 оповестить все вьюеры
    var allViewers=this.allViewers
    for (vList in allViewers) {
        var viewers=allViewers[vList]
        for (v in viewers) {
            viewers[v].onEntityEntersSector(entity);
        }
    }

}


/// разница в событее    viewers[v].onEntityLeavesSector(entity,newSector);
Sector.prototype.onEntityLeavesSector=function(entity,newSector){
    //чтобы удалить энтити нам надо

    //1 удалить из списка ентитей
   delete this.entitys[entity.id]


    //2 удалить из групп
    for (key in entity.keyWords) {
        var arr=this.keyWords[entity.keyWords[key]];
        delete arr[entity.id]
    }

    //3 оповестить всех вьюеров
    var allViewers=this.allViewers
    for (vList in allViewers) {
        var viewers=allViewers[vList]
        for (v in viewers) {
            viewers[v].onEntityLeavesSector(entity,newSector);
        }
    }

}




///////////////////////////////////
///разное/////////////////
////////////////////////////////////////

//xy реальные координаты
Sector.prototype.getSector =function (x,y){

    //trace(x.toString(16),((x &this.sectorMask) >> this.inSectorMask.toString(2).length).toString(16))
    // trace( this.sectorMask.toString(2).length)
    x = (x & this.sectorMask) >> this.inSectorDigit;
    y = (y & this.sectorMask) >> this.inSectorDigit;
    var sectorID = (y << this.sectorDigit) | x;//или наоборот
    return this.allSectors[sectorID];
}

Sector.prototype.getSectorID =function (x,y){
    x = (x & this.sectorMask) >> this.inSectorDigit;
    y = (y & this.sectorMask) >> this.inSectorDigit;
    return  (y << this.sectorDigit) | x;//или наоборот
}

/*/легаси
Sector.prototype.getSector =function (x,y){

    //trace(x.toString(16),((x &this.sectorMask) >> this.inSectorMask.toString(2).length).toString(16))
   // trace( this.sectorMask.toString(2).length)
    x = (x & this.sectorMask) >> this.inSectorMask.toString(2).length;
    y = (y & this.sectorMask) >> this.inSectorMask.toString(2).length;
    var sectorID = (y << (this.sectorMask.toString(2).length>>1)) | x;//или наоборот
    trace(sectorID,x,y)
    return this.allSectors[sectorID];
}

Sector.prototype.getSectorID =function (x,y){
    x = (x & this.sectorMask) >> this.inSectorMask.toString(2).length;
    y = (y & this.sectorMask) >> this.inSectorMask.toString(2).length;
    return  (y << (this.sectorMask.toString(2).length>>1)) | x;//или наоборот
}
 /*/

module.exports = Sector;