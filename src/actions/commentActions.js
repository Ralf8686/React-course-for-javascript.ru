import AppDispatcher from '../Dispatcher'
import { ADD_NEW_COMMENT, DELETE_COMMENT, LOAD_COMMENTS, LOAD_COMMENTS_BY_OFFSET } from './constants'
import { asyncAC } from './api/utils'
import { loadForArticle, loadByOffset} from './api/comment'

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

export const loadComments = asyncAC(LOAD_COMMENTS, loadForArticle)
export const loadCommentByOffset = asyncAC(LOAD_COMMENTS_BY_OFFSET, loadByOffset)