import AppDispatcher from '../Dispatcher'
import { ADD_NEW_COMMENT, DELETE_COMMENT, LOAD_COMMENTS, LOAD_COMMENTS_PAGE, SET_COMMENTS_FILTER_USER } from './constants'
import { asyncAC } from './api/utils'
import { loadCommentsForArticle, loadPage } from './api/comment'

export function addComment(article, text, author) {
/**
    common problems:
        -generating ids here on in UI
        -generating id as comments.length
        -getting id from store but in AC
*/
    AppDispatcher.dispatch({
        type: ADD_NEW_COMMENT,
        data: {
            article,
            text,
            author
        }
    })
}

export function deleteComment(id, article) {
    AppDispatcher.dispatch({
        type: DELETE_COMMENT,
        data: {
            id,
            article
        }
    })
}

export function setFilterUser(user) {
    AppDispatcher.dispatch({
        type: SET_COMMENTS_FILTER_USER,
        data: {
            user
        }
    })
}

export const loadComments = asyncAC(LOAD_COMMENTS, loadCommentsForArticle)
export const loadForPage = asyncAC(LOAD_COMMENTS_PAGE, loadPage)