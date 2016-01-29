import React, { Component ,PropTypes } from 'react'
import { comments as CommentsStore } from '../stores'
import { Link } from 'react-router'

class CommentList extends Component{
    constructor(...args) {
        super(...args)
    }
    getLimit(){
        return 10
    }
    getOffset (page){
        const thisPage = page || (+this.props.params.page);
        return thisPage * this.getLimit() - this.getLimit()
    }
    state = {
        comments: CommentsStore.getOrLoadByOffset(this.getOffset(), this.getLimit())
    }
    componentWillReceiveProps(newProps) {
        this.commentsChange(newProps)
    }
    componentDidMount() {
        CommentsStore.addListener(this.commentsChange)
    }

    componentWillUnmount() {
        CommentsStore.removeListener(this.commentsChange)
    }
    commentsChange = (newProps) => {
        this.setState({
            comments: CommentsStore.getOrLoadByOffset(this.getOffset((newProps || this.props).params.page), this.getLimit())
        })
    }
    render() {
        let loading = <h3>Loading comments...</h3>;
        if (!CommentsStore.isLoadingByOffset(this.getOffset(),this.getLimit())){
            loading = null
        }
        
        const comments = this.state.comments.map((comment) => {
            if (!comment.text) return null
            return <li key = {comment.id}>{comment.text} <b> by {comment.user}</b>
            </li>
        })
        return (
            <div>
                {loading}
                <ul>{comments}</ul>
                {this.getPaginator()}
            </div>
        )
    }
    getPaginator(){
        const count = CommentsStore.getTotalComments();
        const countPage = Math.ceil(count / this.getLimit())
        let paginator = [];
        for (var i = 0; i < countPage; i++) {
            paginator.push(<Link key= {i} to={`/comments/${i+1}`} activeStyle={{color: '#000', textDecoration: 'none'}}>{i+1}</Link>)
        };
        return paginator.length > 0 ? paginator : null;
    }
}

export default CommentList