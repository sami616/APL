const defaults = {
	userLoading: false,
	userLoaded: false,
	userError: false,
	authLoading: false,
	authLoaded: false,
	authError: false,
	loggedIn: false,
	name: '',
	login: '',
	avatar_url: '',
	id: ''
}

const userReducer = (state = defaults, action) => {

	switch (action.type) {

		case 'SET_USER':
			state = {
				...state,
				...action.payload
			}
			break;

		case 'SET_USER_STATUS':
			state = {
				...state,
				userLoading: action.payload.loading,
				userLoaded: action.payload.loaded,
				userError: action.payload.error,
			}
			break;

		case 'SET_AUTH_STATUS':
			state = {
				...state,
				authLoading: action.payload.loading,
				authLoaded: action.payload.loaded,
				authError: action.payload.error,
			}
			break;

		default: break;

	}

	return state;
}


export default userReducer;