
//
var TileView=function () {


    this.view = new pc.Entity();
    this.view.addComponent("model", {
        type: "box" //asset,box,capsule,sphere,Cylinder,Cone,Plane
    });


}



TileView.prototype={



    setTextureFromURL:function (URL){
        var material = new pc.PhongMaterial();
        app.assets.loadFromUrl(URL, "texture",function (err, asset){
            material.diffuseMap = asset.resource;
            material.update();
        });
        this.view.model.model.meshInstances[0].material = material;
    },

    setTextureFromAsset:function (asset){
        var material = new pc.PhongMaterial();
        material.diffuseMap = asset.resource;
        material.update();
        this.view.model.model.meshInstances[0].material = material;
    },

    setTextureFromTexture:function (texture){
       var material = new pc.PhongMaterial();
        material.diffuseMap = texture;//asset.resource;
        material.update();
        this.view.model.model.meshInstances[0].material = material;

       // this.view.model.model.meshInstances[0].material.diffuseMap = texture
      //  this.view.model.model.meshInstances[0].material.update()
    },


    setTextureFromCanvas:function (canvas){

        var texture = new pc.Texture(app.graphicsDevice, { format: pc.PIXELFORMAT_R5_G6_B5, autoMipmap: true });
        texture.setSource(canvas);
        var material = new pc.PhongMaterial();
        material.diffuseMap = texture;//asset.resource;
        material.update();
        this.view.model.model.meshInstances[0].material = material;

    },

    addToStage:function (){
        app.root.addChild(this.view);

        //app.root.removeChild(this.view)
    },


    hide:function (){
       this.view.model.enabled=false;

        //app.root.removeChild(this.view)
    },

    show:function (){
        this.view.model.enabled=true;

        //app.root.removeChild(this.view)
    },


    setPosition:function (X,Y,Z){
       this.view.setPosition(X,Y,Z)
    },

    setLocalPosition:function (X,Y,Z){
        this.view.setLocalPosition(X,Y,Z)
    },

    moveTo:function (X,Y,Z){
        this.view.translate(X,Y,Z)
    },

    moveToLocal:function (X,Y,Z){
        this.view.translateLocal(X,Y,Z)
    },


    setLocalScale:function (X,Y,Z) {
        var scale = new pc.Vec3(X, Y, Z);
        this.view.setLocalScale(scale);
    },

    rotate :function (X,Y,Z) {
     //   var scale = new pc.Vec3(X, Y, Z);
       // this.view.setEulerAngles(scale);
        this.view.rotate(X,Y,Z)
    },

    rotateLocal :function (X,Y,Z) {
       // var scale = new pc.Vec3(X, Y, Z);
      //  this.view.setLocalEulerAngles(scale);
        this.view.rotateLocal(X,Y,Z)
    },

    destroy :function () {

        this.view.destroy();

    },





    toString:function(){

        var s=
       //     "ширина: "+ this.width+"\n"+
        //    "высота: "+ this.heiht+"\n"+
            " ";
        return s

    }


}