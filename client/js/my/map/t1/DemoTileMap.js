/**
 * Created by unagii on 15.05.2016.
 */

//alert ("DD");



////новая карта
this.tileMap= new TileMap({
    width:1000,
    height:1000

});



//готовим рисовальню
var elem = document.getElementById('canvas');
var params = { width: 1200, height: 600 };
var two = new Two(params).appendTo(document.body);




//проверки
//карта
//alert (this.tileMap.toString());

this.layer=this.tileMap.getLayerByName("base");
//alert (this.layer.toString());


this.tileMap.addLayer("tiles", 50, 50,-10,-10);
this.layer= tileMap.getLayerByName("tiles");
//alert (this.layer.toString());






drawLayer(this.layer)




function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function drawLayer(layer)
{

    for (var X=0; X < layer.sizeX; X++) {
    for (var Y=0; Y < layer.sizeY; Y++) {
        drawTileRect(layer.getTileRectByPoz(X, Y))

        }
    }
    two.update();
}



    function drawTileRect (tile)
    {
        //graphics.lineStyle(2,Math.random()*100000000,0.7)
      var rect=  two.makeRectangle(tile.x, tile.y, tile.width, tile.height);
     // var circ = two.makeCircle(tile.x, tile.y,tile.width/2)
        //rect.fill = 'rgb(0, 200, 255);
        rect.opacity = 0.5;
        //rect.fill=Math.random()*100000000
        rect.noFill();
        rect.linewidth = 5;
        rect.stroke = getRandomColor();

        var circ = two.makeCircle(tile.x, tile.y,tile.width/2)
        circ. opacity = 0.5;
        circ.fill=getRandomColor();//Math.random()//*1000000000
       // circ.noFill();
        circ.stroke = getRandomColor();
        circ.linewidth = 5;
    }