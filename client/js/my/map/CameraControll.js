/**
 * Created by unagii on 27.05.2016.
 */

/*

этокороче контроллек камеры..
на самом деле нет
это контроллер фокуса камеры

надо передать ему камеру..  или фокус уамеры.. както так
потом он значит будет ловить события клавы и дергать камеру
ну и колесика для зума и там разное

после того как он ето поймает он должен сдвинуть камеру, фокус
и самое важное контролировать фокусныый тайл ага

тоесть ему понадобится ещё тайл мапа и грид контроллер

 */




var CameraController=function (tileLayer,gridControll,camera) {
// create a basic BJS Scene object


//это внешний обьект камера..
    this.camera=camera;




    this.grid=gridControll

        //this.tileMap=tileMap
    // ну на самом деле слой тайлов ему понадобится наверное
    this.tileLayer=tileLayer//слой тайлов
    this.tileWidth=tileLayer.tileWidth//ширина тайла
    this.tileHeiht=tileLayer.tileHeight//высота тайла
    this.cameraFocusPoz={"x":0,"y":0}//позиция фокуса камеры в пикселях
    this.cameraFocusTile={"x":0,"y":0}//это координаты тайла который сейчас в фокусе
    this.cameraFocusTileReal={"x":0,"y":0}// а ето реальные координаты тайла который должен бы быть в фокусе но нельзя



    ///огранечения камеры в тайлах
    this.tileBoundX0=gridControll.gridSize>>1        //и да..  проблема с гридом.. тоесть этож в грид контроллере данные да?
    this.tileBoundY0=gridControll.gridSize>>1
    this.tileBoundX1=tileLayer.tileCountX-this.tileBoundX0-1//почему -1????  //ну и гдето тут должен же учитываться размер грида не?
    this.tileBoundY1=tileLayer.tileCountY-this.tileBoundY0-1

 //   window.addEventListener("keydown", this.onKeyDown);









//this.ttt(cameraFocus)
   //ну и гдето тут должно прописыватся событие
    //или гдето ещё.. но логично былобы чтоб гдето рядом да?

}

//суть проблемы очевидна! координаты мереются в пикселях вот
//проблемка 2.. тащемто я неуверен что тайлы спавнятся по центу ..  и должны ли они там спавнится я хз
    //ну и нет никакова воздействия на камеру ваще.. там както через камеру фокус делалось но блин нам надо четко выверенная логика же
CameraController.prototype= {

    cameraPozUpdate:function(X,Y){


        this.camera.x= X//2//10
        this.camera.y=Y//2//10
        /*/
        //ограничения
        if (X < this.tileBoundX0) X=this.tileBoundX0;
        if (X > this.tileBoundX1) X = this.tileBoundX1;
        if (Y < this.tileBoundY0) Y=this.tileBoundY0;
        if (Y > this.tileBoundY1) Y = this.tileBoundY1;

        this.grid.moveToTile(X,Y);

        camera.position.x=X
        camera.position.z=Y
        /*/ //проблемка тут в относительных координатах да
        //второй вариант.. ищем ближайший возможный тайл и рендерим там
        var newCameraFocusPozX = X//cameraFocus.x;
        var newCameraFocusPozY = Y//cameraFocus.y;
        var newCameraFocusTileX=0;
        var newCameraFocusTileY=0;


//

    //вычисляем координаты нового тайла
        newCameraFocusTileX= newCameraFocusPozX/ this.tileWidth>>0;//Math.round(newCameraFocusPozX/ this.tileWidth);
        newCameraFocusTileY = newCameraFocusPozY / this.tileHeiht>>0 ;//Math.round(newCameraFocusPozY / this.tileHeiht);

        document.getElementById("qqq").value="dc"+newCameraFocusTileX+","+newCameraFocusTileY

    //а стоит ли заморачиватся? может наш текущий тайл не изменился?
        if (newCameraFocusTileX != this.cameraFocusTileReal.x || newCameraFocusTileY != this.cameraFocusTileReal.y) {
    //сразуже обновляем реальные координаты камеры.. фокуса тайла
            this.cameraFocusTileReal.x = newCameraFocusTileX;
            this. cameraFocusTileReal.y = newCameraFocusTileY;

    //если одна из координат вышла за границы..  надо её пересчитать
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




}