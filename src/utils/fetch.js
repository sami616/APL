export const status = r => {
    if (r.status === 200 || r.status === 201) {
        return Promise.resolve(r)
    } else {
        return Promise.reject(new Error(r.statusText))
    }
}

export const json = r => r.json();

// Api Stuff
export const apiBaseUrl = 'https://api.github.com';
export const getApiHeader = () => new Headers({ 'Authorization': `token ${localStorage.getItem('_wpLauncherAccess')}` });


// Auth Stuff

export const authBaseUrl = 'https://github.com/login/oauth/access_token';
export const getAuthHeader = () => new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' })