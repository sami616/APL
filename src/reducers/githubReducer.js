const defaults = {
	searchTerm: '',
	repos: [],
	orgs: [],
	dataLoading: false,
	dataLoaded: false,
	dataError: false,
	building: false,
	built: false,
	buildError: false,
	repoSelected: false,
	createRepo: false,
	errMsg: '',
	commitPush: false,
	createAs: '',
	privateRepo: false,
	validated: true,
	repoName: '',
	installPath: '',
}

const githubReducer = (state = defaults, action) => {

	switch (action.type) {

		case 'SET_GIT_CHECKBOX':
			state = {
				...state,
			}
			state[action.payload.id] = action.payload.bool;
			break;

		case 'SET_REPO_SELECTED':
			state = {
				...state,
				repoSelected: action.payload
			}
			break;

		case 'SET_GIT_VALIDATED':
			state = {
				...state,
				validated: action.payload
			}
			break;

		case 'SET_ORGS':
			state = {
				...state,
				orgs: action.payload
			}
			break;

		case 'SET_INSTALL_PATH':
			state = {
				...state,
				installPath: action.payload
			}
			break;

		case 'SET_CREATE_AS':
			state = {
				...state,
				createAs: action.payload
			}
			break;

		case 'SET_REPO_NAME':
			state = {
				...state,
				repoName: action.payload
			}
			break;

		case 'SET_GIT_TEXT_INPUT':
			state = {
				...state,
			}
			state[action.payload.id] = action.payload.val;
			break;

		case 'SET_REPOS':
			state = {
				...state,
				repos: [...action.payload]
			}
			break;

		case 'SET_MASTER_REPOS':
			state = {
				...state,
				masterRepos: [...action.payload]
			}
			break;

		case 'SET_GIT_STATUS':
			state = {
				...state,
				dataLoading: action.payload.loading,
				dataLoaded: action.payload.loaded,
				dataError: action.payload.error,
			}
			break;

		case 'SET_BUILD_STATUS':
			state = {
				...state,
				building: action.payload.building,
				built: action.payload.built,
				buildError: action.payload.error,
				errMsg: action.payload.errMsg
			}
			break;


		default: break;

	}

	return state;
}


export default githubReducer;