/**
 * Created by unagii on 15.05.2016.
 */


/*

эт ваще основа помтроения любых тайловых карт и нетока
суть проблемы разбить люую область на несколько слоёв тайлов
и чтобы блять потом не путаться в координатах и прочем муторстве

 */


//Класс TileMap
var TileMap=function (width,height) {


//сразу обозначим ширину и высоту базового слоя..  ну который будем разбивать
    this.width=width;
    this.height=height;

    //и чтобы получить доступ к слоям мы их будем сохронять в массив и в обьект
    this.layersArray=[];
    this.layersObject={};

    //и сразуже добавим базовый слой хз зачем
    this.addLayer("base",1,1,0,0,null);

}
TileMap.prototype={


//сука всё переименовать к херам надо!! но потом
    addLayer:function (name, tileSizeX, tileSizeY,offsetX,offsetY,baseLayerName){
       //чтобы создать слой нам надо:
       //name - имя слоя
        //tileWidth-ширина тайла
        //tileHeight-высота тайл
        //глубина тайла???  вдруг будем делать воксели??
        //offsetX -заступ. это надо для бесшовных текстур и прочего..  =3
        //offsetY- если отрицательное значение то отступ
        var baseLayer=null;
        if(baseLayerName!=null) baseLayer=this.getLayerByName(baseLayerName);


        var layer=new Layer(this,name, tileSizeX, tileSizeY,offsetX,offsetY,baseLayer);
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
            "ширина, высота "+ this.width+","+ this.height+"\n"+
            "диапазонШ от 0 до "+ (this.width-1)+"\n"+
            "диапазонВ от 0 до "+ (this.height-1)+"\n"+
            "количество слоёв: "+ this.layersArray.length+"\n"+
            " ";
        return s

    }


}



//Класс Layer
var Layer = function Layer(tileMap_,name_, tileWidth, tileHeight,offsetX,offsetY,baseLayer){

    this.tileMap = tileMap_;
    this.id=this.tileMap.layersArray.length;
    this.name=name_;

    //ширина, высота тайла.
    this.tileWidth=tileWidth;
    this.tileHeight=tileHeight;


    //это заступ. отрицательный это отступ
    this.offsetX=offsetX;
    this.offsetY=offsetY;

    //считаем сколько тайлов поместятся в наш слой
    if (baseLayer == null) {
       // this.sizeX=this.tileMap.width;
       // this.sizeY=this.tileMap.height;
        this.tileCountX=this.tileMap.width;
        this.tileCountY=this.tileMap.height;


    }else {
         this.tileCountX=((baseLayer.tileCountX-offsetX)/(this.tileWidth-offsetX))>>0;
         this.tileCountY=((baseLayer.tileCountY-offsetY)/(this.tileHeight-offsetY))>>0;
   }

}

Layer.prototype= {
    //возвращает тайл по его позиции в его слое
       getTileRectByPoz: function (pozX, pozY) {
        var tile = new TileRect();

      //позиция тайла в текущем слое
        tile.pozX = pozX;
        tile.pozY = pozY;
       //ширена высота..
        tile.width = this.tileWidth;
        tile.height = this.tileHeight;
        tile.x0 = pozX * (this.tileWidth - this.offsetX);
        tile.y0 = pozY * (this.tileHeight - this.offsetY);
        tile.x1 = tile.x0 + this.tileWidth-1;
        tile.y1 = tile.y0 + this.tileHeight-1;
        tile.x =  tile.x0 + (this.tileWidth >> 1);
        tile.y =  tile.y0 + (this.tileHeight >> 1);
        return tile
    },

    //возвращает тайл по координатам в базовом слое.. не в его базовом а в базовом базовом..  или в его базовом?
    getTileRectByXY: function (X, Y) {

        var pozX=X/(this.tileWidth-this.offsetX);
        var pozY=Y/(this.tileHeight-this.offsetY);
        var tile = getTileRectByPoz(pozX,pozY);
        //tile.pozX = this.pozX;
        //tile.pozY = this.pozY;
        //tile.width = this.tileWidth;//int
        //tile.height = this.tileHeight;//int
        //tile.x0 = pozX * (this.tileWidth - this.offsetX); //int
        //tile.y0 = pozY * (this.tileHeight - this.offsetY);//int
        //tile.x1 = tile.x0 + this.tileWidth-1;//int
        //tile.y1 = tile.y0 + this.tileHeight-1;//int
        //tile.x = tile.x0 + (this.tileWidth >> 1);
        //tile.y = tile.y0 + (this.tileHeight >> 1);
        return tile
    },


    toString:function(){

        var s=
            "слой id: "+this.id+" имя: "+this.name+"\n"+
            "количество тайлов X: "+this.tileCountX+"\n"+
            "количество тайлов Y: "+this.tileCountY+"\n"+
            "размер тайла X Y: "+this.tileWidth+" " +this.tileHeight+"\n"+
            "офсеты X Y: "+this.offsetX+" " +this.offsetY+"\n"+
            " ";
        return s

    }

}




//Класс TileRect
var TileRect = function Layer(){
    this.pozX = 0;//this.pozX;
    this.pozY =0;// this.pozY;
    this.width = 0;//this.tileWidth;
    this.height = 0;//this.tileHeight;
    this.x0 = 0;//pozX * (this.tileWidth - this.offsetX);
    this.y0 = 0;//pozY * (this.tileHeight - this.offsetY);
    this.x1 = 0;//tile.x0 + this.tileWidth;
    this.y1 =0; //tile.y0 + this.tileHeight;
    this.x =0; //tile.x0 + this.tileWidth / 2;
    this.y = 0;//tile.y0 + this.tileHeight / 2;
}

TileRect.prototype= {
//тут ещё можно чего нить посчитать типа площади.. количества элементов тайла и прочего

toString:function(){

    var s=
        "позиция тайла в текущем слое "+this.pozX+","+this.pozY+"\n"+
        "ширина, высота "+ this.width+","+ this.height+"\n"+
        "координаты нулевого элемента "+this.x0+","+this.y0+"\n"+
        "координаты центрального элемента "+this.x+","+this.y+"\n"+
        "координаты последнего элемента "+this.x1+","+this.y1+"\n"+
        " "
    return s

}

}