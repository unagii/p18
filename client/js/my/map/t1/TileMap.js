/**
 * Created by unagii on 15.05.2016.
 */





//Класс TileMap
var TileMap=function (config) {

    this.width=config.width;
    this.height=config.height;

    this.layersArray=[];
    this.layersObject={};
    this.addLayer("base",1,1,0,0);

}
TileMap.prototype={



    addLayer:function (name, tileSizeX, tileSizeY,offsetX,offsetY){
        var layer=new Layer(this,name, tileSizeX, tileSizeY,offsetX,offsetY);
        this.layersArray.push(layer);
        this.layersObject[name]=layer
    },


    getLayerByID:function (id)
    {
        return this.layersArray[id];
    },

    getLayerByName:function (name)
    {
        return this.layersObject[name];
    },

    getTileRectByPoz:function (layerName,pozX, pozY)
    {
        return	this.layersObject[layerName].getTileRectByPoz(pozX,pozY);
    },

    getTileRectXY:function(layerName,X, Y)
    {
        return	this.layersObject[layerName].getTileRectXY(X,Y);
    },

    getTileRectPozToPoz:function (layerName,pozX, pozY,layerName2)
    {
        var tile=this.layersObject[layerName].getTileRectByPoz(pozX,pozY)
        return this.layersObject[layerName2].getTileRectXY(tile.x,tile.y)
    },

    toString:function(){

        var s=
            "ширина: "+ this.width+"\n"+
            "высота: "+ this.heiht+"\n"+
            "количество слоёв: "+ this.layersArray.length+"\n"+
            " ";
        return s

    }


}



//Класс Layer
var Layer = function Layer(tileMap_,name_, tileSizeX_, tileSizeY_,offsetX_,offsetY_){

    this.tileMap = tileMap_;
    this.id=this.tileMap.layersArray.length;
    this.name=name_;

//ризмеры тайла в базовом слое..  тоесть сколько базовых едениц оно вмещает
    this.tileWidth=tileSizeX_;
    this.tileHeight=tileSizeY_;

    //это заступ.  если с отрицательным значением то отступ
    this.offsetX=offsetX_;
    this.offsetY=offsetY_;

    //определяем сколько тайлов вмещает наш слой
    if (this.id == 0) {
        this.sizeX=this.tileMap.width;
        this.sizeY=this.tileMap.height;
    }else {
        this.sizeX=this.tileMap.width/(this.tileWidth-this.offsetX);
        this.sizeY=this.tileMap.height/(this.tileHeight-this.offsetY);
    }

}

Layer.prototype= {
       getTileRectByPoz: function (pozX, pozY) {
        var tile = {};
        //это координаты тайла в текущем слое
           tile.pozX = this.pozX;
           tile.pozY = this.pozY;


           // это тоже в базовом слое
           tile.width = this.tileWidth;
           tile.height = this.tileHeight;

        //это коорденаты в базовом слое
        tile.x0 = pozX * (this.tileWidth - this.offsetX);
        tile.y0 = pozY * (this.tileHeight - this.offsetY);
        tile.x1 = tile.x0 + this.tileWidth;
        tile.y1 = tile.y0 + this.tileHeight;
        tile.x = tile.x0 + this.tileWidth / 2;
        tile.y = tile.y0 + this.tileHeight / 2;
        return tile
    },

    getTileRectByXY: function (X, Y) {

        var pozX=X/(this.tileWidth-this.offsetX);
        var pozY=Y/(this.tileHeight-this.offsetY);
        var tile = {};
        tile.pozX = this.pozX;
        tile.pozY = this.pozY;
        tile.width = this.tileWidth;
        tile.height = this.tileHeight;
        tile.x0 = pozX * (this.tileWidth - this.offsetX);
        tile.y0 = pozY * (this.tileHeight - this.offsetY);
        tile.x1 = tile.x0 + this.tileWidth;
        tile.y1 = tile.y0 + this.tileHeight;
        tile.x = tile.x0 + this.tileWidth / 2;
        tile.y = tile.y0 + this.tileHeight / 2;
        return tile
    },


    toString:function(){

        var s=
            "слой id: "+this.id+" имя: "+this.name+"\n"+
            "количество тайлов X: "+this.sizeX+"\n"+
            "количество тайлов Y: "+this.sizeY+"\n"+
            "размер тайла X Y: "+this.tileWidth+" " +this.tileHeight+"\n"+
            "офсеты X Y: "+this.offsetX+" " +this.offsetY+"\n"+
            " "
        return s

    }

}
