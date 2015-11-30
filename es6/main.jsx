/**
 * Created by Alexandre on 10/5/2015.
 *
 * Main(the one being transpiled)
 */


import Util from "./Util";
import Dom from "./Dom";

//To be used in ES5
window.Helpers = {
    Dom: Dom,
    Util: Util
};

Dom.addClass("#h1", "Test", "fdfsd", "vcv");
Dom.removeClass("#h1", "Test");

console.log(Util.rand("10"));
console.log(Util.randAlphaNumeric());
/*
Util.notification("Test", {
    body: "It's the body",
    icon: "http://cdn.appstorm.net/mac.appstorm.net/files/2012/07/icon4.png",
    data: "It's a data"
}, function(){
    alert("showing");
}, function(){
    alert("clicked");
}, function(){
    alert("closed");
});*/
console.log(Util.sumArrayValues(Util.numericArray(2, 5)));
//console.log(Util.multiToSingleDimensionalArray([2,4,5, [3,6], 7, [8,9, [3,5,6, [43,56]]], 0]));
console.log(Util.generateArray(4, "sds"));
console.log(Util.isIE());
console.log(Util.toInt(876.87));