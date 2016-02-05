import {articles} from '../fixtures'

let incrementId = 100;

export default (state = articles, action) => {
    const { type, data } = action

    switch (type) {
        case 'ADD_ARTICLE':
            return [...state, {
                title: data.title,
                id: incrementId++
            }]
            break;
        case 'DELETE_ARTICLE':
            const deleteIndex = state.findIndex((el) => el.id === data.id)
            return [
              ...state.slice(0, deleteIndex),
              ...state.slice(deleteIndex + 1)
            ]
            break;
    }

    return state
}