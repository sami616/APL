const defaults = {
	section: 'login',
	sections: ['login', 'setup', 'wordpress', 'plugins', 'github', 'end'],
}

const navReducer = (state = defaults, action) => {

	switch (action.type) {

		case 'SET_SECTION':
			state = {
				...state,
				section: action.payload
			}
			break;

		default: break;

	}

	return state;
}




export default navReducer;