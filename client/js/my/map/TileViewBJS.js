
//
var TileViewBJS=function (scene) {

    this.scene=scene;
    this.view = BABYLON.Mesh.CreateGround('tile', 1, 1, 1, scene);
    this.view.rotation=new BABYLON.Vector3(0,0,0)
    // alert(JSON.stringify(this.view))
    //this.view = new pc.Entity();
    //this.view.addComponent("model", {
    //    type: "box" //asset,box,capsule,sphere,Cylinder,Cone,Plane
    //});

    //убрать всё нах!!!
    var materialSphere1 = new BABYLON.StandardMaterial("texture1", scene);
      materialSphere1.diffuseTexture = new BABYLON.Texture("assets/00.png", scene);
    materialSphere1.alpha=0.5
    this.view.material = materialSphere1;
   // materialSphere1.wireframe = true;
}



TileViewBJS.prototype={



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
       // app.root.addChild(this.view);

        //app.root.removeChild(this.view)
    },


    hide:function (){
       //this.view.model.enabled=false;

        //app.root.removeChild(this.view)
    },

    show:function (){
       // this.view.model.enabled=true;

        //app.root.removeChild(this.view)
    },


    setPosition:function (X,Y,Z){
        this.view.position.x=X
        this.view.position.y=Y
        this.view.position.z=Z
    },

    setLocalPosition:function (X,Y,Z){
       // this.view.setLocalPosition(X,Y,Z)
    },

    moveTo:function (X,Y,Z){
        this.view.position.x+=X
        this.view.position.y+=Y
        this.view.position.z+=Z
    },

    moveToLocal:function (X,Y,Z){
       // this.view.translateLocal(X,Y,Z)
    },


    setLocalScale:function (X,Y,Z) {
       // var scale = new pc.Vec3(X, Y, Z);
       // this.view.setLocalScale(scale);
    },

    rotate :function (X,Y,Z) {
     //   var scale = new pc.Vec3(X, Y, Z);
       // this.view.setEulerAngles(scale);
       // this.view.rotate(X,Y,Z)
        //както так
        //this.view.rotation = new BABYLON.Vector3(0, Math.PI/2, 0);
        //или так
        this.view.rotation.x  =  X;
        this.view.rotation.y  =  Y;
        this.view.rotation.z  =  Z;
    },

    rotateLocal :function (X,Y,Z) {
       // var scale = new pc.Vec3(X, Y, Z);
      //  this.view.setLocalEulerAngles(scale);
    //  this.view.rotateLocal(X,Y,Z)
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