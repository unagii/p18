/**
 * Created by unagii on 16.04.2017.
 */



function User(id){
    this.id=id;

    this.x= 0//Math.random()*1000;
    this.y=0 //Math.random()*1000;



        this.pressingRight=false;
        this.pressingLeft=false;
        this.pressingUp=false;
        this.pressingDown=false;
        this.maxSpd=10;




}


User.prototype.updatePosition = function(){
    if(this.pressingRight)
        this.x += this.maxSpd;
    if(this.pressingLeft)
        this.x -= this.maxSpd;
    if(this.pressingUp)
        this.y -= this.maxSpd;
    if(this.pressingDown)
        this.y += this.maxSpd;
}


module.exports = User;