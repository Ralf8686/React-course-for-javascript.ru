import React, { Component, PropTypes } from 'react'
import Comment from './Comment'
import {Toggle} from '../mixins/Toggle';

class CommentsList extends Component {
    static propTypes = {
        comments: PropTypes.array.isRequired
    }
    render() {
        if (!this.props.comments.length) return <p>No comments</p>
        const { comments, superToggle, isOpen } = this.props
        const commentsItems = isOpen ? comments.map((comment) => <li key = {comment.id} >
            <Comment comment = {comment} ref= {comment.id.toString()} />
        </li>) : null;
        const controll = <a href = "#" onClick = {superToggle}>{isOpen ? "Hide" : "Show"} comment</a>;
        return (
            <div>
                {controll}
                <ul>{commentsItems}</ul>
            </div>
        )
    }
}

export default Toggle(CommentsList);