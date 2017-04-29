/**
 * Created by unagii on 26.05.2016.
 *
 *
 * я так понимаю..
 * короче тут мы обозначим кнопочки и пропишем функции
 * прототип тут ненадо
 *
 * но вот
 * вопрос.. как контроллек узнает чего мы там контролируем??
 * значит надо делать бля камера контролер который контролирует камеру
 *
 * там ещё хот кей контроллер чтобы контролировал  клавиши
 *
 * ну и.. худ но это не про нас
 *
 *
 *
 *
 */




var Controller=function () {
// create a basic BJS Scene object


}


Controller.prototype= {


    onKeyDown: function (evt) {
        var currentEnding = -1;
        switch (evt.keyCode) {
            case 65 : //'A'
                currentEnding = 0;
                alert("sdsd")
                break;
            case 90 : //'Z'
                currentEnding = 1;
                break;
            case 69 : //'E'
                currentEnding = 2;
                break;
        }
        if (currentEnding != -1) {
            // ANIMATE !!
            animateEnding(ENDINGS[currentEnding]);

            // getToadOnEnding...
        }
    }
}