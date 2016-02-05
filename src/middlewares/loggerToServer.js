export default store => next => action => {
	const body = {
		stateBefore: null,
		action: null,
		stateAfter: null
	};
    body.stateBefore = store.getState();
    body.action = action;
    next(action)
    body.stateAfter = store.getState();
    fetch('/api/report', {
    	method: 'post',
    	body: JSON.stringify(body)}
    ).then(function (data) {
    	console.log('report done')
    });
}