/**
 * Created by Alexandre on 10/5/2015.
 *
 * Dom Class
 */

import Util from "./Util";

export default class Dom {
    construtor(){}

    static getById(s){
        if(s !== undefined) {
            return document.getElementById(s);
        }else{
            throw `getById needs paramater`;
        }
    };

    static getByClass(s){
        if(s !== undefined) {
            return document.getElementsByClassName(s);
        }else{
            throw `getByClass needs paramater`;
        }
    };

    static get(s){
        if(s !== undefined) {
            return document.querySelectorAll(s);
        }else{
            throw `get needs paramater`;
        }
    };

    static replace(element, text = ""){
        let elem = this.get(element);
        let old = [];

        if(elem.length > 0){
            for(let i = 0;i < elem.length;i++){
                old.push(elem[i].innerHTML);
                elem[i].innerHTML = text;
            }
        }else{
            throw "No element found";
        }

        return (old.length > 1) ? old : old[0];
    };

    static hasClass(element, s){
        let elem = this.get(element);

        return elem[0].classList.contains(s);
    };

    static addClass(element, ...classes){
        let elem = this.get(element);

        if(elem.length > 0){
            for(let i = 0;i < elem.length;i++){
                elem[i].classList.add.apply(elem[i].classList, classes);
            }
        }else{
            throw "No element found";
        }
    };

    static removeClass(element, s){
        let elem = this.get(element);

        if(elem.length > 0){
            for(let i = 0;i < elem.length;i++){
                elem[i].classList.remove(s);
            }
        }else{
            throw "No element found";
        }
    };
}