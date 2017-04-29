/**
 * Created by unagii on 19.04.2017.
 */





function CameraView(camera) {


    var size = 6;

    //this.t:Text;
    // this. t2:Text;
    var  view= new  PIXI.Sprite(PIXI.Texture.EMPTY);

    view.camera = camera;

    var  frame= new PIXI.Graphics();
    frame.lineStyle(3, 0x0000ff);
    frame.moveTo(-128, -128);
    frame.lineTo(128, -128);
    frame.lineTo(128, 128);
    frame.lineTo(-128, 128);
    frame.lineTo(-128, -128);
    frame.drawCircle(0, 0, 5);
    view.addChild(frame)

    var t = new PIXI.Text("tile");
    t.style.fill = '#0000ff';
    t.resolution = 2;
    t.x = size>>1;
    t.y = size>>1;
    view.addChild(t);

    var t2 = new  PIXI.Text("tile");
    t2.style.fill = '#0000ff';
    t2.resolution = 2;
    t2.x = size>>1;
    t2.y = size>>1;
    view.addChild(t2);

    view.update= function(){

        t2.text = this.x + ':' +this.y;
        t2.x = (size>>1) - t2.width / 2;
        t2.y = (size>>1)  ;

        t.text = this.camera.sectorX + ':' + this.camera.sectorY;
        t.x = (size>>1) - t.width / 2;
        t.y = (size>>1) - t.height ;

    }


    return view;
}