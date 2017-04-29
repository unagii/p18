/**
 * Created by unagii on 20.05.2016.
 */

/*
это контроллер грида
создаёт грид
смещает грид
всё =)
*/



var GridControl=function (tileLayer,gridLayer,TileClass,scene,mapResource) {


    this.mapResource=mapResource


//слой грида
    this.gridLayer=gridLayer;

//тайл леер это слой уже отрендерренных тайлов..  а грида это в базовом пространстве
    this.tileLayer=tileLayer//tileMap.getLayerByName("tiles")
    var gridSize = gridLayer.tileWidth//сколько размер тайла в гриде.. такой и грид же
    this.gridSize=gridSize

    //текущая позиция грида//позиция центрального тайла
        this.pozX=0
        this.pozY=0


    //почемуто только одна офсета.. где вторая?
    this.cellOfSet=  tileLayer.offsetX// и что ето вообще за офсета?


    //ну такбы это должно быть в какомто..  стоп.. нахуя тут размер ячеек??
    //this.cellWidth=//mapParams.CellWidth
    //this.cellHeight=//mapParams.CellHeight

    //создаем grid тайлов//это просто 2д массив. и ваще пох где он расположен
    var grid=[]
    for (var X = 0; X <gridSize ; X++) {
        grid[X] = [];
        for (var Y = 0; Y < gridSize; Y++) {
            var tileParams=tileLayer.getTileRectByPoz(X,Y)
            to = new TileClass(tileParams,scene)
            grid[X][Y]=to
        }
    }
    this.grid=grid;

//бардюры??? тоесть да.. мы не проверяем допустимые границы..  они проверяются в камераФокусе..  эт неправельно же
    this.moveToTile(10,10);


}




