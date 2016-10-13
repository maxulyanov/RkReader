/**
 * Created by PhpStorm.
 * Author: 1
 * Project: RkReader
 * Date:  06.10.2016
 * Time: 1:12
 */


'use strict';


// Core
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import config from './config';
import UrlManager from './libs/UrlManager';
import Connect from './libs/Connect';
import Storage from './storage/Storage';


// Components
import Header from './components/Header';
import Articles from './components/Articles';
import Filters from './components/Filters';



class App extends Component {


    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            articles: []
        };
        this.connect = new Connect();

        // Binding
        this.updateArticles = this.updateArticles.bind(this);
        this.updateArticlesWithClear = this.updateArticlesWithClear.bind(this);
    }



    /**
     *
     * @param url
     */
    loadingArticles(url) {
        this.connect.ajax('GET', url, true,
            (error) => {
                console.error(error);
            },
            (data) => {
                let currentArticles = this.state.articles;
                let {articles, count} = Articles.getDataArticlesFromJSON(data);
                this.setState({
                    articles: currentArticles.concat(articles),
                    articlesCount: count
                }, () => {});
            }
        )
    }


    /**
     *
     */
    updateArticles() {
        Storage.get(['offset', 'category_id', 'rubric'], (params) => {
            let url = UrlManager.createUrlWithParams(`${config.api}${config.getArticles}`, params);
            this.loadingArticles(url);
        })
    }


    /**
     *
     */
    updateArticlesWithClear() {
        Storage.set('offset', 0, () => {
            this.setState({
                articles: []
            }, () => {
                this.updateArticles();
            });
        });
    }


    /**
     *
     */
    componentWillMount() {
        Storage.set('offset', 0);
        Storage.set('category_id', 'null');
        Storage.set('rubric', 'null');
        this.updateArticles();
    }



    /**
     *
     * @returns {XML}
     */
    render() {

        return (
            <div className="container-app">
                <Header/>
                <Articles
                    updateArticles={this.updateArticles}
                    limitResults={this.state.limitResults}
                    articles={this.state.articles}
                    articlesCount={this.state.articlesCount}
                    />
                <Filters updateArticles={this.updateArticlesWithClear} />
            </div>
        );
    }


}


ReactDOM.render(
    <App />,
    document.getElementById('root-app')
);


