/**
 * Created by unagii on 01.06.2016.
 */


/*

это просто обстрактрая сцена
чтоб протестировать движение юнитов
в клиент серверном приложение
на её основе может что то сделаем

 */

MapSceneBase=function(config) {

    //1 собственно сцена
    var  scene=EmptyScene();


    scene.entitys={} //



    // задник и камера

    if (config==null) {
         config = {
            tileSize: 256, //размер тайла
            gridSize: 3 //нечетное число от 3 до...
        }
    }


    scene.bg= new BG(scene,null,config)
    var cameraFocus= new CameraFocus(scene,600,400,config)  //ну вот надо както вычислить параметры экрана
    cameraFocus.showBorder();//рамка

    var conf=new Conf()
    scene.eType = conf.eType;


//готовим список команд// формат. команда фунция контекст
    scene.cmdList=[
        ['onNewEntity',scene.onNewEntity,scene],
        ['onNewEntitys',scene.onNewEntitys,scene],
        ['onRemoveEntity', scene.onRemoveEntity,scene],
        ['onRemoveEntitys', scene.onRemoveEntitys,scene],
        ['onEntityPozUpdate',scene.onMoveEntity,scene],
    ]


///////////////
//события вьюера
///////////

    //новое ентити
    scene.onNewEntity=function(e){ //{e:Array<Int>
        var id = e[0];
        var x= e[1];
        var y= e[2];
        var type= e[3];

        var color = this.eType[type].color;

        if ( this.entitys[id]==null){
            var atlasName = this.eType[type].textureAtlas;
            var texureName = this.eType[type].texture;

          //  trace(texureName)

            var	view =  new PIXI.Sprite(PIXI.loader.resources[atlasName].textures[texureName])
            view.x = x;
            view.y = y;

            view.scale.x = 0.3;
            view.scale.y = 0.3;

            //units.set(id, view);
            this.entitys[id]=view
            this.addChild(view);
        }

    }

    scene.onNewEntitys= function(arr) {//arr:Array<Array<Int>>
       // trace('new',arr)

         for (key in arr) {
            var e= arr[key]
            var id = e[0];
             if ( this.entitys[id]==null){
                var x= e[1];
                var y= e[2];
                var type= e[3];

                var color = this.eType[type].color;
                 var atlasName = this.eType[type].textureAtlas;
                 var texureName = this.eType[type].texture;

               var	view =  new PIXI.Sprite(PIXI.loader.resources[atlasName].textures[texureName])
                view.x = x;
                view.y = y;
                 view.scale.x = 0.3;
                 view.scale.y = 0.3;

                this.entitys[id]=view;
                this.addChild(view);
            }
        }

    }


    scene.onRemoveEntity= function(id) {
       // trace('rem',id)
        var view = this.entitys[id];
        this.removeChild(view);
        delete this.entitys[id];

    }
    scene.onRemoveEntitys= function(arr) {//arr:Array<Int>
        //trace('rem1',arr)
        for (id in arr){

            var view = this.entitys[arr[id]];
            this.removeChild(view);
            delete this.entitys[arr[id]];
        }
    }

    scene.onMoveEntity=function(arr) {//arr:Array<Int>

      // trace(arr)
        var id = arr[0];
        if ( this.entitys[id] != null) {
            var unit = this.entitys[id];
            unit.x = arr[1];
            unit.y = arr[2];
        }

    }

    scene.onMoveEntitys=function(arr) {//arr:Array<Array<Int>>

        for (key in arr) {
            var e = arr[key]
            var id = e[0];

            // var id = arr[0];
            if (this.entitys[id] != null) {
                var unit = this.entitys[id];
                unit.x = e[1];
                unit.y = e[2];
            }
        }
    }





    return scene

}

