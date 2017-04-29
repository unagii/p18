/**
 * Created by unagii on 03.06.2016.
 */



var objectToStr=function(obj) {
    var s

    for (var name in obj) {
     s=s+   name+":" + obj[name]+"\n";
    }
return s
}


////генерируем валидный урл
getTileURL= function (resUrl,X,Y,mask)
{
/*/
    resUrl:String //папка где гранятся ресурсы
    X:uint          //координаты тайла
    Y:uint
    mask:String="URL/XXXYYY.jpg"    маска..


    //генерируем валидный урл
    //
    var resultURL//:String

    //части чтроки
    var XXX//:String  //Х координата
    var YYY//:String	//у координата
    var prefix//:String // передняя часть
    var Infix//:String //середняя часть
    var suffix//:String //задняя часть

    var fitsrAsix//:String //первая ось координат
    var XCount//:uint; //добовляет нули впереди если координата обязательно должна иметь фиксированую длину типа 003
    var YCount//:uint;

    if (mask.indexOf("X")<mask.indexOf("Y"))fitsrAsix="XXX"

    prefix = mask.substr(mask.search("URL") + 3, mask.length)
    if (fitsrAsix == "XXX") prefix = prefix.substr(0, prefix.indexOf("X")) else prefix= prefix.substr(0, prefix.indexOf("Y"))

    if (fitsrAsix=="XXX")suffix=mask.substr(mask.lastIndexOf("Y")+1,mask.length)else suffix=mask.substr(mask.lastIndexOf("X")+1,mask.length)

    if (fitsrAsix == "XXX")
        if (mask.lastIndexOf("X")+1<mask.indexOf("Y")) Infix=mask.substr(mask.lastIndexOf("X")+1,mask.indexOf("Y")-mask.lastIndexOf("X")-1)else Infix=""
    else
    if (mask.lastIndexOf("Y")+1<mask.indexOf("X")) Infix=mask.substr(mask.lastIndexOf("Y")+1,mask.indexOf("X")-mask.lastIndexOf("Y")-1)else Infix=""

    for (var I= 0; I <mask.length;I++ ) {
        if (mask.charAt(I)=="X")XCount++
        if (mask.charAt(I)=="Y")YCount++
    }

    XXX = X.toString()
    YYY=Y.toString()

    for (var I = 0; I < mask.length; I++ ) {
        if(XXX.length<XCount)XXX="0"+XXX
        if(YYY.length<YCount)YYY="0"+YYY
    }
    //из чего же состоит маска
    if (fitsrAsix=="XXX") resultURL=resUrl+prefix+XXX+Infix+YYY+suffix else resultURL=resUrl+prefix+YYY+Infix+XXX+suffix
    //trace(resultURL)
    /*/
    return resultURL
}