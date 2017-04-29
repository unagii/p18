/**
 * Created by unagii on 20.04.2017.
 */



MapEntityView= function (color,texture) {
    if (texture==null)  var view= new PIXI.Sprite(PIXI.Texture.EMPTY)
    else var view= new PIXI.Sprite(texture)

    view.pivot.x = view.width / 2;//130;
    view.pivot.y = view.height;//250;


    var radius= new PIXI.Graphics();
    radius.lineStyle(4, color);
    //radius.drawCircle(pivot.x, pivot.y, 100);
    radius.drawCircle(pivot.x, pivot.y, 20);
    view.addChild(radius);

    view.scale.x = 0.3;
    view.scale.y = 0.3;

}