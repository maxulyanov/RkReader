/**
 * Created by PhpStorm.
 * Author: 1
 * Project: RkReader
 * Date:  06.10.2016
 * Time: 1:13
 */


'use strict';


export default class UrlManager {


    /**
     *
     * @param url
     * @param params
     * @returns {*}
     */
    static createUrlWithParams(url, params) {
        if(params == null) {
            return url;
        }

        let result = url;
        let index = 0;

        for(let param in params) {

            // null type string - special label for ignore params
            if(params.hasOwnProperty(param) && params[param] != 'null') {
                result += index === 0 ? (url.indexOf('?') === -1 ? '?' : '&') : '&';
                result += `${param}=${params[param]}`;
                index++;
            }
        }

        return result;
    }

}
