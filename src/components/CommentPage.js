import React, {Component} from 'react';
import {loadCommentsByLimitOffset} from '../actions/commentActions'
class CommentPage extends Component {
	render() {
		return (
			<div>
				<h1>Comments</h1>
				{this.props.children}
			</div>
		);
	}
}

export default CommentPage