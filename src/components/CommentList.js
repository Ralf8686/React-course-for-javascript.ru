import React, { PropTypes } from 'react'
import ToggleOpen from '../mixins/ToggleOpen'
import linkedState from 'react-addons-linked-state-mixin'
import {addComment, deleteComment} from '../actions/commentActions'

import { comments as commentStore } from '../stores'


const CommentList = React.createClass({
    mixins: [ToggleOpen, linkedState],

    propTypes: {
        article: PropTypes.object
    },
    getInitialState() {
        const {id} = this.props.article
        return {
            newComment: '',
            loading : commentStore.isLoadingByArticleId(id)
        }
    },
    render: function() {
        const { article } = this.props
        if (!article || !article.getRelation('comments')) return null
        const comments = article.getRelation('comments')
        return (
            <div>
                <a href = "#" onClick = {this.getComments}>comments: {comments.length}</a>
                {this.state.isOpen ? this.getBody(comments) : null}
                
            </div>
        )
    },
    getBody(comments) {
        const {id} = this.props.article
        if(commentStore.isLoadingByArticleId(id)) return <p>Loading</p>
        const commentsList = comments.map((comment) => {
            if (!comment.text) return null
            return <li key = {comment.id}>{comment.text} <b> by {comment.author}</b>
                <a href = "#" onClick = {this.deleteComment(comment.id)} >delete</a>
            </li>
        })
        commentsList.push(<li key = 'new_comment'>
            <input valueLink = {this.linkState("newComment")}/>
            <a href = "#" onClick={this.addComment}>add comment</a>
        </li>)
        return (
            <ul>{commentsList}</ul>
        )
    },
    getComments(env) {
        this.toggleOpen(env);
        if(this.state.isOpen === false) commentStore.getOrLoadByArticleId(this.props.article.id)
      },

    addComment(ev) {
        ev.preventDefault()
        addComment(this.props.article.id, this.state.newComment)
    },

    deleteComment(id) {
        return (ev) => {
            ev.preventDefault()
            deleteComment(id, this.props.article.id)
        }
    }
});

export default CommentList