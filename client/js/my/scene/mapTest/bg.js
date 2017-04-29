/**
 * Created by unagii on 19.04.2017.
 */


/**
 *
 * этот модуль отвечает за задник карты..
 * его задача..
 * отрисовать то что нужно, там где нужно
 *
 * ..но покачто рисовать мы будем квадратики с координатами
 *
 *
 * @author Unagii
 */



function BG(stage, textureSource,config) {


    this.stage=stage //сцена на которой мы будем рисовать

    //значения по умолчанию
    if (textureSource == undefined){ //источник текстур для тайлов
        textureSource={
            getTile:function (x,y) {
            }
        }
    }

    if (config == undefined){//конфиг
       config={
           tileSize:16, //размер тайла
           gridSize:9 //нечетное число от 3 до...

       }
    }


    var tilesize=config.tileSize

    this.gridSize=config.gridSize
    var gridSize=this.gridSize
    this.gridDigit = (tilesize-1).toString(2).length//config.gridDigit
    //trace(tilesize.toString(2))
    //trace(tilesize.toString(2).length)

    this.gridX = 0;//это позиция грида в тайлах..
    this.gridY = 0;




    var grid=[]
    for (var x = 0; x <gridSize ; x++) {
        grid[x] = [];
        for (var y = 0; y < gridSize; y++) {
            var bgTile=BgTileView(tilesize);
            bgTile.updatePOZ(x*tilesize,y*tilesize)
           // bgTile.x=X*bgTile.size
           // bgTile.y=Y*bgTile.size
            grid[x][y]=bgTile
            stage.addChild(bgTile)
        }
    }
    this.grid=grid;


    //регистрируем событее
    document.addEventListener('OnCameraSectorChenge', this.updatePoz.bind(this), false);

}
    BG.prototype.updatePoz= function(OnCameraSectorChenge) {

        //trace(OnCameraSectorChenge);
        //OnCameraSectorChenge// это событее

        /*/
        class OnCameraSectorChenge {
            public var x:Int;
            public var y:Int;
            public var sectorX:Int;
            public var sectorY:Int;
            public function new(x_:Int,y_:Int)
        {
            x = x_;
            y = y_;
            event.sectorX = this.x>>8;//((this.x&0xf00) >> 8);
            event.sectorY = this.y>>8;//((this.y&0xf00) >> 8);
        }
        }
/*/
          var newX = OnCameraSectorChenge.sectorX;
        var newY = OnCameraSectorChenge.sectorY;

        //смещаем позицию грида
        var offset=(this.gridSize>>1)

        this.gridX = newX-offset;
        this.gridY = newY-offset;
        var gridX=this.gridX
        var gridY=this.gridY
        var grid=this.grid


        for (var X=0 ; X <this.gridSize ; X++) {
            for (var Y=0 ; Y < this.gridSize; Y++) {
                grid[X][Y].updatePOZ((gridX+X)<<this.gridDigit, (gridY+Y)<<this.gridDigit);
                //TODO добавить текстуру тайлам

            }


        }
        //}

        //if (gridY != (newY >> gridDigit)) {
        //	gridY = (newY >> gridDigit);
        //	for (x1 in 0...gridSize) {
        //		for (y1 in 0...gridSize) {
        //			grid[x1][y1].updatePOZ((gridX+x1)<<gridDigit, (gridY+y1)<<gridDigit);
        //		}
        //	}
        //}
    }





