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
import Utils from '../libs/Utils';
import Storage from '../storage/Storage';


// Components



export default class Article extends Component {


    /** @namespace this.refs.photo */
    /** @namespace this.refs.spinner */
    /** @namespace this.props.article.category_id */
    /** @namespace article.comment_count */
    /** @namespace article.like_count */
    /** @namespace article.published_at */



    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            rubric: null,
            viewed: false
        };

        this.handlerClick = this.handlerClick.bind(this);
    }


    /**
     *
     */
    componentWillMount() {
        let rubric = this.props.article.rubric;
        Storage.get('rubrics', (data) => {
            if(rubric in data) {
                this.setState({
                    rubric: data[rubric]
                }, ()=> {

                });
            }
        });

        let id = this.props.article.id;
        Storage.get('viewed', (data) => {
            if(id in data) {
                this.setState({
                    viewed: data[id]
                }, () => {

                });
            }
        });
    }


    /**
     *
     */
    componentDidMount() {
        this.loadingPhoto();
    }


    /**
     *
     */
    loadingPhoto() {
        let photo = this.refs.photo;
        let spinner = this.refs.spinner;

        if(photo != null && spinner != null) {
            photo.addEventListener('load', ()=> {
                spinner.style.display = 'none';
                photo.classList.add('is-loaded');
            });
        }
    }


    /**
     *
     */
    handlerClick() {
        let id = this.props.article.id;
        Storage.get('viewed', (data) => {
            data[id] = true;
            Storage.set('viewed', data, () => {
                this.setState({
                    viewed: true
                })
            })
        });
    }


    /**
     *
     * @returns {XML}
     */
    render() {

        let article = this.props.article;
        let date = Utils.dateFormatting(article.published_at);


        return (
            <a href={article.url} target="_blank" className="b-article" onClick={this.handlerClick}>
                <div className="article__photo">
                    <img ref="photo" src={article.image} />
                    <div className="b-shadow-static"></div>
                    <div ref="spinner" className="spinner"></div>
                    <div className="article__labels">
                        <span className={"article__rubric article__rubric-" + article.rubric}>
                            {this.state.rubric}
                        </span>
                        <span className={"article__viewed" + (this.state.viewed ? ' is-visible' : '')}>
                             <i className="check circle outline icon"/>
                        </span>
                    </div>

                </div>

                <div className="article__data">
                    <div className="article__title">
                        {article.title}
                    </div>
                    <div className="article_meta">
                        <span className="article__date">
                            <i className="calendar outline icon"/>
                            <strong>{date}</strong>
                        </span>
                            <span className="article__comment">
                            <i className="comment outline icon"/>
                            <strong>{article.comment_count}</strong>
                        </span>
                            <span className="article__like">
                            <i className="empty heart icon" />
                            <strong>{article.like_count}</strong>
                        </span>
                    </div>
                </div>
            </a>
        );

    }

}
