/**
 * Created by PhpStorm.
 * Author: 1
 * Project: RkReader
 * Date:  06.10.2016
 * Time: 1:06
 */


'use strict';


// Core
import React, {Component} from 'react';



export default class Loader extends Component {


    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
    }


    /**
     *
     * @returns {XML}
     */
    render() {

        return (
            <div className="container-cssload">
                <div className="cssload-loading"><i></i><i></i></div>
            </div>
        );

    }

}
