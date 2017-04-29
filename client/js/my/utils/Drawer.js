/**
 * Created by unagii on 21.04.2016.
 */
//учисмся рисовашки

var Drawer=function () {


   // var canvas = document.getElementById("test-canvas");
   // var context = canvas.getContext("2d");

   // var cx=context; //контекст
    this.thickness=1
    this.strokColor='#003300'
    this.fillColor='green';


    this.alpha=1

    //pixelHinting:Boolean=false, scaleMode:String="normal", caps:String=null, joints:String=null, miterLimit:Number=3



//тут должна быть своя канва

}



Drawer.prototype= {


    lineStyle:function(thickness, strokColor,fillColor, alpha){// pixelHinting:Boolean=false, scaleMode:String="normal", caps:String=null, joints:String=null, miterLimit:Number=3){
        this.thickness=thickness;
        this.strokColor=strokColor;
        this.fillColor=fillColor;
        this.alpha=alpha;

    },


    drawCircle:function(cx,X,Y,R,stroke,fill) {
        cx.globalAlpha= this.alpha
        cx.beginPath();
        cx.arc(X, Y, R, 0, 2 * Math.PI, false);
        if (fill) {
              cx.fillStyle = this.fillColor;
              cx.fill();
        }
        if (stroke) {
            cx.lineWidth =  this.thickness;
            cx.strokeStyle = this.strokColor;
            cx.stroke();
        }

    },

    drawPoints:function(cx,points,R) {
        cx.globalAlpha= this.alpha
        cx.fillStyle = this.fillColor;

        points.forEach(function(p){

            cx.beginPath();
            cx.arc(p.x, p.y, R, 0, 2 * Math.PI, false);

            cx.fill();


        })



    },


    drawPoints2DArray:function(cx,points,R) {
        cx.globalAlpha= this.alpha
        cx.fillStyle = this.fillColor;

        var length=points.length

        for (X = 0; X < length; X++) {

            for (Y = 0; Y < length; Y++) {

                cx.beginPath();
                cx.arc(points[X][Y].x, points[X][Y].y, R, 0, 2 * Math.PI, false);

                cx.fill();

            }
        }



    },






    drawEdges:function(cx,edges) {
        cx.globalAlpha= this.alpha
        cx.lineWidth =  this.thickness;
        cx.strokeStyle = this.strokColor;

        edges.forEach(function(edge) {
            cx.moveTo(edge.vb.x, edge.vb.y);
            cx.lineTo(edge.va.x, edge.va.y);




        })
        cx.stroke();
    },





    drawLineSegment:function(cx,X0,Y0,X1,Y1) {
        cx.globalAlpha= this.alpha
        cx.moveTo(X0, Y0);
        cx.lineTo(X1, Y1);

        cx.lineWidth =  this.thickness;
        cx.strokeStyle = this.strokColor;
        cx.stroke();


    },

    drawLineSegment2:function(cx,p1,p2) {
        cx.globalAlpha= this.alpha
        cx.moveTo(p1.x, p1.y);
        cx.lineTo(p2.x, p2.y);

        cx.lineWidth =  this.thickness;
        cx.strokeStyle = this.strokColor;
        cx.stroke();


    },




    drawPolygon:function (cx,coords,stroke,fill) {
        cx.globalAlpha= this.alpha
        cx.beginPath();
        cx.moveTo(coords[0],coords[1]);

        var len=coords.length
        for (var i=2;i<len;i=i+2) {
            cx.lineTo(coords[i],coords[i+1]);
        }


        cx.closePath();


        if (fill) {
            cx.fillStyle = this.fillColor;
            cx.fill();
        }
        if (stroke) {
            cx.lineWidth =  this.thickness;
            cx.strokeStyle = this.strokColor;
            cx.stroke();
        }
    },


    drawPolygon2:function (cx,points,stroke,fill) {
        cx.globalAlpha= this.alpha
        cx.beginPath();
        cx.moveTo(points[0].x,points[0].y);

        points.forEach(function(item){
            cx.lineTo(item.x,item.y);
        }),


            cx.closePath();


        if (fill) {
            cx.fillStyle = this.fillColor;
            cx.fill();
        }
        if (stroke) {
            cx.lineWidth =  this.thickness;
            cx.strokeStyle = this.strokColor;
            cx.stroke();
        }
    },

    drawCells:function (cx,cells,stroke,fillColor) {
       // cx.globalAlpha= this.alpha


        var self=this

      //  cx.beginPath();

        //cx.moveTo(edge.va.x,points[0].y);

        cells.forEach(function(cell) {

            self.drawCell(cx,cell,stroke,fillColor,self)

        })
    },

    drawCell:function (cx,cell,stroke,fillColor,self) {


        cx.globalAlpha= this.alpha

        var halfedges = cell.voronoiData.halfedges;

        var centr=cell.centr;


        halfedges.forEach(function (hEdge) {

            var vb=hEdge.edge.vb;
            var va=hEdge.edge.va;
            cx.beginPath();
            cx.moveTo(centr.x, centr.y);
            cx.lineTo(vb.x, vb.y);
            cx.lineTo(va.x, va.y);
            cx.closePath();
//alert(typeof (fillColor))
            // if (fill) {
           if (typeof (fillColor)=="function")cx.fillStyle =fillColor()//self.fillColor;//self.getRandomColor()//this.fillColor;
           else  cx.fillStyle ="#"+cell.seed.toString(16)//           cx.fillStyle =fillColor

            cx.fill();
            // }
            //  if (stroke) {
            cx.lineWidth = this.thickness;
            cx.strokeStyle = this.strokColor;
            cx.stroke();
            // }

            })





    },








    componentToHex:function (c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    },

    rgbToHex:function (r, g, b) {

        var hex = r.toString(16);
        r=hex.length == 1 ? "0" + hex : hex;
        hex = g.toString(16);
        g=hex.length == 1 ? "0" + hex : hex;
        hex = b.toString(16);
        b=hex.length == 1 ? "0" + hex : hex;
         return "#" + r + g + b;
    },



    getRandomColor:function () {
       var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },


    toString:function(){

        var s=
            "Рисовашки =)"+"\n"+
            " ";
        return s

    }


}


