import $ from 'jquery'

export function loadCommentsForArticle(id) {
    return $.get(`/api/comment?article=${id}`)
}

export function loadPage(num) {
	let offset = (num - 1) * 10;
	let limit = 10;
	if(num === 'all'){
		offset = 0
		limit = 999
	}
	return $.get(`/api/comment?limit=${limit}&offset=${offset}`)
}

export function loadAll() {
    return $.get(`/api/comment`)
}
