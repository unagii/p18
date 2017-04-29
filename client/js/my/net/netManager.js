/**
 * Created by unagii on 28.04.2017.
 */


NetManager=function() {

    this.socket=io();




}


NetManager.prototype.setCMD=function (cmdList) {


    for (i in cmdList){
        var cmd=cmdList[i]
        if (cmd[2]=null)cmd[2]=this
        this.socket.on(cmd[0],cmd[1].bind(cmd[2]));
    }

}


//удаляет набор команд..
NetManager.prototype.removeCMD=function (cmdList) {
    for (i in cmdList){
        var cmd=cmdList[i]
        delete this.socket._events[cmd[0]];
    }
}