import $ from 'jquery'

export function loadForArticle(id) {
    return $.get(`/api/comment?article=${id}`)
}

export function loadByOffset(offset, limit) {
    return $.get(`/api/comment?offset=${offset}&limit=${limit}`)
}