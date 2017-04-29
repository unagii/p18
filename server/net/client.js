/**
 * Created by unagii on 26.04.2017.
 */


/*/
суть клиента
это обертка для сокета
имеет свой ид
может добавлять и удалять команды доступные клиенту
ну и пока всё


/*/


function Client(id,socket){

    this.id=id;
    this.socket=socket;


   // this.cmdList.default=defaultCMD;
}



//добавляет набор команд
Client.prototype.setCMD=function (cmdList) {
   for (i in cmdList){
        var cmd=cmdList[i]
        if (cmd[2]==null) this.socket.on(cmd[0],cmd[1].bind(this));
        else this.socket.on(cmd[0],cmd[1].bind(cmd[2]));
    }

}

//удаляет набор команд..
Client.prototype.removeCMD=function (cmdList) {
    for (i in cmdList){
        var cmd=cmdList[i]
        delete this.socket._events[cmd[0]];
    }
}






/*/легаси

Client.prototype.setCMD=function (cmdList) {
   for (cmd in cmdList){
        this.socket.on(cmd,cmdList[cmd].bind(this));
    }
}


//удаляет набор команд..
Client.prototype.removeCMD=function (cmdList) {
   for (cmd in cmdList){
        delete this.socket._events[cmd];
    }
}
 /*/


module.exports = Client;