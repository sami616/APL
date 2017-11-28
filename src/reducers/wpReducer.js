const defaults = {
    renameConfig: false,
    generateAuth: false,
    dbPrefix: 'wp_',
    dbName: 'database_name_here',
    dbUser: 'username_here',
    dbPass: 'password_here',
    dbHost: 'localhost',
    downloading: false,
    downloaded: false,
    failed: false,
}


const wpReducer = (state = defaults, action) => {
    switch (action.type) {

        case 'SET_WP_STATUS':
            state = {
                ...state,
                downloading: action.payload.downloading,
                downloaded: action.payload.downloaded,
                failed: action.payload.failed,
            }
            break;

        case 'SET_WP_CHECKBOX':
            state = {
                ...state,
            }
            state[action.payload.id] = action.payload.bool;
            break;

        case 'SET_WP_TEXT_INPUT':
            state = {
                ...state,
            }
            state[action.payload.id] = action.payload.val;
            break;


        default: break;
    }

    return state;
}

export default wpReducer;