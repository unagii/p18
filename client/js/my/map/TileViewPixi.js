/**
 * Created by unagii on 01.06.2016.
 */



//эта штука работает на основе графики..
/*

и работает она хитро
надо сделать на основе тысячи спрайтов..
ну и на основе текстурки для сравнения
но!
чтобы у всех был универсальный интерфейс

 */




var TileViewPixi=function (tileParams,scene) {

    this.scene=scene;
    this.view = new PIXI.Graphics()
    this.view.x=tileParams.x0//*50
    this.view.y=tileParams.y0//*50

    //расписать длядь нормально!!!!!!!
    this.params=tileParams;

    //this.view.alpha=0.5

    var mask= new PIXI.Graphics()
    this.mask=mask;
    mask.isMask=true;
    // mask.clear()
    mask.beginFill(0)//0xffffff);
    mask.drawRect(0,0,420,420)//,,this.graph.tileRect.x0,this.graph.tileRect.x1,this.graph.tileRect.width,this.graph.tileRect.height)
    mask.endFill
    // mask.x=graphics.x
    // mask.y=graphics.y
    this.view.mask=mask;


//alert(tileParams)

    this.setSize( tileParams.width,tileParams.height)


    this.setBlankTexture()


}



TileViewPixi.prototype={

    addToStage:function(){

        this.scene.addChild(this.view);
        this.scene.addChild(this.mask);
    },

    removeFromStageCitrus:function(){



    },



    hide:function (){

    },

    show:function (){

    },

    setSize:function (width,height)
    {
        this.view.width = width;
        this.view.height = height;
    },

    setPozition:function(X,Y){

       this.view.x = X;
       this.view.y = Y;
        this.mask.x = X;
        this.mask.y = Y;
    },


    setBlankTexture:function (){

        this.view.lineStyle(3, 0xff0000, 1)
        this.view.drawCircle(this.params.width/2,this.params.width/2,this.params.width/2)
        //this.view. drawRect(this.params.x1,this.params.y1,this.params.width,this.params.height)
    },






    setTextureFromURL:function (URL){

    },

    setTextureFromAsset:function (asset){

    },

    setTextureFromTexture:function (texture){

    },


    setTextureFromCanvas:function (canvas){


    },


    destroy:function () {

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