import AppDispatcher from '../../Dispatcher'

export function asyncAC(type, apiCall, data) {
    return () => {
        console.log(data);
        AppDispatcher.dispatch({
            type: `${type}_START`,
            data
        })

        apiCall()
            .done((response) => {
                AppDispatcher.dispatch({
                    type: `${type}_SUCCESS`,
                    data: { response, request: data }
                })
            })
            .fail((error) => {
                AppDispatcher.dispatch({
                    type: `${type}_FAIL`,
                    data: { error }
                })
            })
    }
}