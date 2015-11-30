/**
 * Created by Alexande on 10/5/2015.
 *
 * Util Class
 */

export default class Util {
    constructor(){}

    /**
     * Function Name                    : Line Number
     * rand()                           : 51
     * randAlphaNumeric()               : 62
     * min()                            : 72
     * max()                            : 82
     * is()                             : 94
     * isNumber()                       : 98
     * isInt()                          : 102
     * isFloat()                        : 106
     * isString()                       : 110
     * isObject()                       : 114
     * isFunction()                     : 118
     * isBoolean()                      : 122
     * isArray()                        : 126
     * toInt()                          : 136
     * alphabeticArray()                : 160
     * numericArray()                   : 171
     * notification()                   : 192
     * sumArrayValues()                 : 223
     * multiToSingleDimensionalArray()  : 233
     * generateArray()                  : 258
     * isIE()                           : 267
     */

    //Does not work in strict Mode
    /*static  functionName(){
        let name = arguments.callee.toString();
        name = name.substr('function '.length);
        name = name.substr(0, name.indexOf('('));

        return name;
    }*/

    /**
     * Give a random value
     *
     * @param max   {Number} Maximum number
     * @param min   {Number | Boolean} [0] Minimum number or return an Arbitarty number
     * @param int   {Boolean} [true] if wether the function an int or Arbitarty number
     * @returns     {Number}
     */
    static rand(max, min = 0, int = true){
        return (typeof min == "boolean" && min === false) ? Math.random() * (max - min) + min
            : (int) ? Math.floor(Math.random() * (max - min)) + min
            : Math.random() * (max - min) + min;
    };

    /**
     * Returns an alphanumeric value of 8 character(can be use for password)
     *
     * @returns {String}
     */
    static randAlphaNumeric(){
        return this.rand(90000000000, 10000000000).toString(36);
    }

    /**
     * Return the minimum value from a set of values
     *
     * @param values    {Array | Number}(multiple)
     * @returns         {Number}
     */
    static min(...values){
        return (this.isArray(arguments[0])) ? Math.min(...arguments[0]) : Math.min(...values);
    };

    /**
     * Return the maximum value from a set of values
     *
     * @param values {Array | Number}(multiple)
     * @returns {Number}
     */
    static max(...values){
        return (this.isArray(arguments[0])) ? Math.max(...arguments[0]) : Math.max(...values);
    };

    /**
     * Check if subject is of type type
     * Note for array should use Array.isArray Util.isArray
     *
     * @param subject {Number | Boolean | Object | String | Function} The subject
     * @param type {String} Representing number, boolean, object, String, function
     * @returns {Boolean}
     */
    static is(subject, type){
        return typeof subject == type;
    };

    static isNumber(n){
        return this.is(n, "number");
    };

    static isInt(n){
        return Number(n) === n && n % 1 === 0;
    };

    static isFloat(n){
        return n === Number(n) && n % 1 !== 0;
    };

    static isString(s){
        return this.is(s, "string");
    };

    static isObject(s){
        return this.is(s, "object");
    };

    static isFunction(s){
        return this.is(s, "function");
    };

    static isBoolean(s){
        return this.is(s, "boolean");
    };

    static isArray(s){
        return Array.isArray(s);
    };

    /**
     * A better version of parseInt which uses only bitwise thus not beating the living daylights out of the CPU
     *
     * @param n {String | Number}
     * @returns {Number}
     */
    static toInt(n){
        if(this.isString(n)){
            let re = /(\d+)/g,
                x,
                result = [];

            while((x = re.exec(n)) != null){
                result.push(x[1]);
            }

            return +result.join("");
        }else if(this.isFloat(n)){
            return +n >> 0;
        }
    };

    /**
     * Generate an array of alphabets
     *
     * @param start {String} A letter from a-y | A-Y
     * @param end   {String} A letter from b-z | B-Z
     * @returns     {Array}
     */
    static alphabeticArray(start = "a", end = "z"){
        return Array.apply(null, Array(end.charCodeAt(0) - start.charCodeAt(0) + 1)).map((x, i) =>  String.fromCharCode(i + start.charCodeAt(0)));
    };

    /**
     * Generate an array of numbers
     *
     * @param start {Number} A number
     * @param end   {Number} A number
     * @returns     {Array}
     */
    static numericArray(start = 0, end = 10){
        return Array.apply(null, Array(+end - +start + 1)).map((x, i) =>  start + i);
    };

    /**
     * A notification function
     *
     * @param title     {String}
     * @param body      {String}
     * @param icon      {String}
     * @param dir       {String} [auto] values = rtl and ltr
     * @param lang      {String}
     * @param tag       {String}
     * @param data      {*}
     * @param silent    {Boolean} [false]
     * @param show      {Function}
     * @param click     {Function}
     * @param close     {Function}
     * @param error     {Function}
     * @returns         {Notification | Boolean}
     */
    static notification(title, {body = "", icon = "", dir = "auto", lang = 'en-US', tag = "", data = "", silent = false} = {}, show = function(){}, click = function(){}, close = function(){}, error = function(){}){
        let notif = {};
        let obj = {body, icon, dir, lang, tag, data, silent};

        if(!("Notification" in window)){
            alert("Notification is not supported in your current browser");
            return false;
        }else if(Notification.permission === "granted"){
            notif = new Notification(title, obj);
        }else if(Notification.permission !== "denied"){
            Notification.requestPermission(function(permission){
                if(permission === "granted"){
                    notif = new Notification(title, obj);
                }
            });
        }

        notif.onshow = show;
        notif.onclick = click;
        notif.onclose = close;
        notif.onerror = error;

        return notif;
    };

    /**
     * Sums all values to a single value
     *
     * @param arr   {Array} Array of numbers or String
     * @returns     {Number}
     */
    static sumArrayValues(arr){
        return arr.reduce((prev, next) => +prev + +next);
    };

    /**
     * Transforms a multi dimensional Array to a single dimensional Array
     *
     * @param arr   {Array} The array to be transformed
     * @returns     {Array}
     */
    static multiToSingleDimensionalArray(arr){
        let newArray = [];

        function process(tempArr){
            for(let i in tempArr){
                if(Util.isArray(tempArr[i])){
                    process(tempArr[i])
                }else{
                    newArray.push(tempArr[i]);
                }
            }
        }

        process(arr);

        return newArray;
    };

    /**
     * Generate an array of default values
     *
     * @param length    {Number} Length of array
     * @param value     {*} Value of each element
     * @returns         {Array}
     */
    static generateArray(length, value = 0){
        return Array.apply(null, Array(length)).map((x, i) => value);
    };

    /**
     *
     * @param returnVersion {Boolean} Wether to return the IE version or not
     * @returns {Number | Boolean}
     */
    static isIE(returnVersion = false){
        var v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');

        while (
            div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
                all[0]
            );

        return (returnVersion && v > 4) ? v
            : (v > 4) ? true
            : false;
    };
}