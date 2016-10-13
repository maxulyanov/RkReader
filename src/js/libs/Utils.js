/**
 * Created by PhpStorm.
 * Author: 1
 * Project: RkReader
 * Date:  06.10.2016
 * Time: 1:07
 */


'use strict';


export default class Utils {


    /**
     *
     * @param eventName
     * @param detail
     * @returns {CustomEvent}
     */
    static factoryCustomEvents(eventName, detail = {}) {
        return new CustomEvent(eventName, {
            bubbles: true,
            detail: detail
        });
    }


    /**
     *
     * @param target
     * @param objects
     * @returns {*}
     */
    static extend(target, objects) {

        for (var object in objects) {
            if (objects.hasOwnProperty(object)) {
                recursiveMerge(target, objects[object]);
            }
        }

        function recursiveMerge(target, object) {
            for (var property in object) {
                if (object.hasOwnProperty(property)) {
                    var current = object[property];
                    if (Utils.getConstructor(current) === 'Object') {
                        if (!target[property]) {
                            target[property] = {};
                        }
                        recursiveMerge(target[property], current);
                    }
                    else {
                        target[property] = current;
                    }
                }
            }
        }

        return target;
    }


    /**
     *
     * @param object
     * @returns {string}
     */
    static getConstructor(object) {
        return Object.prototype.toString.call(object).slice(8, -1);
    }


    /**
     *
     * @param json
     * @returns {*}
     */
    static jsonParse(json) {
        let result = null;
        try {
            result = JSON.parse(json);
        }
        catch (e) {
            throw new Error(e);
        }

        return result;
    }


    /**
     *
     * @param date
     * @returns {*}
     */
    static dateFormatting(date) {
        let result = '';
        if(typeof date === 'string') {

            let dateNative = new Date(date);
            if(isNaN(dateNative.getDate())) {
                return date;
            }

            let day = dateNative.getDate();
            if(day < 10) {
                day = '0' + day;
            }

            let month = dateNative.getMonth() + 1;
            if(month < 10) {
                month = '0' + month;
            }

            result = day + '.' + month + '.' + dateNative.getFullYear();
        }

        return result;
    }


    /**
     *
     * @param func
     * @param ms
     * @returns {Function}
     */
    static debounce(func, ms) {
        var state = null;
        var COOLDOWN = 1;
        return function() {
            if (state) {
                return;
            }

            func.apply(this, arguments);
            state = COOLDOWN;

            setTimeout(function() {
                state = null
            }, ms);
        }
    }

}
