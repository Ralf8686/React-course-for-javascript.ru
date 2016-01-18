import React, { Component, PropTypes } from 'react'
import {findDOMNode} from 'react-dom'
import Article from './Article'
import { WithHint } from '../mixins/WithHint'

class ArticleList extends Component{
    static propTypes = {
        articles: PropTypes.array.isRequired
    }
    render() {
        if (!this.props.articles.length) return <h3>No articles</h3>
        const { articles, getHint, showHint, hideHint } = this.props
        const articleItems = articles.map((article) => <li key = {article.id}
                                                           onMouseOver = {showHint(article.title)}
                                                           onMouseLeave = {hideHint}
        >
            <Article article = {article} ref= {article.id.toString()} />
        </li>)
        return (
            <div>
                {getHint()}
                <ul>{articleItems}</ul>
            </div>
        )
    }
}

export default WithHint(ArticleList);