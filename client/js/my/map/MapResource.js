/**
 * Created by unagii on 03.06.2016.
 */
/*
эта хрень будет отвечать за ресурсы карты
потому как неизвестно где брать матерьял для тайло
будет ли это чтот прирендеренное либо рендеринг
ну и видемо именно тут буде рендер пастись
ну и какойто кеш возможно тут буде

 */



/*

вариант альтернативного рендеренга
значит создаем порядка 1000 спрайтов

создаем обьект тайл..  и добавляем в него чайлдов..  и это будут деревья там и прочее да
ок
потом тайл смещаются.. спрайты переработываются..  какбы интересно да



 */

var MapResource=function (graph) {

    this.graph=graph



}



MapResource.prototype= {

    getTileTextureAt:function(X,Y){


       /*
        алгаритм такой
        берем значит рисуем грфикс..
            потом конвертим его в текстурку
        да.. полностью графикс
        важно покрасить его в цвета биомов

        потом для блмдь каждого биома
        будем тыкать в нег  элементы..
            конечно эт будет в рендере все
        значит проверка по пяти точкам
        и если веде цвет соответствует нашуму биому то рисуем там да
        ну или записываем элемент в табличку.. може кто потом нарисует
       */


     },



    redrawGraphics:function(graphics,X,Y){

        var graphics1=new PIXI.Graphics();

        this.graph.update(X,Y)

        this.drawCells(graphics,this.graph.cells,1,0xff0000,this)
       // graphics.addChild(graphics1)

       // graphics1.isMask=true;
       // graphics1.clear()
      //  graphics1.beginFill(0)//0xffffff);
      //  graphics1.drawRect(0,0,300,300)//,,this.graph.tileRect.x0,this.graph.tileRect.x1,this.graph.tileRect.width,this.graph.tileRect.height)
       // graphics1.endFill
       // graphics1.x=graphics.x
       // graphics1.y=graphics.y
      // graphics.mask=graphics1;

     //   graphics.addChild(graphics1)

      // alert(graph)

        //graphics1.x=this.graph.tileRect.x0*2
       // graphics1.y=this.graph.tileRect.y0*2
    },

     drawCells:function (graphics,cells,lineWidth,lineColor,self) {
         graphics.clear()
        // graphics.alpha=0.5
        graphics.lineStyle(lineWidth, lineColor,.5)
        // graphics.draw


        var self=this;

        //  cx.beginPath();

        //cx.moveTo(edge.va.x,points[0].y);

        cells.forEach(function(cell) {

            self.drawCell(graphics,cell,self)

        })



    },


     drawCell:function (graphics,cell,self) {




    var halfedges = cell.voronoiData.halfedges;

    var centr=cell.centr;

//var color=Math.random()*100000000
    halfedges.forEach(function (hEdge) {

        var vb=hEdge.edge.vb;
        var va=hEdge.edge.va;
        // graphics.beginPath();

        graphics.beginFill(cell.seed);
        graphics.moveTo(centr.x, centr.y);
        graphics.lineTo(vb.x, vb.y);
        graphics.lineTo(va.x, va.y);
        graphics.endFill()


        })

    }


}