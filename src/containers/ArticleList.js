import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addArticle, deleteArticle } from '../AC'
import linkedState from 'react-addons-linked-state-mixin'

const ArticleList = React.createClass({
    mixins: [linkedState],
    getInitialState() {
        return {
            newTitle: ''
        }
    },
    render() {
        const articles = this.props.articles.map((article) => {
            return <li key = {article.id} >{article.title} <a href="#" onClick={this.deleteArticle(article.id)}>X</a></li>
        })
        return (
            <div>
                <div>
                    <input valueLink = {this.linkState("newTitle")}/>
                    <a href = "#" onClick = {this.addArticle}>Add new Article</a>
                </div>
                <ul>{articles}</ul>
            </div>
        )
    },
    addArticle(ev) {
        ev.preventDefault()
        this.props.addArticle({
            title: this.state.newTitle
        })
    },
    deleteArticle(id) {
        return (ev) => {
            ev.preventDefault()
            this.props.deleteArticle(id)
        }
    },
});

export default connect((state) => {
    const { articles, router } = state
    return { articles, router }
}, {
    addArticle,
    deleteArticle
})(ArticleList)