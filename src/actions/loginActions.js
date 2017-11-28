import {usersRef, settingsRef} from '../utils/firebase'
import {json, status, apiBaseUrl, authBaseUrl, getApiHeader, getAuthHeader} from '../utils/fetch';
let ipcRenderer = window.require('electron').ipcRenderer;

export const getUser = (dispatch) => {

  dispatch({
    type: 'SET_USER_STATUS',
    payload: {loaded: false, loading: true, error: false}
  });

  fetch(`${apiBaseUrl}/user`, { 
    headers: getApiHeader() 
  })
  .then(status)
  .then(json)
  .then(user => {

      const { name, login, avatar_url, id } = user;

      usersRef.child(id).set({name, login, avatar_url});
      settingsRef.child(id).set({
        setup: 'tbc',
        wordpress: 'tbc',
        plugins: 'tbc',
        github: 'tbc'
      })


      dispatch({
        type: 'SET_USER_STATUS',
        payload: {loaded: true, loading: false, error: false}
      });
  
      dispatch({ type: 'SET_USER', payload: { name, login, avatar_url, id, loggedIn: true } })
      dispatch({ type: 'SET_SECTION', payload: 'setup' })

  })
  .catch(e => {

    dispatch({
      type: 'SET_USER_STATUS',
      payload: {loaded: false, loading: false, error: true}
    });
    
  })

}

export const checkSignedIn = () => {
  return (dispatch, getState) => {

    if (localStorage.getItem('_wpLauncherAccess')) {
      getUser(dispatch);
    }

  }
}

export const setAuthError = () => {
  return (dispatch, getState) => {
    dispatch({
      type: 'SET_AUTH_STATUS',
      payload: {loaded: false, loading: false, error: true}
    });
  }
}


export const signIn = data => {
  return (dispatch, getState) => {

    dispatch({
      type: 'SET_AUTH_STATUS',
      payload: {loaded: false, loading: true, error: false}
    });

    const { code, config } = data;
    const { client_id, client_secret } = config;

    fetch(authBaseUrl, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify({ client_id, client_secret, code })
    })
    .then(status)
    .then(json)
    .then(data => {

        dispatch({
          type: 'SET_AUTH_STATUS',
          payload: {loaded: true, loading: false, error: false}
        });
  
        localStorage.setItem('_wpLauncherAccess', data.access_token);

        getUser(dispatch);

    })
    .catch(e => {
      
      dispatch({
        type: 'SET_AUTH_STATUS',
        payload: {loaded: false, loading: false, error: true}
      });
      
      ipcRenderer.send('authClearCookies');

    })
  }
}


export const signOut = () => {
  return (dispatch, getState) => {

    dispatch({
      type: 'SET_USER',
      payload: { name: '', login: '', avatar_url: '', id: '', loggedIn: false }
    })

    dispatch({
      type: 'SET_USER_STATUS',
      payload: {loaded: false, loading: false, error: false}
    });

    dispatch({
      type: 'SET_AUTH_STATUS',
      payload: {loaded: false, loading: false, error: false}
    });


    ipcRenderer.send('authClearCookies');
    localStorage.removeItem('_wpLauncherAccess')
    dispatch({ type: 'SET_SECTION', payload: 'login' })

  }
}


export const openAuthWindow = () => {
  return (dispatch, getState) => {
    ipcRenderer.send('openAuthWindow');
  }
}