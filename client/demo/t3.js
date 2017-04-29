/**
 * Created by unagii on 20.04.2017.
 */

trace=console.log;


//тест карты.. основные функции

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

    //добавляем ентити по одному
    stage.onNewEntity([0,0,0,0])
    stage.onNewEntity([1,300,500,0])

    //добавляем ентити группой
    stage.onNewEntitys([ [2,100,200,0],
                        [3,200,200,0],
                        [4,300,200,0]
    ])

    //удаление
   // stage.onRemoveEntity(1)
  //  stage.onRemoveEntitys([1,2,3])

    //смещение
    stage.onMoveEntity([4,-100,0])


   // var s=new PIXI.Sprite(PIXI.loader.resources["../img/testTexture.json"].textures["Angel.ico"])



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
