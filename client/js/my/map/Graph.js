/**
 * Created by unagii on 21.05.2016.
 */



//вороной https://github.com/gorhill/Javascript-Voronoi




var Graph=function (size,radius,globalwidth,globalheight,cellOfSet) {



    //рандом генератор//нафик он тут нужен????
         this.rnd= new RND();
         this.rnd.seed=777;



    //настраеваем параметры
        this.size = size;//размер сетки в ячейках
        this.radius = radius;//радиус ячейки
        this.radius2 = radius * 2; //2 радиуса
        this.globalX =1 ;//глобальные координаты.. тайла
        this.globalY =1;
        this.width=size*this.radius2;    //видемо это.. размер области для построения вороного
        this.height=size*this.radius2;
        this.globalwidth=globalwidth; //глобальные размеры карты.. в ячейках же
        this.globalheight=globalheight;
    this.cellOfSet=cellOfSet; //это для краев короче//cellOfSet=2

    //вычислим рандом сид для каждой ячейки. вообще для каждой
    this.noise=this.makeNoise(777);


    //создаем грид
        this.grid = this.makeGrid(); //двумерный массив из ячеек

    //распихиваем точки по векторам
        this.cells = this.makeCellsVector( this.grid);  //ячейки
        this.baseCentrs = this.makeBaseCentrsVector( this.grid);//базовые центры
        this.centrs = this.makeCentrsVector( this.grid);    //смещенные центры
        //inBaseCentrs = makeInBaseCentrsVector(grid);
        this.inCells = this.makeInCellsVector( this.grid, this.cellOfSet); //внутринние ячейки
        //borderBaseCentrs = makeBorderBaseCentrs(grid);
       // borderCentrs	= makeBorderCentrs(grid);

  //симлес да..
    this.tileRect={}
    this.tileRect.x0=this.grid[1][1].baseCentr.x
    this.tileRect.y0=this.grid[1][1].baseCentr.y
    this.tileRect.x1=this.grid[size-cellOfSet+1][size-cellOfSet+1].baseCentr.x
    this.tileRect.y1=this.grid[size-cellOfSet+1][size-cellOfSet+1].baseCentr.y
    this.tileRect.width=this.tileRect.x1-this.tileRect.x0
    this.tileRect.height=this.tileRect.y1-this.tileRect.y0

//alert(JSON.stringify(this.cells))


    //// вектор смещенных пограничных центров
        this.borderCellsU=this.makeBorderCellsU( this.grid, this.cellOfSet);
        this.borderCellsD=this.makeBorderCellsD( this.grid, this.cellOfSet);
        this.borderCellsR=this.makeBorderCellsR( this.grid, this.cellOfSet);
        this.borderCellsL=this.makeBorderCellsL( this.grid, this.cellOfSet);




///убрать!!!!
   // this.setRandomSeeds()
  //  this.makeRandomCentrs();

            //this.centrs=this.makeRandomSites2();
    //this.baseCentrs

    this.voronoi = new Voronoi();
    this.bbox = {xl: 0, xr:  this.width, yt: 0, yb:  this.height}; // xl is x-left, xr is x-right, yt is y-top, and yb is y-bottom// ктож так пишет?
   // this.sites = this.cells;//[ {x: 70, y: 20}, {x: 100, y: 20}, {x: 200, y: 70},{x: 24, y: 170}, {x: 100, y: 120}, {x: 200, y: 120} /* , ... */ ];

    this.diagram;
    this.voronoi.recycle(this.diagram);
    this.diagram = this.voronoi.compute(this.centrs, this.bbox);

///убрать!!!!  да??
    this.attachCellData()

    //diagram.vertices

   // alert(JSON.stringify(this.diagram.cells[0]))

};



