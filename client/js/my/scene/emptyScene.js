/**
 * Created by unagii on 18.04.2017.
 */




function EmptyScene() {


    var  scene= new PIXI.Container();

    scene.toUpdate=[]//массив ис функций

//trace(scene.update)
    scene.update= function (){

        var f=null;
        for (f in this.toUpdate){
            this.toUpdate[f]();
            //f();
        }

    }



    return scene;
}

