import AppDispatcher from '../Dispatcher'

import Store from './Store'
import { ADD_NEW_COMMENT, DELETE_COMMENT, LOAD_ARTICLES_SUCCESS, LOAD_COMMENTS_START, LOAD_COMMENTS_SUCCESS} from '../actions/constants'
import { loadComments } from '../actions/commentActions'
class CommentsStore extends Store {
    constructor(...args) {
        super(...args)
        this.loaded = [];
        this.loading = [];
        this.dispatchToken = AppDispatcher.register((action) => {
            const { type, data } = action

            switch (type) {
                case ADD_NEW_COMMENT:
                    this.add(Object.assign({
                        id: this.getIncrementalId(),
                        text: ''
                    },data))

                    break;

                case DELETE_COMMENT:
                    this.delete(data.id)
                    break;

                // case LOAD_ARTICLES_SUCCESS:
                //     data.response.forEach((article) => {
                //         if (!article.comments) return
                //         article.comments.forEach((id) => {
                //             this.add({ id })
                //         })
                //     })
                //     this.emitChange()
                //     break;
                case LOAD_COMMENTS_START:
                    this.loading.push(data.id)
                    this.emitChange()
                    break;
                case LOAD_COMMENTS_SUCCESS:
                    this.loading.splice(this.loading.indexOf((el) => data.request.id), 1)
                    this.loaded.push(data.request.id)
                    data.response.forEach(this.add.bind(this))
                    this.emitChange()
                    break;
            }
        })
    }
    isLoadingByArticleId(id){
        return this.loading.some((el) => el === id);
    }
    isLoadedByArticleId(id){
        return this.loaded.some((el) => el === id);
    }

    getOrLoadByArticleId(id) {
        if (!this.isLoadingByArticleId(id) && !this.isLoadedByArticleId(id)) loadComments(id)
    }
}

export default CommentsStore