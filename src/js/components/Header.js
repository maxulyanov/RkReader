/**
 * Created by PhpStorm.
 * Author: 1
 * Project: RkReader
 * Date:  06.10.2016
 * Time: 1:13
 */


'use strict';


import React, {Component} from 'react';


export default class Header extends Component{


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
            <div className="container-header">
                <a className="b-logo" href="https://roscontrol.com/" target="_blank">
                    <img src="/build/img/logo.png" alt="png" />
                </a>
                <a href="#" className="b-app-name">
                    Reader
                    <span className="b-app-version">beta</span>
                </a>
            </div>
        )
    }

}





