/**
 * Created by unagii on 20.04.2016.
 */

function RND(name) {
//    this.seed = 112414
};


RND.prototype={

    seed : 112414,

    nextInt:function ()    {
        return this.gen();
    },

    //
    nextDouble:function (){
        return  (this.gen() / 2147483647); //0x3fffffff
       // return  ((this.gen()&0x3fffffff) / 0x3fffffff); //0x3fffffff
    },

    nextIntRange: function (min, max) {
        min -= .4999;
        max += .4999;
        return Math.round(min + ((max - min) * this.nextDouble()));

    },


    nextDoubleRange: function (min, max){
        return min + ((max - min) * this.nextDouble());
    },


    ///генерируем новый сид
    gen:function () {

        this.seed = (1103515245 * this.seed) % 0x80000000;
       // this.seed = (1103515245 * this.seed + 12345) % 0x80000000

        return this.seed

}













}
