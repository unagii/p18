// Create a PlayCanvas application
var canvas = document.getElementById("playCanvas");
var app = new pc.Application(canvas, {
 mouse: new pc.Mouse(canvas),
 keyboard: new pc.Keyboard(canvas)
});

app.start();





app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
app.setCanvasResolution(pc.RESOLUTION_AUTO);

// Create box entity
var cube = new pc.Entity();
cube.addComponent("model", {
 type: "plane"
});




// создаем камеру
var camera = new pc.Entity();
camera.addComponent("camera", {
 //clearColor: new pc.Color(0.1, 0.1, 0.1)
 clearColor: new pc.Color(0.5, 0.5, 0.8),
 nearClip: 0.3,
 farClip: 11030
});

camera.addComponent("script", {
 scripts: [{
  url: 'camCon.js'// 'first_person_camera.js' //"cameraControl/fps.js"
 }]
});



// освещение
var light = new pc.Entity();
light.addComponent('light', {
 type:"directional",//"point",
 color: new pc.Color(1, 1, 1),
 range: 30
});
light.setPosition( -10, -10, -10);

light.translate(10, 0, 0);

///////////////////////////////////////////////////////////


//cube.model.material.diffuseMap = texture;
//cube.model.material.update()

//app.assets.loadFromUrl("assets/00.png", "texture", function (err, asset) {
//var material = new pc.PhongMaterial();
//material.diffuseMap = asset.resource;
//material.update();

//cube.model.model.meshInstances[0].material = material;
//cube.model.model.meshInstances[1].material = material;//=cube.model.model.meshInstances[0]

//});

var tile2=new TileView()
tile2.setTextureFromURL("asset/00.png");

tile2.addToStage()

var tile=new TileView()



//////////////////////







// ийрархия
app.root.addChild(cube);
app.root.addChild(camera);
app.root.addChild(light);



// Set up initial positions and orientations


camera.setPosition(0, 0, 3);
//camera.addComponent("script", )
light.setEulerAngles(0, 0, 0);

// Register an update event
//app.on("update", function (deltaTime) {


// light.rotate(10 * deltaTime, 20 * deltaTime, 30 * deltaTime);

