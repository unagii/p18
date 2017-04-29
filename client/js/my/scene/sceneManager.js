/**
 * это модуль отвечающий за работу сцен
 * сцена это new PIXI.Container();
 * для этого достаточно определить curentScene
 *
 *
 *
 *
 *
 * @author Unagii
 */

function SceneManager() {



   //1Create the renderer
   // var renderer = PIXI.autoDetectRenderer(256, 256);
   var renderer = new PIXI.WebGLRenderer(1200, 800);
   // var renderer = new PIXI.CanvasRenderer(800, 600);
   // var renderer = PIXI.autoDetectRenderer(
   //     256, 256,
   //     {antialias: false, transparent: false, resolution: 1}
   // );
    //настройка рендера
    renderer.view.style.border = "1px dashed black";
    renderer.backgroundColor = 0x061639;
   // renderer.autoResize = true;
   // renderer.resize(512, 512);
   /*/// If you want to make the canvas fill the entire window, you can apply this CSS styling and resize the renderer to the size of the browser window.
        renderer.view.style.position = "absolute";
        renderer.view.style.display = "block";
         renderer.autoResize = true;
        renderer.resize(window.innerWidth, window.innerHeight);
    /*/
    this.renderer=renderer;

    //2Add the canvas to the HTML document
    document.body.appendChild(renderer.view);

    //3Create a container object called the `stage`
    //var stage = new PIXI.Container();
    var stage = EmptyScene();
    this.curentStage=stage
    //Tell the `renderer` to `render` the `stage`
    //renderer.render(stage);





 return this;
}


