import AppDispatcher from '../Dispatcher'
import { ADD_NEW_COMMENT, DELETE_COMMENT, LOAD_COMMENTS } from './constants'
import { loadCommentByArticle } from './api/comment'
import { asyncAC } from './api/utils'
export function addComment(article, text) {
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
            text
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

export const loadComments = (id) => {
    return asyncAC(LOAD_COMMENTS, loadCommentByArticle(id), {id})()
}
