/**
 * Created by PhpStorm.
 * Author: 1
 * Project: RkReader
 * Date:  06.10.2016
 * Time: 1:12
 */



// Core
import React, {Component} from 'react';
import Utils from './../libs/Utils';
import config from './../config';
import Storage from './../storage/Storage';


// Components
import Article from './Article';
import Loader from './Loader';



export default class List extends Component{



    /** @namespace articles.total_count */



    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.emptyMessage = 'Ничего не найдено. Измените параметры фильтрации.'
    }


    /**
     *
     */
    componentDidMount() {
        if(this.refs.list != null) {
            let delay = 200;
            let handlerScroll = Utils.debounce(this.handlerScroll.bind(this), delay);
            this.refs.list.addEventListener('scroll', handlerScroll);
        }
    }


    /**
     *
     */
    componentWillMount() {
        this.firstRender = true;
    }


    /**
     *
     */
    componentWillUpdate() {
        this.firstRender = false;
    }


    /**
     *
     */
    componentWillUnmount() {
        if(this.refs.list != null) {
            this.refs.list.removeEventListener('scroll', this.handlerScroll);
        }
    }


    /**
     *
     * @param event
     */
    handlerScroll(event) {
        let target = event.target;
        let minScrollResidue = 1000;

        if((target.scrollTop + target.clientHeight + minScrollResidue) > target.scrollHeight) {
            Storage.get('offset', (value) => {
                value = parseInt(value);
                if(!isNaN(value)) {
                    if(this.props.articlesCount > value) {
                        value += config.offsetLoadingArticles;
                        Storage.set('offset', value, () => {
                            this.props.updateArticles();
                        })
                    }
                }
                else {
                    console.error('value is NaN!');
                }
            });
        }
    }


    /**
     *
     * @returns {XML}
     */
    render() {
        let articles = this.props.articles;

        if(articles != null && Array.isArray(articles)) {
            articles = articles.map(function(article, index) {
                return <Article key={index} article={article} />
            });
        }


        let result;
        if(this.firstRender) {
            result = (articles.length > 0) ? articles : <Loader/>;
        }
        else {
            result = (articles.length > 0) ? articles : this.props.articlesCount > 0 ? <Loader/> :
                <div className="b-empty-message">{this.emptyMessage}</div>
        }


        return (
            <div ref="list" className="container-articles">
                {result}
            </div>
        )

    }


    /**
     *
     * @param json
     * @returns {{count: number, articles: null}}
     */
    static getDataArticlesFromJSON(json) {
        let result = {
            count: 0,
            articles: null
        };

        if(json != null && typeof json === 'string') {
            let articles = Utils.jsonParse(json);
            result.count = articles.total_count;
            result.articles = articles.items;
        }

        return result;
    }


}
