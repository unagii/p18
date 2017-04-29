/**
 * Created by unagii on 23.04.2017.
 */

/**
 * Created by unagii on 21.04.2017.
 */



trace=console.log;


//тестируем карту.. на сервере t1

//нам нужно
/*/

 <script src="../js/pixi.min.js"></script>




 <script src="../js/my/scene/SceneManager.js"></script>
 <script src="../js/my/scene/emptyScene.js"></script>

 <script src="../js/my/scene/mapSceneBase.js"></script>
 <script src="../js/my/scene/mapTest/bg.js"></script>
 <script src="../js/my/scene/mapTest/bgTileView.js"></script>
 <script src="../js/my/scene/mapTest/cameraFocus.js"></script>
 <script src="../js/my/scene/mapTest/cameraView.js"></script>
 <script src="../js/my/scene/mapTest/mapEntityView.js"></script>

 <script src="../js/my/utils/keyboard.js"></script>
 <script src="../js/my/utils/config.js"></script>
 */


PIXI.loader
    .add("../img/testTexture.json")
    .load(onLoad);

function  onLoad() {



    sceneManager = SceneManager(); //менеджер сцен
    var stage=MapSceneBase();  //сцена
    sceneManager.curentStage=stage

    //тестируем


    var socket=io();
    socket.on('hello',function () {
        trace('hello')
    })
   // socket.on('onNewEntitys',stage.onNewEntitys.bind(stage))
    //socket.on('onMoveEntitys',stage.onMoveEntitys.bind(stage))

    socket.on('onNewEntity',stage.onNewEntity.bind(stage))// function(a){trace(a)});// a:Dynamic) { };
    socket.on('onNewEntitys',stage.onNewEntitys.bind(stage))// function(a){trace(a)});//a:Array<Dynamic>) { };
              // onNewEntitys
    socket.on('onRemoveEntity', stage.onRemoveEntity.bind(stage))//function(a){trace(a)}) ;//a:Dynamic){};
    socket.on('onRemoveEntitys', stage.onRemoveEntitys.bind(stage))//function(a){trace(a)});//a:Dynamic) { };
    socket.on('onEntityPozUpdate',stage.onMoveEntity.bind(stage))// function(a){trace(a)});





//всё
    animate()
}




//////////////////

function animate() {

    //this.myMap.mapControll.update()

    sceneManager.curentStage.update();

    requestAnimationFrame(animate);
    sceneManager.renderer.render(sceneManager.curentStage);
//trace('sd')
}
