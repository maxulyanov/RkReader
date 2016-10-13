/**
 * Created by PhpStorm.
 * Author: 1
 * Project: RkReader
 * Date:  06.10.2016
 * Time: 1:12
 */


'use strict';


(()=> {

    //noinspection JSUnresolvedVariable
    let storage = chrome.storage.local;


    /**
     *
     */
    storage.get('version', (data) => {
        loadingRemoteData('GET', `${config.api}${config.getInfo}`, true,
            (error) => {
                console.error(error);
            },
            (result) => {
                let currentVersion = data.version;
                let version = result.version;

                if(!currentVersion || version > currentVersion ) {
                    createFieldsForStorage(version);
                }

            }
        );


    });


    /**
     *
     * @param version
     */
    function createFieldsForStorage(version) {
        storage.set({
            version,
        });

        //
        loadingRemoteData('GET', `${config.api}${config.getRubricAndCategories}`, true,
            (error) => {
                console.error(error);
            },
            (result) => {

                let rubricsRemote = result.rubrics;
                let rubrics = {};

                if(Array.isArray(rubricsRemote) && rubricsRemote.length > 0) {
                    rubricsRemote.forEach((rubric) => {
                        /** @namespace rubric.rubric */
                        rubrics[rubric.rubric] = rubric.name;
                    });
                    storage.set({
                        rubrics,
                    });
                }
            }
        );


        /**
         *
         */
        loadingRemoteData('GET', `${config.api}${config.getCatalog}?version=${version}`, true,
            (error) => {
                console.error(error);
            },
            (result) => {

                /** @namespace result.slices */
                let slices = result.slices;
                let categories = {};

                if(Array.isArray(slices) && slices.length > 0) {
                    slices.forEach((slice) => {
                        let data = slice.data;

                        if(Array.isArray(data) && data.length > 0) {
                            data.forEach((item) => {

                                /** @namespace item.parent_id */
                                /** @namespace item.lvl */
                                if(item.parent_id === 0 && item.lvl === 0) {
                                    categories[item.id] = item.name;
                                }

                            });
                        }

                    });

                    storage.set({
                        categories
                    });
                }

            }
        );


    }



})();
