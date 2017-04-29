/**
 * Created by unagii on 28.04.2017.
 */



function Entity(id,x,y,t,keyWords){

    this.id=id
    this.p={'x':x,'y':y} //переделать!
    this.t=t

    this.keyWords=keyWords



}

Entity.prototype.updatePoz=function(x,y){
   this.p.x=x
    this.p.y=y
    this.sector.updateEntityPoz(this)
}

module.exports = Entity;





