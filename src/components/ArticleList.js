import React, { Component, PropTypes } from 'react'
import {findDOMNode} from 'react-dom'
import Article from './Article'
import { WithHint } from '../mixins/WithHint'

class ArticleList extends Component{
    static propTypes = {
        articles: PropTypes.array.isRequired
    }
    render() {
        const { articles } = this.props
        if (!articles.length) return <h3>No articles</h3>
        const articleItems = articles.map((article) => <li key = {article.id}
                                                           onMouseOver = {this.props.showHint.call(this, article.title)}
                                                           onMouseLeave = {this.props.hideHint.bind(this)}
        >
            <Article article = {article} ref= {article.id.toString()} />
        </li>)
        return (
            <div>
                {this.props.getHint.call(this)}
                <ul>{articleItems}</ul>
            </div>
        )
    }
    componentDidMount() {
    }
}

export default WithHint(ArticleList);