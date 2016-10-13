/**
 * Created by PhpStorm.
 * Author: 1
 * Project: RkReader
 * Date:  10.10.2016
 * Time: 7:52
 */


'use strict';


// Core
import React, {Component, createElement} from 'react';
import Storage from './../storage/Storage';



export default class DropdownSelect extends Component {


    /** @namespace this.refs.dropdown */


    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            open: false
        };

        // binding
        this.handlerToggleState = this.handlerToggleState.bind(this);
    }


    /**
     *
     * @param index
     */
    select(index) {
        let items = this.props.items;
        if(items && items.length > 0) {
            items.forEach((item, i) => {
                if(i === index) {
                    item.selected = true;
                }
                else {
                    item.selected = false;
                }
            });
        }

        this.setState({
            items
        }, ()=> {
            Storage.set(items[0]['filter'], items[index]['id'], ()=> {
                this.handlerToggleState();
                this.props.handlerUpdate();
            });
        });
    }


    /**
     *
     * @param index
     */
    handlerSelect(index) {
        this.select(index);
    }


    /**
     *
     */
    handlerToggleState() {
        let dropdown = this.refs.dropdown;
        let dropdowns = document.querySelectorAll('.js-dropdown-list');
        for(let i = 0; i < dropdowns.length;i++) {
            if(dropdowns[i] !== dropdown) {
                dropdowns[i].classList.remove('is-open');
            }
        }

        if(dropdown.classList.contains('is-open')) {
            dropdown.classList.remove('is-open')
        }
        else {
            dropdown.classList.add('is-open');
        }
    }


    /**
     *
     * @returns {XML}
     */
    render() {

        let items = [];
        if(this.props.items)  {
            items = this.props.items.map( (item, index) => {
                return  React.createElement('a', {
                    onClick: this.handlerSelect.bind(this, index),
                    href: '#',
                    key: index,
                    className: (item.selected) ? 'is-selected' : '',
                    'data-id': item.id,
                    'data-filter': item.filter,
                }, item.name);
            });
        }

        return (
            <div className="container-dropdown">
                <div className="b-button-action-dropdown" onClick={this.handlerToggleState}>{this.props.buttonActionName}</div>
                <div className={'b-dropdown-list js-dropdown-list'} ref="dropdown">
                    {items}
                </div>
            </div>
        );

    }

}
