import React, { Component, PropTypes } from 'react'
import CommentsList from './CommentsList'
import {Toggle} from '../mixins/Toggle';

class Article extends Component {
    static propTypes = {
        article: PropTypes.shape({
            title: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired
        })
    }
    render() {
        if (!this.props.article) return <span>No article</span>
        const {superToggle, isOpen , article} = this.props;
        const { text, title, comments } = article;
        const body = isOpen ? <section>{text}</section> : null;
        const commentsList = isOpen ? <CommentsList comments={comments} /> : null;
        return (
            <div>
                <a href = "#" onClick = {superToggle}>{title}</a>
                {body}
                {commentsList}
            </div>
        )
    }
}

export default Toggle(Article)