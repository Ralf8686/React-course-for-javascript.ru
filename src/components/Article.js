import React, { Component, PropTypes } from 'react'
import CommentList from './CommentList'
import { articles } from '../stores'

class Article extends Component {
    constructor(...args) {
        super(...args)
        this.state = {
            article: articles.getOrLoadById(this.props.params.id)
        }
    }
    shouldComponentUpdate(newProps, newState) {
        return newState.article != this.state.article
    }
    componentWillReceiveProps(newProps) {
        this.articlesChange(newProps)
    }
    componentDidMount() {
        articles.addListener(this.articlesChange)
    }

    componentWillUnmount() {
        articles.removeChangeListener(this.articlesChange)
    }

    render() {
        const { article } = this.state
        if (!article || article.text === undefined) return <h1>Loading article</h1>
        return (
            <div>
                <h1>{article.title}</h1>
                <section>
                    {article.text}
                </section>
                <CommentList article = {article} />
            </div>)
    }
    articlesChange = (newProps) => {
        this.setState({
            article: articles.getOrLoadById((newProps || this.props).params.id)
        })
    }

    getBody() {
        const { article } = this.props
        return (
            <section>
                {article.text}
                <CommentList article = {article} />
            </section>
        )
    }
}

export default Article