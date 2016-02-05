export function increment() {
    return {
        type: 'INCREMENT'
    }
}

export function addArticle(data) {
    return {
        type: 'ADD_ARTICLE',
        data
    }
}

export function deleteArticle(id) {
    return {
        type: 'DELETE_ARTICLE',
        data : {
        	id
        }
    }
}