/**
 * Created by PhpStorm.
 * Author: 1
 * Project: RkReader
 * Date:  06.10.2016
 * Time: 1:06
 */



export default class Storage {


    /**
     *
     * @param key
     * @param value
     */
    static set(key, value, callback) {
        if (value == null) {
            Storage.log('I can not save! Value empty!', 'error');
            return;
        }

        let object;
        if(key === null) {
            object = value;
        }
        else {
            object = {
                [key]: value
            }
        }

        Storage.storage.set(object, () => {
            if(typeof  callback === 'function') {
                callback();
            }
            Storage.log('Saved!', 'info');
        });
    }


    /**
     *
     * @param key
     * @param callback
     */
    static get(key, callback) {
        Storage.storage.get(key, function (data) {
            if(Array.isArray(key) && key.length > 0) {
               callback(data);
            }
            else if(data[key] != null) {
                Storage.log('Get success', 'info');
                callback(data[key]);
            }
            else {
                callback({});
            }
        });
    }


    /**
     *
     * @param key
     */
    static remove(key) {
        Storage.storage.remove(key, function () {
            Storage.log('Remove', 'info');
        });
    }


    /**
     *
     * @param message
     * @param type
     */
    static log(message, type) {
        console[type](message);
    }


}

Storage.storage = chrome.storage.local;
