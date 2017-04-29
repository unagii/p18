/**
 * Created by unagii on 01.06.2016.
 */

/*
суть этого класса
двигать фокус камеры..
смещать камеру к нему
и информировать грид контроллер о том что надобы сдвинуть грид
всё!
 */


var CameraFocus=function(tileLayer,gridControll,camera,stage) {

    //для этого нам понадобится
    //1 камера
    this.camera = camera;

    //2 грид.. мы будем его двигать
    this.grid=gridControll



    //какието параметры..  это надо ля проверки
    //this.tileLayer=tileLayer//слой отрендеренных тайлов
    this.tileWidth=tileLayer.tileWidth//ширина тайла
    this.tileHeiht=tileLayer.tileHeight//высота тайла
    this.cameraFocusPoz={"x":0,"y":0}//позиция фокуса камеры в пикселях
    this.cameraFocusTile={"x":0,"y":0}//это координаты тайла который сейчас в фокусе
    this.cameraFocusTileReal={"x":0,"y":0}// а ето реальные координаты тайла который должен бы быть в фокусе но нельзя

    ///огранечения камеры в тайлах
    this.tileBoundX0=gridControll.gridSize>>1
    this.tileBoundY0=gridControll.gridSize>>1
    this.tileBoundX1=tileLayer.tileCountX-this.tileBoundX0-1//почему -1????  //ну и гдето тут должен же учитываться размер грида не?
    this.tileBoundY1=tileLayer.tileCountY-this.tileBoundY0-1
        //и на этом всё


//далее нам понадобятся:

    //некий графический обьект за которым будет бегать камера
    this.displayObject = new PIXI.Graphics();
    var displayObject= this.displayObject
    // просто нарисуем кружок.  если обьект умеет сам себе ставить бланк текстуру то ок..
    //это исключительно для наглядности
    displayObject.width=10
    displayObject.height=10
    displayObject.lineStyle(3, 0xff0000, 1)
    displayObject.drawCircle(5,5,5);

    //добавляем ему параметры ускорения
    displayObject.vx = 0;
    displayObject.vy = 0;

    //и запихнем его в контейнер.. .. либо в сцену либо куда там надо с чем умеет работать камера
    stage.addChild( displayObject );
//всё камера фокус готов
 /////////////////////////////////////////////////


    //создаем кнопки!
    var left = new Keyboard(37);
    var up = new Keyboard(38);
    var right = new Keyboard(39);
    var down =new Keyboard(40);

    this.left = left;
    this.up = up;
    this.right =right;
    this.down =down;

//у кнопок есть две функции нажата и отпущена..  нажатие мы будем проверять в цикле..  а тут будем проверять отпущена ли
    //и при отпуске мы затормазим кота
    //Left arrow key `press` method
    left.press = function() {};

    //Left arrow key `release` method
    left.release = function() {
            displayObject.vx = 0;
    };

    //Up
    up.press = function() {};
    up.release = function() {
           displayObject.vy = 0;
    };

    //Right
    right.press = function() {};
    right.release = function() {
        displayObject.vx = 0;
    };

    //Down
    down.press = function() {};
    down.release = function() {
        displayObject.vy = 0;
    };

}

CameraFocus.prototype= {


    //'это надо добавить в цикл рендера. оно будет исполняться каждый кадр
    update:function() {
        var cat= this.displayObject

        //отслеживаем нажатые кнопки..  ускоряем кота
        if(this.left.isDown && cat.vx!=-10)cat.vx-=2;
        if(this.right.isDown && cat.vx!=10)cat.vx+=2;
        if(this.up.isDown && cat.vy!=-10)cat.vy-=2;
        if(this.down.isDown && cat.vy!=10)cat.vy+=2;


        //смещаем кота..  тоесть фокус камеры =)
        cat.x += cat.vx;
        cat.y += cat.vy;

        //и вызываем смещение камеры..
        this.cameraPozUpdate(cat.x,cat.y)
    },

    cameraPozUpdate:function(X,Y){

//тупо смещаем камеру, не заморачиваемся
        this.camera.x= X//2//10
        this.camera.y=Y//2//10


        //смотрим кудаж мы сместили камеру..
        var newCameraFocusPozX = X//cameraFocus.x;
        var newCameraFocusPozY = Y//cameraFocus.y;
        var newCameraFocusTileX=0; //..это тут не надо.. это тупо иницилизация переменных
        var newCameraFocusTileY=0;



        //вычисляем координаты нового тайла
        newCameraFocusTileX= newCameraFocusPozX/ this.tileWidth>>0;//Math.round(newCameraFocusPozX/ this.tileWidth);
        newCameraFocusTileY= newCameraFocusPozY / this.tileHeiht>>0 ;//Math.round(newCameraFocusPozY / this.tileHeiht);

        //это просто трассировка она нахуй ненужна
        document.getElementById("qqq").value="dc"+newCameraFocusTileX+","+newCameraFocusTileY

        //а стоит ли заморачиватся? может наш текущий тайл не изменился?
        if (newCameraFocusTileX != this.cameraFocusTileReal.x || newCameraFocusTileY != this.cameraFocusTileReal.y) {
            //сразуже обновляем реальные координаты камеры..(в тайлах) фокуса тайла
            this.cameraFocusTileReal.x = newCameraFocusTileX;
            this.cameraFocusTileReal.y = newCameraFocusTileY;

            //если одна из координат вышла за границы.. просто возвращаем её в границы..
            if (newCameraFocusTileX < this.tileBoundX0) newCameraFocusTileX=this.tileBoundX0;
            if (newCameraFocusTileX > this.tileBoundX1) newCameraFocusTileX = this.tileBoundX1;
            if (newCameraFocusTileY < this.tileBoundY0) newCameraFocusTileY=this.tileBoundY0;
            if (newCameraFocusTileY > this.tileBoundY1) newCameraFocusTileY = this.tileBoundY1;

            //и тупо здвигает карту
            this.grid.moveToTile(newCameraFocusTileX,newCameraFocusTileY);//moveToTile(newCameraFocusTileX,newCameraFocusTileY)
            this.cameraFocusTile.x = newCameraFocusTileX;//обновляем текучую Х
            this.cameraFocusTile.y = newCameraFocusTileY;//обновляем текучую Y

        }

    }


};















//это хитрый класс отвечающий за работу клавиатуры
var  Keyboard=function(keyCode) {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = function(event) {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };

    //The `upHandler`
    key.upHandler = function(event) {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };

    //Attach event listeners
    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );
    return key;
}
