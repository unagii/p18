/**
 * Created by unagii on 27.04.2017.
 */

/*/

чат

 /*/

trace=console.log;


var socket = io();
socket.on('hello', function () {
    trace('hello')
})




socket.emit('hello')


//chat view

function Chat(socket) {


    var chatDiv = document.createElement('div')
    var chatText = document.createElement('div')
    chatText.id = 'chatText'
    chatText.style = "width:500px;height:100px;overflow-y:scroll;background-color:#fdda97"
    var mess = document.createElement('div')
    mess.innerHTML = 'это чат'
    chatText.appendChild(mess)

    var chatInputForm = document.createElement('form')
    chatInputForm.id = "chatInputForm"
    var chatInput = document.createElement('input')
    chatInput.id = "chatInput"
    chatInput.style = "width:500px;background-color:#fecc65"

    chatInputForm.appendChild(chatInput)

    chatDiv.appendChild(chatText)
    chatDiv.appendChild(chatInputForm)


    chatInputForm.onsubmit=function (e) {
        e.preventDefault();
        trace(chatInput.value)
        socket.emit('chatMess',chatInput.value)
        chatInput.value=''
    }


    this.view=chatDiv


}
Chat.prototype.show=function(element){
    if (element==null) document.body.appendChild(this.view)
    else element.body.appendChild(this.view)

}

Chat.prototype.hide=function(){
   // if (element==null) document.body.appendChild(this.view)
   // else element.body.appendChild(this.view)
    this.view.style.visible=false

}


//chat CMD
Chat.prototype.addMessage= function (text) {
    chatText.innerHTML +='<div>'+text +'</div>'
}




chat= new Chat(socket)
chat.show()
chat.hide()