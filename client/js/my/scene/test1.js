/**
 * Created by unagii on 18.04.2017.
 */




function Test1() {


var  scene=EmptyScene(); //new PIXI.Container();
    var g=new PIXI.Graphics();
    g.lineStyle(4, 0x88ff44);
    g.moveTo(0, 0);
    g.lineTo(100,  0);
    g.lineTo(100, 100);
    g.lineTo(0, 100);
    g.lineTo( 0, 0);
    g.x=200;
    g.y=200;
    scene.addChild(g);

return scene;
}

