import React, { Component, PropTypes } from 'react';

class Comment extends Component {
    static propTypes = {
        comment: PropTypes.shape({
            author: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired
        })
    }
    render() {
        const { text, author} = this.props.comment;
        return (
            <div>
                <p>{`Author: ${author}`}</p>
                <p>{`Text: ${text}`}</p>
            </div>
        )
    }
};

export default Comment;