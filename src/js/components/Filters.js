/**
 * Created by PhpStorm.
 * Author: 1
 * Project: RkReader
 * Date:  06.10.2016
 * Time: 1:06
 */



// Core
import React, {Component} from 'react';
import Storage from './../storage/Storage';


// Components
import DropdownSelect from './DropdownSelect';



export default class Filters extends Component {


    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {};

    }


    /**
     *
     */
    componentDidMount() {

        // Categories
        Storage.get('categories', (data) => {
            this.state.categories = [];
            if(data && Object.keys(data).length > 0) {
                this.state.categories.push({
                    filter : 'category_id',
                    id: 'null',
                    selected: true,
                    name: 'Все'
                });

                for(let key in data) {
                    if(data.hasOwnProperty(key)) {
                        this.state.categories.push({
                            filter : 'category_id',
                            id: key,
                            selected: false,
                            name: data[key]
                        });
                    }
                }
            }
        });


        // Rubrics
        Storage.get('rubrics', (data) => {
            this.state.rubrics = [];
            if(data && Object.keys(data).length > 0) {
                this.state.rubrics.push({
                    filter : 'rubric',
                    id: 'null',
                    selected: true,
                    name: 'Все'
                });

                for(let key in data) {
                    if(data.hasOwnProperty(key)) {
                        this.state.rubrics.push({
                            filter : 'rubric',
                            id: key,
                            selected: false,
                            name: data[key]
                        });
                    }
                }
            }
        });


    }


    /**
     *
     * @returns {XML}
     */
    render() {

        return (
            <div className="container-filters">
                <DropdownSelect handlerUpdate={this.props.updateArticles} buttonActionName='Категории' items={this.state.categories} />
                <DropdownSelect handlerUpdate={this.props.updateArticles} buttonActionName='Рубрики' items={this.state.rubrics} />
            </div>
        );

    }

}
