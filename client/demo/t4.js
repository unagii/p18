/**
 * Created by unagii on 21.04.2017.
 */



trace=console.log;


//тест io

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

    socket.on('onNewEntitys',stage.onNewEntitys.bind(stage))
    socket.on('onMoveEntitys',stage.onMoveEntitys.bind(stage))

    socket.on('newPoz',function (data) {



        //ctx.clearRect(0,0,1000,1000)
        //ctx.fillText('P',data.x,data.y)


        //for (var i in data ){
        //    var cli=data[i];
        //    ctx.fillText(cli.id,cli.x,cli.y)
       // }
    })




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
