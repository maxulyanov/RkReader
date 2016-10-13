/**
 * Created by PhpStorm.
 * Author: 1
 * Project: RkReader
 * Date:  07.10.2016
 * Time: 23:14
 */


export default class Connect {


    /**
     *
     * @param type
     * @param url
     * @param async
     * @param error
     * @param success
     */
    ajax(type = 'GET', url, async = true, error, success) {
        var xhr = new XMLHttpRequest();
        xhr.open(type, url, async);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status == 200) {
                    success(xhr.responseText);
                }
                else {
                    error(xhr.status + ': ' + xhr.statusText);
                }
            }

        }

        xhr.send();
    }

}
