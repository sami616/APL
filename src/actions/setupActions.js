const electron = window.require('electron');
const path = window.require('path');
const fs = window.require('fs');

// Validation
const validation = (...args) => {

  for (let a = 0; a < args.length; a++) {
    if (args[a] === '' || args[a] === undefined) {
      return false
    }
  }

  return true;

}


// Handle set year
export const setYear = year => {
  return (dispatch, getState) => {

    dispatch({
      type: 'SET_YEAR',
      payload: new Date().getFullYear().toString()
    });

  }
}

const isInvalid = str => {
  return /[§±@£€().~`!#$%^&*+=\\[\]';/,{} |":<>?]/g.test(str);
 }

// Handle key down
export const keyDown = e => {
  return (dispatch, getState) => {
    if(isInvalid(e.key)){
      e.preventDefault();
    }
  }
}

// Handle input change
export const onTextChange = e => {
  return (dispatch, getState) => {

    const name = e.target.value;
    const { rootPath } = getState().setup.paths;
    const { year } = getState().setup;

    let projectPath = path.join(rootPath, name);
    const yearPath = path.join(rootPath, name, year);
    const wordpressPath = path.join(rootPath, name, year, 'wordpress')
    const themesPath = path.join(rootPath, name, year, 'wordpress', 'wp-content', 'themes');
    const pluginsPath = path.join(rootPath, name, year, 'wordpress', 'wp-content', 'plugins');

    dispatch({
      type: 'SETUP_VALIDATION',
      payload: validation(rootPath, name)
    });

    dispatch({
      type: 'SET_NAME',
      payload: name
    });

    dispatch({
      type: 'SET_PATH',
      payload: { projectPath, yearPath, wordpressPath, themesPath, pluginsPath }
    })

  }
}

// Handle folder select
export const selectFolder = () => {
  return (dispatch, getState) => {

    let { name, year } = getState().setup;
    const { dialog } = electron.remote;

    let rootPath = dialog.showOpenDialog({ properties: ['openDirectory'] });
    if (rootPath === undefined) { return }
    rootPath = rootPath[0];

    const projectPath = path.join(rootPath, name);
    const yearPath = path.join(rootPath, name, year);
    const wordpressPath = path.join(rootPath, name, year, 'wordpress')
    const themesPath = path.join(rootPath, name, year, 'wordpress', 'wp-content', 'themes');
    const pluginsPath = path.join(rootPath, name, year, 'wordpress', 'wp-content', 'plugins');

    dispatch({
      type: 'SETUP_VALIDATION',
      payload: validation(rootPath, name)
    });

    dispatch({
      type: 'SET_PATH',
      payload: { rootPath, projectPath, yearPath, wordpressPath, themesPath, pluginsPath }
    })

  }
}

export const createFolders = () => {

  return (dispatch, getState) => {

    const { projectPath } = getState().setup.paths;

    fs.mkdir(projectPath, err => {

      if (err) {
        if (err.code === 'EEXIST') {
          new Notification('Error', { body: `Directory already exists` });
          return;
        }
      }

      let year = new Date().getFullYear().toString();
      let yearPath = path.join(projectPath, year);

      fs.mkdir(yearPath, err => {

        let proofsPath = path.join(projectPath, year, 'proofs');
        let wireframesPath = path.join(projectPath, year, 'wireframes');

        fs.mkdirSync(proofsPath);
        fs.mkdirSync(wireframesPath);
        dispatch({ type: 'SET_SECTION', payload: 'wordpress' })

      });

    })
  }

}
