/**
 * Created by PhpStorm.
 * Author: 1
 * Project: RkReader
 * Date:  09.10.2016
 * Time: 10:43
 */


/**
 *
 * @param type
 * @param url
 * @param async
 * @param error
 * @param success
 */
function loadingRemoteData(type = 'GET', url, async = true, error, success) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, url, async);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status == 200) {
                let result = null;
                try {
                    result = JSON.parse(xhr.responseText);
                }
                catch (e) {
                    throw new Error(e);
                }
                success(result);
            }
            else {
                error(xhr.status + ': ' + xhr.statusText);
            }
        }

    }

    xhr.send();
}
