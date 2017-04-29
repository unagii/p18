/**
 * Created by unagii on 04.06.2016.
 */

/*

эта штука обобщает в себе
контейнер,
камеру
гид контроллер
камерафокус
граф
мап ресурсы
ну и там гдето будет рендерер потом
суть.. в сцене будт функция спавн мап..  или спавн мап эт..  и она эту штку запустит




 */


var MapController=function (stage) {

//TODO
    /*
    сделать нормальные опции мира..  но это после того как его запилим полностью
    .разобраться с размерами экрана.. ну и сделать функци ресайз
    *
    * допилить мап ресурсы, допилить рендер, и всяко разно
     */

//1// опции мира..  надо в них разобраться//вообще нахуя они нужны
    var options = {
        screenWidth: 1,
        screenHeight: 1,
       // width: 50,//я нихуя непонял
       // height: 50,
       // centerX: 0,
       // centerY: 0
    }


//2//собственно сам мир
    var world = new pixicam.World(options);
    this.world=world;
    //доп параметры у мира какието стремные/  нахуя этот код тут???????
    //world.setScreenSize(500, 500);
    //world.setSize(5000, 1000);
    //world.setCenter(0, 0);


    stage.addChild(world)

//3// камера.. она создается в мире..
    var camera = world.camera;
    this.camera=camera;

    ///!!!переделать.  позиция камеры должнв быть по центру экрана
    camera.viewCenterX=500 //это куда смотрит камера
    camera.viewCenterY=500//логично бы если бы она смотрела в центр экрана?


//мои компоненты


//0 - входные параметры

    var mapW=100
    var mapH=100
    var ofset=3//это офсета для грида
    var tileSize=7//сколько ячеек в тайле
    var gridSize=5//сколько тайлов надо вывести на экран
    var cellRadius=50//радиус ячейки

// 1 нам понадобится два пространства..  базовое и итоговое

    //определим базовое простратнство
    //оно разбито на 2 слоя.  слой тайлов.. (данные для рендеринга тайлов) и слой грида (это то что мы щас должны рендерить)
    var baseMap=new TileMap(mapW,mapH);
    //создаем слой тайлов
    baseMap.addLayer("tileLayer",tileSize,tileSize,ofset,ofset,"base"); //пока что важно чтоб это был квадрат
    //добавим слой грида //для него базовый слой это слой тайлов..
    baseMap.addLayer("gridLayer",gridSize,gridSize,gridSize>>1,gridSize>>1,"tileLayer"); //
    var tileLayer=baseMap.getLayerByName("tileLayer")//это базовый слой
    var gridLayer=baseMap.getLayerByName("gridLayer")//это слой грида


    //2 создаём граф
    //для этого нам надо .. херня
    var graph=new Graph(tileSize,cellRadius,mapW,mapH,ofset);

//потом мы создаём итоговое пространство
//для этого нам надо знать ширину высоту тайла..  это определяется в графе
    var actualMapW=graph.tileRect.width*tileLayer.tileCountX
    var actualMapH=graph.tileRect.height*tileLayer.tileCountY


    var actualTileMap=new TileMap(actualMapW,actualMapH);
       //и новое пространство мы тоже поделим на слой тайлов.
    actualTileMap.addLayer("actualLayer",graph.tileRect.width,graph.tileRect.height,0,0,"base");
    var actualLayer=actualTileMap.getLayerByName("actualLayer")
        //!!! TODO добавить пространство вороного..  ну суть таже что и обычное только..  короче это надо для позиционирования тайлов


//почему к мап ресурсам подключен граф..  и ваще нахуя тут граф..  понятно что он нужен рендеру.. но вот
    var mapRes=new MapResource(graph)


//2 создаём грид контроллер. чтобы он заработал нам надо слой актуальных тайлов, слой грила, клас тайлов и контейнер в который мы эти тайлы пместим.
    var gridContoller= new GridControl(actualLayer,gridLayer,TileViewPixi,world,mapRes)
    //помещаем тайлы в контейнер
    gridContoller.addTileGridToStage()


    var cameraFocus=new CameraFocus(actualLayer,gridContoller,camera,world);
    this.cameraFocus=cameraFocus;

//ну и вроде как всё..





}

MapController.prototype= {

    getTileTextureAt: function (X, Y) {

    },

    //суда мы пропишем всё чего у нас должно одновлятся
    update:function(){
        this.world.update();
        this.cameraFocus.update();


    }



}

