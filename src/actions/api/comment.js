import $ from 'jquery'

export function loadCommentByArticle(article) {
	return () => {
		return $.get('/api/comment', {article})
	}
}