GridControl.prototype= {

///просто добавляем на сцену
    addTileGridToStage:function (){

       var gridSize=this.gridSize;
       var  grid=this.grid;

        for (var X = 0; X <gridSize ; X++) {
           for (var Y = 0; Y < gridSize; Y++) {
               // var tileParams=tileLayer.getTileRectByXY(X,Y)
               grid[X][Y].addToStage();
            }
        }

    },


//смещаем куда надо
    moveToTile:function (centrX,centrY)
    {
        //зачем ето???
        this.pozX=centrX;
        this.pozY=centrY ;

        // тут мы получаем данные из слоя грида..
        var gridLayer=this.gridLayer
        var tileRect= gridLayer.getTileRectByPoz(centrX,centrY)
        //и вот как мы их используем..  стоило ли заморачиваться?
        var ofset=tileRect.width>>1

        tileLayer=this.tileLayer

            //бесполезно
      //  var startX=tileRect.x0
      //  var startY=tileRect.y0
      //  var endX=tileRect.x1
      //  var endY=tileRect.y1
        //зазор



        var gridSize=this.gridSize
        var  grid=this.grid;


        for (var X=0 ; X <gridSize ; X++) {

            for (var Y=0 ; Y < gridSize; Y++) {
                 var tileParams=tileLayer.getTileRectByPoz(X+centrX-ofset,Y+centrY-ofset)

                //grid[X][Y].setPozition(tileParams.x0+250*X,tileParams.y0+250*Y)
                grid[X][Y].view.x=tileParams.x0-90
                grid[X][Y].view.y=tileParams.y0-90
                grid[X][Y].mask.x=tileParams.x0
                grid[X][Y].mask.y=tileParams.y0


                this.mapResource.redrawGraphics(grid[X][Y].view,X+centrX-ofset,Y+centrY-ofset);

                //и тут надо бы отрендерить тайл.. но

            }
        }






//ЕРЕСЬ!!!!!!!!

        //grid[x][y].setPozition(tileParams.x0,tileParams.y0)
        ///двигаем карту двигаем карту таким образом чтобы целевой тайл оказался в центре нашей гриды

       // var TileGridSize:int = mapParams.gridSize;
       // var ofset:int = mapParams.gridSize >> 1;
       // var TileWidth:uint=mapParams.TileWidth
       // var TileHeight:uint = mapParams.TileHeiht
       // var cellOfSet:uint=mapParams.CellOfSet
       // var cellWidth:uint=mapParams.CellWidth
       // var cellHeight:uint=mapParams.CellHeight


    //определяем граници поля в котором будем искать
       // var startX=centrX - 2//this.ofset
       // var startY= centrY -2//this.ofset
       // var endX=startX+ this.gridSize
       // var endY=startY+ this.gridSize

        //alert(startX,startY)

//if (startX<mapParams.tileBoundX0)startX= mapParams.tileBoundX0//trace("startX<mapParams.tileBoundX0")
//if (endX > mapParams.tileBoundX1) endX = mapParams.tileBoundX1//trace("endX > mapParams.tileBoundX1")
//if (startY < mapParams.tileBoundY0) startY = mapParams.tileBoundY0//trace("startY < mapParams.tileBoundY0")
//if (endY>mapParams.tileBoundY1) endY=mapParams.tileBoundY1//trace("endY>mapParams.tileBoundY1")

      //  var to:*


    //теперь надо вернуть отработаные тайлы в пул свободных тайлов
    //var buferLength:uint= usedTils.length
   // for (var I = 0; I < this.usedTils.length;I++ ) {
    //    if (this.usedTils[I].globalPozX < startX || this.usedTils[I].globalPozX > endX || this.usedTils[I].globalPozY < startY || this.usedTils[I].globalPozY > endY) {

        //trace(usedTils[I].globalPozX,usedTils[I].globalPozY)

            //to = usedTils[I]//берем отработанный тайл
         //   to=this.usedTils.pop(I)
         //   this.mapField[to.globalPozX][to.globalPozY] = null//убираем его с поля
         //   this. freeTils.push(to) //и запихиваем его в свободные тайлы
            //to.clearTexture  //добавить отчистку текстур
            //to.removeFromStageCitrus(mapParams.parent) //АБСТРАГИРОВАТЬ
          //  to.globalPozX=-10
          //  to.globalPozY=-10
     //   }
//    }

//	trace(usedTils.length,freeTils.length)

       // alert(JSON.stringify(this.mapField))
//цикл для заданного промежутка поля
      //  for (var X = startX; X < endX;X++ ) {
        //    for (var Y = startY; Y < endY; Y++ ) {
                //если ничего не находим..
          //      if (this.mapField[X][Y] == null) {
             //       to= this.freeTils.shift()	//берем первый свободный тайл

              //      this. mapField[X][Y]=to //пехаем его в поле
               //     this. usedTils.push(to) //пехаем его в пул использованых тайлов.. чтоб не потерять
//
                //    to.globalPozX = X //сообщаем в какие координаты его впихнули
                //    to.globalPozY = Y
                    //to.setPosition(X * (TileWidth - 1),0, Y * (TileHeight - 1))//задаём ему позицию на экране ..со смещениев в 1 пиксель чтоб небыло видно ребер
                //    to.setPosition(X ,0, Y )//задаём ему позицию на экране ..со смещениев в 1 пиксель чтоб небыло видно ребер
                  //  mapResource.renderTile(to)//и посылаем в рендер
                    //to.addToStageCitrus(mapParams.parent) //и добавляем его на сцену..  ПОПРАВИТЬ!!!

                    //trace(X * (TileWidth - 1), Y * (TileHeight - 1))

             //   }
          //  }
       // }
    },





toString: function () {

        var s =
            "количество тайлов в гриде: "+ this.gridSize+"\n"+
            "ширина,высота грида: "+ (this.gridSize* this.tileLayer.tileWidth)+"," +(this.gridSize* this.tileLayer.tileHeight) +"\n"+
            "текущая позиция,: "+this.pozX+","+this.pozY+"\n"+
            "диапазон тайловX, 0: "+(this.tileLayer.tileCountX-1)+"\n"+
            "диапазон тайловY, 0: "+(this.tileLayer.tileCountY-1)+"\n"+
                //    "высота: "+ this.heiht+"\n"+
            " ";
        return s

    }
}