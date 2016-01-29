import AppDispatcher from '../Dispatcher'

import Store from './Store'
import { ADD_NEW_COMMENT, DELETE_COMMENT, LOAD_ARTICLES_SUCCESS,
    LOAD_COMMENTS_START, LOAD_COMMENTS_FAIL, LOAD_COMMENTS_SUCCESS,
    LOAD_COMMENTS_BY_OFFSET_START, LOAD_COMMENTS_BY_OFFSET_FAIL, LOAD_COMMENTS_BY_OFFSET_SUCCESS
} from '../actions/constants'
import { loadCommentByOffset } from '../actions/commentActions'

class CommentStore extends Store {
    constructor(...args) {
        super(...args)
        this.loading = []
        this.loaded = []
        this.itemsOrder = []
        this.totalComments = 0;
        this.loadedByOffset = [];
        this.loadingByOffset = [];
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
                case LOAD_ARTICLES_SUCCESS:
                    data.response.forEach((article) => {
                        if (!article.comments) return
                        article.comments.forEach((id) => {
                            this.add({ id })
                        })
                    })
                    this.emitChange()
                    break;

                case LOAD_COMMENTS_START:
                    this.loading.push(data.args[0])
                    this.emitChange()
                    break;

                case LOAD_COMMENTS_SUCCESS:
                    this.loading = this.loading.filter(id => id != data.args[0])
                    this.loaded.push(data.args[0])
                    data.response.forEach(this.add.bind(this))
                    this.emitChange()
                    break;

                case LOAD_COMMENTS_FAIL:
                    this.loading = this.loading.filter(id => id != data.args[0])
                    this.emitChange()
                    break;

                case LOAD_COMMENTS_BY_OFFSET_START:
                    this.loadingByOffset.push(''+data.args[0] + data.args[1]);
                    this.emitChange()
                    break;

                case LOAD_COMMENTS_BY_OFFSET_SUCCESS:
                    let offset = data.args[0],
                        limit = data.args[1];
                    let idPage = ''+offset + limit;
                    this.loadingByOffset = this.loadingByOffset.filter(id => id != idPage)
                    this.loadedByOffset.push(idPage);
                    data.response.records.forEach(this.add.bind(this))
                    this.addByOffset(offset, limit, data.response.records)
                    this.setTotalComments(data.response.total)
                    this.emitChange()
                    break;

                case LOAD_COMMENTS_BY_OFFSET_FAIL:
                    this.emitChange()
                    break;
                
            }
        })
    }
    setTotalComments(count){
        return this.totalComments = count;
    }
    getTotalComments(){
        return this.totalComments;
    }
    addByOffset(offset, limit , data){
        for (var i = 0, j = data.length; i < j; i++) {
            this.itemsOrder[i + offset] = data[i].id;
        }
    }
    isLoadedByOffset(offset, limit){
        return this.loadedByOffset.indexOf(''+offset + limit) >= 0;
    }
    isLoadingByOffset(offset, limit){
        return this.loadingByOffset.indexOf(''+offset + limit) >= 0;
    }
    getOrLoadByOffset(offset, limit) {
        console.log(arguments)
        if (!this.isLoadedByOffset(offset, limit) && !this.isLoadingByOffset(offset, limit)){
            loadCommentByOffset(offset, limit)
        }
        const comments = this.itemsOrder
                .slice(offset, offset + limit + 1)
                .map((el) => this.getById(el))
        return comments.length > 0 && comments[0].text ? comments : [];
    }

}

export default CommentStore