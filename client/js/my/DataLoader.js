/**
 * Created by unagii on 03.06.2016.
 */

//загрузчик и хранитель ваще всего и вся

/* вообще конечно магия как это работает но работает
var loader = PIXI.loader.add('image1', 'assets/sprites.png')
loader.add("assets/sprites.json")
loader.once('complete', function(loader, resources) {
    // init();
    var texture = PIXI.utils.TextureCache["forest1 (2).png"]

    var t=new PIXI.Sprite(texture)
    alert(objectToStr(PIXI.utils.TextureCache["forest1 (2).png"]))
    t.x=100
    stage.addChild(t)
})
loader.load();

   */





var DataLoader=function () {

//    var loader = PIXI.loader; // pixi exposes a premade instance for you to use.
//or

    var loader = new PIXI.loaders.Loader(); // you can also create your own if you want
    this.loader=loader;
   // loader.add('bunny',"data/bunny.png");

    loader.once('complete',this.completeHandler);

    loader.on('progress',this.onProgress ); // called once per loaded/errored file
  //  loader.on('error', ...); // called once per errored file
   // loader.on('load', ...); // called once per loaded file
  //  loader.on('complete', ...); // called once when the queued resources all load.

}



DataLoader.prototype={


    firstLoad: function ()
    {

        //загружаем символы..  и вот как оно само найдет я хз но найдет
        this.loader.add('image1', 'assets/sprites.png')
        this.loader.add("assets/sprites.json")


       this.load("girl","assets/00.png")
    },

    ///загрузить.. имя, адрес, тип чего грузить
    load: function (name,url)
    {
        //resName.push(name)
        //if (type=="swf")queue.append( new SWFLoader(url, {name:name, autoPlay:false}) );
        //if (type == "xml") queue.append( new XMLLoader(url, { name:name } ) );
        //if (type == "img")queue.append( new ImageLoader(url, {name:name }) );

        this.loader.add(name,url);
        this.loader.load();


    },

    //загрузить списком.. прост вызывает load для всех элементов списка..
    LoadList: function (list)
    {
//
  //      for each (var item:Array in list) Load (item[0],item[1],item[2])
    },

    setNextFunc: function (func,args)
    {
       // next=stageList.Connector.getFunc(rest[0])
      //  nextArgs=rest[1]
    },

//////////////////////////////////
//////////////события загрузчика
/////////////////////////////

    completeHandler: function (event) {
       // alert( (this.resources["girl"].texture))





        //trace(event.target + " is complete!");
        //next.apply(null,nextArgs);
        //next = empty;

    },

    onProgress: function (event) {

     // alert((event));
    },


        errorHandler: function (event) {
        //trace("error occured with " + event.target + ": " + event.text);

    //err
    },


////////////////////////// сет гет..









empty:function(){}


}

