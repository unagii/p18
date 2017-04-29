/**
 * Created by unagii on 19.04.2017.
 */





function BgTileView(size) {



    //this.t:Text;
   // this. t2:Text;

   // var g:Graphics;


    var  tile= new  PIXI.Sprite(PIXI.Texture.EMPTY);

    var t = new PIXI.Text("tile");
    t.style.fill = '#ffd700';
   // t.resolution = 10;
    t.x = size>>1;
    t.y = size>>1;
    tile.addChild(t);

    var t2 = new PIXI.Text("tile");
    t2.style.fill = '#ffd700';
    //t2.resolution = 1;
    t2.x = size>>1;
    t2.y = size>>1;
    tile.addChild(t2);


    var g = new PIXI.Graphics();
    g.lineStyle(1, 0x88d700);
    g.moveTo(0, 0);
    g.lineTo(size, 0);
    g.lineTo(size, size);
    g.lineTo(0, size);
    tile.addChild(g);

   //разное
    tile.size=size;
    //this.tile = tile

    tile.updatePOZ= function(x,y)
    {

        t2.text = x + ':' + y;
        t2.x = (size >> 1) - t2.width / 2;
        t2.y = (size >> 1);

        t.text = (x /size ) + ':' + (y/size);
        t.x = (size >> 1) - t.width / 2;
        t.y = (size >> 1) - t.height;

        this.x = x;
        this.y = y
    }
    return tile;
}

/*/
  ;

}
 /*/