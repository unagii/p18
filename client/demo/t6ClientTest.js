/**
 * Created by unagii on 26.04.2017.
 */


trace=console.log;


//тестируем работу клиент менеджера

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


    sceneManager = SceneManager(); //менеджер сцен
    var stage = MapSceneBase();  //сцена
    sceneManager.curentStage = stage

    //тестируем


    var socket = io();
    socket.on('hello', function () {
        trace('hello')
    })





    socket.emit('hello')