Graph.prototype= {



    update:function(globalX,globalY) {

        //globalX,globalY//это координаты тайла.. воть


        //var X, Y;
        //alert(imgData)
        // if (seeds==null) this.setRandomSeeds()
        // else {}///разобратся с форматом сидов и допилить
        //this.setRandomSeeds()
        this.setSeedsFromNoise(globalX,globalY);



        //обновляем значение центров
        this.makeRandomCentrs();
//прикрепляем дату из вороного


       // this.voronoi.recycle(this.diagram);
        this.diagram= this.voronoi.compute(this.centrs, this.bbox)
       // alert (JSON.stringify(this.diagram.cells[5]))
        this.attachCellData()
    },

    updateRandom:function() {

        //globalX,globalY//это координаты тайла.. воть


        //var X, Y;
        //alert(imgData)
        // if (seeds==null) this.setRandomSeeds()
        // else {}///разобратся с форматом сидов и допилить
        this.setRandomSeeds()
        //this.setSeedsFromNoise(globalX,globalY);



        //обновляем значение центров
        this.makeRandomCentrs();
//прикрепляем дату из вороного


        // this.voronoi.recycle(this.diagram);
        this.diagram= this.voronoi.compute(this.centrs, this.bbox)
        this.attachCellData()
    },





    makeGrid:function(){
        var X,Y;
        var offsetX = this.globalX * (this.size -2);//почему тут -2 ??
        var offsetY = this.globalY * (this.size -2);
        var length=this.size;
        var R=this.radius;
        var R2=this.radius2;
        var A=[];
        var rnd=this.rnd;
        var min=-R*0.8;
        var max=R*0.8;

// так как обьект ячейка мне влом записывать в отдельный класс.  весь он будет создаватся тут
        for (X = 0; X < length; X++) {
            A[X]=[];
            for (Y = 0; Y < length; Y++) {
                var C={};
               // C.x =  R + R2 * X;
               // C.y = R + R2 * Y;
                C.x = X;
                C.y = Y;
                C.globalX = offsetX + X;
                C.globalY = offsetY + Y;
                C.baseCentr={};
                C.baseCentr.x = R + R2 * X;
                C.baseCentr.y = R + R2 * Y;
                C.centr={};
                C.centr.x =  C.baseCentr.x;//+rnd.nextIntRange(min,max); //казалось бы. почкму сразу же тут не просчитать
                C.centr.y =  C.baseCentr.y;//+rnd.nextIntRange(min,max); // но нет =)
                C.seed=Math.random()*10000000;// временно// прост надо что то прописать..  можно ноль// потом зделаю нойз

                C. voronoiData={} //суда поместим ячейки которые генерирует вороной..
                // C.setSeed();/// временно
                A[X][Y] = C;
                //centersDictionary[C.centr]=C
            }
        }
        return A
    },



    makeCellsVector:function makeCellsVector(grid)
    {
        var V = [];
        var length=grid.length;
        var X,Y;
        for  (Y= 0; Y < length ; Y++) {
            for  (X = 0; X < length ; X++){
                V.push(grid[X][Y]);
            }
        }
        return V
    },

    makeBaseCentrsVector: function (grid)
    {
        var V=[];
        var length=grid.length;
        for  (var Y=0; Y < length ; Y++) {
            for  (var X=0; X < length ; X++){
                V.push(grid[X][Y].baseCentr);
            }
        }
       // alert(JSON.stringify(grid[4][4].baseCentr))
        return V
    },


    makeCentrsVector:function (grid)
    {

        var V=[];
        var length=grid.length;
        for  (var Y = 0; Y <length ; Y++) {
            for  (var X = 0; X < length ; X++){
                V.push(grid[X][Y].centr);
            }
        }
       // alert(JSON.stringify(V))
        return V
    },

    ///эта штука нужна для одекватного рисования символов.. наверно
    makeInCellsVector:function (grid,cellOfSet)
    {
        var ofset=Math.round(cellOfSet*.5);

        //alert(ofset)
        var V=[];
        var X,Y;
        var length=grid.length-ofset;
        for  (Y = ofset; Y < length ; Y++) {
            for  (X= ofset; X < length ; X++){
                V.push(grid[X][Y]);
            }
        }
        return V
    },


    makeBorderCellsU:function (grid,cellOfSet)
    {
        var V=[];
        var ofset=Math.round(cellOfSet/2)-1;
        var Y=ofset;
        var X=ofset;

        var length=grid.length-ofset;

        for  ( X = ofset; X < length ; X++) {
            V.push(grid[X][Y])
        }

        return V
    },

    makeBorderCellsD: function (grid,cellOfSet)
    {
        var V =[];
        var ofset=Math.round(cellOfSet/2)-1;

        var Y=grid.length-ofset-1;
        var X=ofset;

        var length=grid.length-ofset;

        for  ( X = ofset; X < length ; X++) {
            V.push(grid[X][Y])
        }

        return V
    },


    makeBorderCellsR: function (grid,cellOfSet)
    {
        var V = [];
        var ofset=Math.round(cellOfSet/2)-1;

        var X=grid.length-ofset-1;
        var Y=ofset;

        var length=grid.length-ofset-1;

        for  ( Y = ofset+1; Y < length ; Y++) {
            V.push(grid[X][Y])
        }

        return V
    },

    makeBorderCellsL: function (grid,cellOfSet)
    {
        var V=[];
        var ofset=Math.round(cellOfSet/2)-1;

         var X=ofset;//grid_.length-ofset-1
        var Y=ofset;

        var length=grid.length-ofset-1;

        for  ( Y = ofset+1; Y < length ; Y++) {
            V.push(grid[X][Y])
         }

        return V
    },

    attachCellData: function ()
    {



        var cells=this.cells
        var cellsV=this.diagram.cells
        var length=cells.length



        for  (var I = 0; I < length ; I++) {

            cells[I].voronoiData=cellsV[cells[I].centr.voronoiId]
        }

    },



    //заполняем всю карту случайными цифрами
    makeNoise:function (seed)
    {

        var noise=[]
        var rnd= new RND();
        rnd.seed=seed;

       var width =this.globalwidth; //глобальные размеры карты.. в ячейках же
       var  height= this.globalheight;

    //    this.width=size*this.radius2;    //видемо это.. размер области для построения вороного
     //   this.height

        var X,Y;
        for  (X = 0; X < width ; X++){

            noise[X]=[]
            for  (Y = 0; Y < height ; Y++) {
                noise[X][Y]=rnd.nextIntRange(0,16581375);
            }
        }

       return noise
    },



//исключительно для тестов
    setRandomSeeds:function ()
    {

        var grid=this.grid;
        var size=this.size;
        var X,Y;
        for  (Y = 0; Y < size ; Y++) {
            for  (X = 0; X < size ; X++){
                grid[X][Y].seed=Math.random()*10000000
            }
        }



    },

    setSeeds:function (seeds)
    {



        var grid=this.grid;
        var size=this.size;
        var X,Y;
        for  (Y = 0; Y < size ; Y++) {
            for  (X = 0; X < size ; X++){
                grid[X][Y].seed=[X][Y]
            }
        }
    },

    setSeedsFromNoise:function (X,Y)
    {
        var size=this.size;
        var grid=this.grid;
        var noise=this.noise;

        //это тожесамое прописано в тайл мапе. но нехочу её суда тянуть
        var startX=X * (this.size - this.cellOfSet);
        var startY=Y * (this.size - this.cellOfSet);
        var endX=startX+size;
        var endY=startY+size;
        //alert(startX)

        var X,Y;
        for  (Y =startY; Y < endY ; Y++) {
            for  (X =startX; X < endX ; X++){
                grid[X-startX][Y-startY].seed=noise[X][Y]
            }
        }
    },



    makeRandomCentrs:function () {
        var max=this.radius*0.8
        var min=-max
        var size=this.size;
        var grid=this.grid;
//        var seed;
        var rnd= new RND();

        var X,Y;
        for  (Y = 0; Y < size ; Y++) {
            for  (X = 0; X < size ; X++) {
                rnd.seed= grid[X][Y].seed
                grid[X][Y].centr.x =grid[X][Y].baseCentr.x + rnd.nextIntRange(min,max);
                grid[X][Y].centr.y =grid[X][Y].baseCentr.y + rnd.nextIntRange(min,max);

            }
        }

    },




makeBaseSites:function(){
        var X,Y;
        var offsetX = this.globalX * (this.size -2);//почему тут -2 ??
        var offsetY = this.globalY * (this.size -2);
        var length=this.size;
        var R=this.radius;
        var R2=this.radius2;
        var A=[];

        for (X = 0; X < length; X++) {
            A[X]=[];
            for (Y = 0; Y < length; Y++) {
                var C={};
                 C.x =  R + R2 * X;
                C.y = R + R2 * Y;
                // C.x = X;
                //C.y = Y;
               // C.globalX = offsetX + X;
               // C.globalY = offsetY + Y;
               // C.baseCentr={}
               // C.baseCentr.x = R + R2 * X;
               // C.baseCentr.y = R + R2 * Y;
                //C.setSeed();/// временно
                A[X][Y] = C;
                //centersDictionary[C.centr]=C



            }
        }
        return A
    },



    makeRandomSites:function(){
        var X,Y;
        var offsetX = this.globalX * (this.size -2);//почему тут -2 ??
        var offsetY = this.globalY * (this.size -2);
        var length=this.size;
        var R=this.radius;
        var R2=this.radius2;
        var A=[];
        var rnd=this.rnd;
        var min=-R*0.8;
        var max=R*0.8;

        for (X = 0; X < length; X++) {
            A[X]=[];
            for (Y = 0; Y < length; Y++) {
                var C={};
                C.x =  R + R2 * X+rnd.nextIntRange(min,max);
                C.y = R + R2 * Y+rnd.nextIntRange(min,max);
                // C.x = X;
                //C.y = Y;
                // C.globalX = offsetX + X;
                // C.globalY = offsetY + Y;
                // C.baseCentr={}
                // C.baseCentr.x = R + R2 * X;
                // C.baseCentr.y = R + R2 * Y;
                //C.setSeed();/// временно
                A[X][Y] = C;
                //centersDictionary[C.centr]=C



            }
        }
        return A
    },

    makeRandomSites2:function(){
        var X,Y;
        var offsetX = this.globalX * (this.size -2);//почему тут -2 ??
        var offsetY = this.globalY * (this.size -2);
        var length=this.size;
        var R=this.radius;
        var R2=this.radius2;
        var A=[];
        var rnd=this.rnd;
        var min=-R*0.8;
        var max=R*0.8;

        for (X = 0; X < length; X++) {
            //A[X]=[]
            for (Y = 0; Y < length; Y++) {
                var C={};
                C.x =  R + R2 * X+rnd.nextIntRange(min,max);
                C.y = R + R2 * Y+rnd.nextIntRange(min,max);
                // C.x = X;
                //C.y = Y;
                // C.globalX = offsetX + X;
                // C.globalY = offsetY + Y;
                // C.baseCentr={}
                // C.baseCentr.x = R + R2 * X;
                // C.baseCentr.y = R + R2 * Y;
                //C.setSeed();/// временно
                A.push(C);
                //centersDictionary[C.centr]=C



            }
        }
        return A
    },

//////////////////////////////GET


    getPoligon: function (X,Y)
    {
   /*
    ///возможно поменять х и у местами??
    var polygon=[]
    //	var ZZ:int
   // var Cell:QuadCell
    var grid=this.grid;
    var C=grid[X][Y];


    for each(var E:MEdge in Cell.edges) {

    polygon.push(Cell.centr)
        for each(var P:Point in E.boderPoins){

        polygon.push(P)
        }
    }
        polygon.push(Cell.centr)
        return polygon
        */
    },



    getVertices:function(){// pixelHinting:Boolean=false, scaleMode:String="normal", caps:String=null, joints:String=null, miterLimit:Number=3){
        return this.diagram.vertices;

    },

    getCells:function(){// pixelHinting:Boolean=false, scaleMode:String="normal", caps:String=null, joints:String=null, miterLimit:Number=3){

        //return this.diagram.cells;
        return this.cells;
    },

    getEdges:function(){// pixelHinting:Boolean=false, scaleMode:String="normal", caps:String=null, joints:String=null, miterLimit:Number=3){
        return this.diagram.edges;

        //эйдж {"lSite":{"x":70,"y":20,"voronoiId":0},"rSite":{"x":100,"y":20,"voronoiId":1},"vb":{"x":85,"y":0},"va":{"x":85,"y":70}}

    },


    toString:function(){

        var s=
            "Рисовашки =)"+"\n"+
            " ";
        return s

    }


};


//////////////////////////////////////////////////
////////////