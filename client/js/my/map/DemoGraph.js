/**
 * Created by unagii on 23.05.2016.
 */





// Create a PlayCanvas application
var canvas = document.getElementById("canvas1");
var cx=canvas.getContext('2d')

//дравер у нас будет рисовать
var draver=new Drawer()


//собственно сам граф
//10 - количество ячеек 10х10
//50 - радиус ячейки.
//1000. это размер глобальной карты он не суть важен
//1000
//3 это заступ тайлов. надо для бесшовности
var graph=new Graph(9,30,1000,1000,3);
// и всё какбы граф уже просчитался можно рисовать
//но граф просчитался по базовым центрам

//рисуем
//ребра
draver.drawEdges(cx,graph.getEdges());
//центры
draver.drawPoints(cx,graph.centrs,5);



//ок ладно. пора сместить центры
canvas = document.getElementById("canvas2");
cx=canvas.getContext('2d')


//alert(graph.noise)
graph.update(1,1)
draver.lineStyle(2,'#ff00ff','#ff00ff',1);
draver.drawEdges(cx,graph.getEdges());
draver.drawPoints(cx,graph.centrs,5);


//теперь попробуем отрисовать отдельные ячейки
canvas = document.getElementById("canvas3");
cx=canvas.getContext('2d')

var cells=graph.cells;
draver.lineStyle(5,'#00ff00','#ff00ff',1);
draver.drawCells(cx,cells,false,draver.getRandomColor);



//отдельные группы ячеек и рамку
canvas = document.getElementById("canvas4");
cx=canvas.getContext('2d')

var cells=graph.inCells;
draver.lineStyle(5,'#00ff00','#FF0000',1);
draver.drawCells(cx,cells,false,'#00aa00');


var cells=graph.borderCellsD
draver.lineStyle(5,'#00ff00','#aa0044',0.5);
draver.drawCells(cx,cells,false,'#aa0044');

var cells=graph.borderCellsU;
draver.lineStyle(5,'#00ff00','#990099',0.5);
draver.drawCells(cx,cells,false,'#990099');

var cells=graph.borderCellsL;
draver.lineStyle(5,'#00ff00','#4400aa',0.5);
draver.drawCells(cx,cells,false,'#4400aa');

var cells=graph.borderCellsR;
draver.lineStyle(5,'#00ff00','#FF00ff',0.5);
draver.drawCells(cx,cells,false,'#FF00ff');

var centrs=graph.centrs
draver.lineStyle(2,'#00ff00','#00FF00',0.5);
draver.drawPoints(cx,centrs,5);


var rect=graph.tileRect  //это нихуя не рект

draver.lineStyle(5,'#FFff00','#00FF00',0.5);
draver.drawPolygon(cx,[rect.x0,rect.y0,  rect.x1,rect.y0   ,rect.x1,rect.y1,rect.x0,rect.y1  ],true,false)


///а теперь протестим на бесшовность
//// нарисуем 4 текстуры
// текстурка буде иметь размер 360 х 360
var resultCanvas = document.getElementById("canvas5");
var resultContext=resultCanvas.getContext('2d')

canvas = document.createElement("canvas");
canvas.width = 540;
canvas.height = 540;
cx=canvas.getContext('2d')

graph.update(1,1)
var cells=graph.cells;
draver.lineStyle(1,'#00ff00','#ff00ff',1);
draver.drawCells(cx,cells,false,false);
var imgData=cx.getImageData(90,90,360,360)
resultContext.putImageData(imgData,0,0)

graph.update(2,1)
var cells=graph.cells;
draver.lineStyle(1,'#00ff00','#ff00ff',1);
draver.drawCells(cx,cells,false,false);
var imgData=cx.getImageData(90,90,360,360)//(0,0,540,540)
resultContext.putImageData(imgData,360,0)

graph.update(1,2)
var cells=graph.cells;
draver.lineStyle(1,'#00ff00','#ff00ff',1);
draver.drawCells(cx,cells,false,false);
var imgData=cx.getImageData(90,90,360,360)//(0,0,540,540)
resultContext.putImageData(imgData,0,360)

graph.update(2,2)
var cells=graph.cells;
draver.lineStyle(1,'#00ff00','#ff00ff',1);
draver.drawCells(cx,cells,false,false);
var imgData=cx.getImageData(90,90,360,360)//(0,0,540,540)
resultContext.putImageData(imgData,360,360)

//и добавим швы
draver.lineStyle(3,'#ff0000','#ff00ff',1);
draver.drawLineSegment(resultContext,200,360,520,360)
draver.drawLineSegment(resultContext,360,200,360,520)




