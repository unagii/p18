/**
 * Created by unagii on 17.04.2017.
 */

trace=console.log;


//просто запускаем пикси

//нам нужно
/*/
 <script src="./js/pixi.min.js"></script>
 <script src="./js/my/scene/SceneManager.js"></script>
 <script src="./js/my/scene/emptyScene.js"></script>
 <script src="./js/my/scene/test1.js"></script>

 */
sceneManager = SceneManager();
sceneManager.curentStage=Test1();


animate()



//////////////////

function animate() {

    //this.myMap.mapControll.update()



    requestAnimationFrame(animate);
    sceneManager.renderer.render(sceneManager.curentStage);
//trace('sd')
}
