const defaults = {
	name: '',
	year: '',
	validation: false,
	paths: {
		rootPath: '',
		projectPath: '',
		yearPath: '',
		wordpressPath: '',
		themesPath: '',
		pluginsPath: ''
	}
}

const setupReducer = (state = defaults, action) => {

	switch (action.type) {

		case 'SET_NAME':
			state = {
				...state,
				name: action.payload
			}
			break;

		case 'SETUP_VALIDATION':
			state = {
				...state,
				validation: action.payload
			}
			break;

		case 'SET_YEAR':
			state = {
				...state,
				year: action.payload
			}
			break;

		case 'SET_PATH':
			state = {
				...state,
				paths: {
					...state.paths,
					...action.payload
				}
			}
			break;

		default: break;

	}

	return state;
}




export default setupReducer;