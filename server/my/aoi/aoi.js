/**
 * Created by unagii on 22.04.2017.
 */



Sector = require('./sector.js');
AoiViewer = require('./aoiViewer.js');


function Aoi(config){

    this.allSectors=[]
    this.allEntitys={}


    if (config==undefined){
        var config={
            sectorsInMap:16,
            sectorSize:256,
            warparound:true,
            keyWords:['unit','structure','fx','bullet']
        }
    }
    this.config=config

    //маски
    this.idMask=config.sectorsInMap-1;  //0xf // //int
    this.inSectorMask= config.sectorSize-1;//0x0ff //int
    this.sectorMask=this.idMask<<this.inSectorMask.toString(2).length;//0xf00 //int
    this.mapMask=this.sectorMask | this.inSectorMask ;//0xfff //int
    this.inSectorDigit=this.inSectorMask.toString(2).length;
    this.sectorDigit= this.inSectorMask.toString(2).length>>1;




    var numberOfSectors=config.sectorsInMap*config.sectorsInMap
    var allSectors=[]
    for (i=0; i<numberOfSectors;i++) {
        var  s = new Sector(i,config, allSectors);
        allSectors.push(s)
    }
    this.allSectors=allSectors;
    this. linkNeibours();

}



Aoi.prototype.linkNeibours= function () {
    var sectorsInMap=this.config.sectorsInMap
   var allSectors=this.allSectors


    for (y=0; y<sectorsInMap;y++) {
        for (x=0; x<sectorsInMap;x++) {

            var sec=allSectors[(y << this.sectorDigit) | x]
            var id=((y-1) << this.sectorDigit) | (x-1)
            if (allSectors[id]!= undefined) sec.addNeibour(allSectors[id])
            var id=((y-1) << this.sectorDigit) | (x)
            if (allSectors[id]!= undefined) sec.addNeibour(allSectors[id])
            var id=((y-1) << this.sectorDigit) | (x+1)
            if (allSectors[id]!= undefined) sec.addNeibour(allSectors[id])
            var id=((y) << this.sectorDigit) | (x-1)
            if (allSectors[id]!= undefined) sec.addNeibour(allSectors[id])
            var id=((y) << this.sectorDigit) | (x+1)
            if (allSectors[id]!= undefined) sec.addNeibour(allSectors[id])
            var id=((y+1) << this.sectorDigit) | (x-1)
            if (allSectors[id]!= undefined) sec.addNeibour(allSectors[id])
            var id=((y+1) << this.sectorDigit) | (x)
            if (allSectors[id]!= undefined) sec.addNeibour(allSectors[id])
            var id=((y+1) << this.sectorDigit) | (x+1)
            if (allSectors[id]!= undefined) sec.addNeibour(allSectors[id])


        }
    }


}


Aoi.prototype.addNewEntity= function (entity) {
   //TODO энтити с одинаковыми ид но в разных секторах возможны.. это неправельно
    var sec=this.getSector(entity.p.x,entity.p.y)
    sec.addNewEntity(entity);
    this.allEntitys[entity.id]=entity;
}


//xy реальные координаты
Aoi.prototype.getSector =function (x,y){
    x = (x & this.sectorMask) >> this.inSectorDigit;
    y = (y & this.sectorMask) >> this.inSectorDigit;
    var sectorID = (y << this.sectorDigit) | x;//или наоборот
    return this.allSectors[sectorID];
}

Aoi.prototype.getSectorID =function (x,y){
    x = (x & this.sectorMask) >> this.inSectorDigit;
    y = (y & this.sectorMask) >> this.inSectorDigit;
    return  (y << this.sectorDigit) | x;//или наоборот
}







module.exports = Aoi;