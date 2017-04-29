/**
 * Created by unagii on 17.04.2017.
 */

trace=console.log;


//тест задника и камеры

//нам нужно
/*/
 <script src="../js/my/scene/SceneManager.js"></script>
 <script src="../js/my/scene/emptyScene.js"></script>
 <script src="../js/my/scene/test1.js"></script>
 <script src="../js/my/scene/mapTest/bg.js"></script>
 <script src="../js/my/scene/mapTest/bgTileView.js"></script>
 <script src="../js/my/scene/mapTest/cameraFocus.js"></script>
 <script src="../js/my/scene/mapTest/cameraView.js"></script>
 <script src="../js/my/utils/keyboard.js"></script>
 */






sceneManager = SceneManager(); //менеджер сцен
//var stage=Test1();  //сцена
//var stage=EmptyScene();  //неважно какая
//sceneManager.curentStage=stage //можно вообще не указывать

//конфиг для камеры и задника
var config={
    tileSize:256, //размер тайла
    gridSize:3 //нечетное число от 3 до...
}

var bg= new BG(sceneManager.curentStage,null,config)
var cameraFocus= new CameraFocus(sceneManager.curentStage,600,400,config)  //ну вот надо както вычислить параметры экрана
cameraFocus.showBorder();//рамка

//всё
animate()



//////////////////

function animate() {

    //this.myMap.mapControll.update()

    sceneManager.curentStage.update();

    requestAnimationFrame(animate);
    sceneManager.renderer.render(sceneManager.curentStage);
//trace('sd')
}
