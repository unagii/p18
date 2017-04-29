/**
 * Created by unagii on 19.04.2017.
 */

/**
 *
 суть этого класса
 двигать фокус камеры..
 смещать камеру к нему
 и информировать грид контроллер о том что надобы сдвинуть грид//BG
 всё!

 * @author Unagii
 */


function CameraFocus(stage, centrX,centrY,config) {

    if (config == undefined){//конфиг //тотже что и для bg
        config={
            tileSize:16, //размер тайла
            gridSize:9 //нечетное число от 3 до...

        }
    }

    //настройки
    this.x=0;
    this.y=0;
    this.vx=0;
    this.vy=0;
    this.centrX=centrX;
    this.centrY=centrY;
    this.gridDigit =  (config.tileSize-1).toString(2).length//8;//TODO вынести в конфиг или переделать
    this.sectorX = this.x >> this.gridDigit;
    this.sectorY = this.y >> this.gridDigit;
    this.scene=stage;

    //кнопки
    this.left = new KeyboardJS(37);
    this.up = new KeyboardJS(38);
    this.right = new KeyboardJS(39);
    this.down = new KeyboardJS(40);

    //добавляемся в апдейт
    this.update=this.updateByKeyboard.bind(this)
    this.scene.toUpdate.push(this.update);

    //рамка
    this.cameraView = new CameraView(this);


    //событее //
    var event = new Event('OnCameraSectorChenge');
    event.x=this.x
    event.x=this.y
    event.sectorX = this.x>>this.gridDigit;//((this.x&0xf00) >> 8);
    event.sectorY = this.y>>this.gridDigit;//((this.y&0xf00) >> 8);
    document.dispatchEvent(event);

}

// ручное управление камерой
CameraFocus.prototype.updateByKeyboard=function() {


    //скорость.. да она вычисляется както хитро
    this.vx =(this.right.isDown-this.left.isDown)<<0x2;
    this.vy =(this.down.isDown-this.up.isDown)<<0x2;

    //смещаем фокус камеры
    this.x += this.vx;
    this.y += this.vy;

    //смещаем контейнер
    this.scene.x = this.centrX-this. x;
    this.scene.y = this.centrY-this.y;

    // а стоит ли смещать бг?
   // var sectorX=this.sectorX
   // var sectorY=this.sectorY
   // var gridDigit=this.gridDigit


    var newSectorX=this.x>>this.gridDigit;
    var newSectorY=this.y>>this.gridDigit;
   // trace(newSectorX,this.sectorX)
    if (this.vx != 0 || this.vy != 0 ) {
        var event = new Event('OnCameraPozChenge');
        event.x = this.x
        event.y = this.y
        // event.sectorX = newSectorX;//this.x>>this.gridDigit;//((this.x&0xf00) >> 8); //не работает с отрицательными числами
        // event.sectorY = newSectorY;//this.y>>this.gridDigit;//((this.y&0xf00) >> 8);
        document.dispatchEvent(event);
    }
    if (this.sectorX != newSectorX || this.sectorY != newSectorY ) {

        this.sectorX = newSectorX;
        this.sectorY = newSectorY;

        var event = new Event('OnCameraSectorChenge');
        event.x=this.x
        event.y=this.y
        event.sectorX = newSectorX;//this.x>>this.gridDigit;//((this.x&0xf00) >> 8); //не работает с отрицательными числами
        event.sectorY = newSectorY;//this.y>>this.gridDigit;//((this.y&0xf00) >> 8);
        document.dispatchEvent(event);
     }

    //и обновляем рамку
    this.cameraView.x =this.x;
    this.cameraView.y =this.y;
    this.cameraView.update();
}


//TODO сделать
//камера следует за целью
CameraFocus.prototype.updateByTarget=function() {

    //смещаем контейнер
    scene.x = this.centerX-this.target.x;
    scene.y = this.centerY-this.target.y ;

    //смещаем бг
    var xx = this.target.x;// - 0x200);
    var yy = this.target.y;// - 0x200);

    if (sectorX != (xx >> gridDigit) || sectorY != (yy >> gridDigit) ) {

        sectorX = (xx >> gridDigit);
        sectorY = (yy >> gridDigit);


      //  var evt:OnCameraSectorChenge = new OnCameraSectorChenge(xx, yy);
       // Event.dispatch(evt);
        // sectorUpdaded(sectorX, sectorY);

    }

    //смещаем рамку
    cameraView.x = target.x;
    cameraView.y = target.y;


    cameraView.update();
}

CameraFocus.prototype.follow=function(target) {
    this.target = target;
    this.update = updateByTarget;
}

CameraFocus.prototype.release=function() {

    //запоменаем координаты
    this.x = target.x;
    this.y = target.y;

    //востанавливаем режим следовать по клавиатуре
    this.update = updateByKeyboard;
}


//// показывать рамку или нет
CameraFocus.prototype.showBorder=function() {
    this.scene.addChild(this.cameraView);
}

CameraFocus.prototype.hideBorder=function() {
    this.scene.removeChild(this.cameraView);
}
