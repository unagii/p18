/**
 * Created by unagii on 28.04.2017.
 */
/*/


просто наводим порядок

/*/

trace=console.log;


PIXI.loader
    .add("client/img/testTexture.json")
    .load(onLoad);

function  onLoad() {


    sceneManager = SceneManager(); //менеджер сцен
    var stage = MapSceneBase();  //сцена
    sceneManager.curentStage = stage


    var socket = io();
    socket.on('hello', function () {
        trace('hello')
    })



    socket.emit('hello')

    document.addEventListener('OnCameraSectorChenge', function(e){
            socket.emit('CameraSectorChenge',[e.x,e.y])
    },
    false);
    document.addEventListener('OnCameraPozChenge', function(e){
           //trace(e)
            socket.emit('OnCameraPozChenge',[e.x,e.y])
        },
        false);


    //переделать!!!
    socket.on('onNewEntity',stage.onNewEntity.bind(stage))// function(a){trace(a)});// a:Dynamic) { };
    socket.on('onNewEntitys',stage.onNewEntitys.bind(stage))// function(a){trace(a)});//a:Array<Dynamic>) { };
    // onNewEntitys
    socket.on('onRemoveEntity', stage.onRemoveEntity.bind(stage))//function(a){trace(a)}) ;//a:Dynamic){};
    socket.on('onRemoveEntitys', stage.onRemoveEntitys.bind(stage))//function(a){trace(a)});//a:Dynamic) { };
    socket.on('onEntityPozUpdate',stage.onMoveEntity.bind(stage))// function(a){trace(a)});

   //

    window.setTimeout(function () {
        socket.emit('map')
    },1000);

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