//cx.fillStyle = "blue";
//cx.strokeStyle = "green";


//var rnd= new RND()

//alert(rnd.gen(10,100));


/*
//квадрат
function drawArc(cx) {
    cx.fillStyle = "blue";
    cx.fillRect(10, 10, 100, 50); //закрашенный

    cx.strokeStyle = "red"
    cx.lineWidth = 4; //толщена линий
    cx.strokeRect(100, 10, 100, 50); //j,stltyysq
}



//линии..
function drawLine(cx){
    cx.beginPath();
    for (var y = 10; y < 100; y += 10) {
        cx.moveTo(10, y);
        cx.lineTo(90, y);
        cx.fill();
    }
    cx.stroke(); //типа обводка
}



//многоугольник
function drawTriangl(cx) {
    cx.beginPath();
    cx.moveTo(50, 10);
    cx.lineTo(10, 70);
    cx.lineTo(90, 70);
    cx.lineTo(50, 10); //если линии контуры не надо то третью сторону можно не красить
    //cx.closePath(); //либо можно юзнуть это
    cx.stroke();
    cx.fill();
}


//кривые
function drawCurve(cx) {
    cx.strokeStyle = "green";
    cx.beginPath();
    cx.moveTo(10, 90);
    cx.quadraticCurveTo(30, 30, 90, 90); //первые координаты эт контрольная точка
    cx.stroke();
}


//c двумя контрольными точками
function drawCurve2(cx) {
    cx.beginPath();
    cx.moveTo(10, 90);
    // control1=(10,10) control2=(90,10) goal=(50,90)
    cx.bezierCurveTo(10, 10, 90, 10, 50, 90);
    cx.lineTo(90, 10);
    cx.lineTo(10, 10);
    cx.closePath();
    cx.stroke();
}

//арка..
// Первая пара задаёт что-то вроде контрольной точки, вторая – место назначения кривой.
// Пятый задаёт радиус дуги. Метод создаёт скруглённый угол – линию, идущую к контрольной точке,
// а затем к точке назначения – и скругляет угол заданным радиусом.
// Метод arcTo рисует круглую часть, а также линию от точки старта до начала закруглённой части.
function drawArc(cx) {
    cx.beginPath();
    cx.moveTo(10, 10);
    // control=(90,10) goal=(90,90) radius=20
    cx.arcTo(90, 10, 90, 90, 20);
    cx.moveTo(10, 10);
    // control=(90,10) goal=(90,90) radius=80
    cx.arcTo(90, 10, 90, 90, 80);
    cx.stroke();
}
//arcTo не рисует линию от конца закруглённой части до точки назначения, несмотря на своё название. Её можно закончить через lineTo с такими же координатами.

//Изображения
//вообще както странно..
function drawIMG(cx) {
    var img = document.createElement("img");
    img.src = "assets/spark.png";
    img.addEventListener("load", function () {
        for (var x = 0; x < 100000; x += 1)
            cx.drawImage(img, 10, 10);
    });
}


function drawIMGRND(cx) {
    var rnd= new RND()
    rnd.seed=Math.random()*10000000

    var img = document.createElement("img");
    img.src = "assets/spark.png";
    img.addEventListener("load", function () {
        for (var x = 0; x < 100; x += 1)
            cx.drawImage(img, rnd.nextIntRange(0,500), rnd.nextIntRange(0,500));
    });
}



//alert(rnd.nextIntRange(10,100));



drawIMGRND(cx)

    */