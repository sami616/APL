const path = window.require('path');
const fs = window.require('fs');
const request = window.require('request');
const unzip = window.require('unzip');

const getIndex = (plugins, id) => {

  let i;

  plugins.forEach((plugin, index) => {
    if (plugin.id === id) {
      i = index;
    }
  });

  return i;

}

const checkDownloading = plugins => {

  let downloading = false;

  for (let p = 0; p < plugins.length; p++) {
    if (plugins[p].downloading) { downloading = true; break; }
  }

  return downloading;
}





export const nextSection = () => {
  return (dispatch, getState) => {

    var commandExists = window.require('command-exists');
        
    commandExists('git', (err, commandExists) => {
    
       if(commandExists) {
        dispatch({ type: 'SET_SECTION', payload: 'github' });
       } else {
        dispatch({type: 'SET_SECTION', payload: 'end' })
       }
    
    });
   
  }
}

export const triggerDL = (plugin) => {

  return (dispatch, getState) => {
    const { pluginsPath } = getState().setup.paths;
    const { id, url } = plugin
    let plugins = [...getState().plugin.plugins];
    let i = getIndex(plugins, id);
    let clicked = plugins[i];

    clicked.checked = true;
    clicked.downloaded = false;
    clicked.downloading = true;
    clicked.failed = false;

    dispatch({ type: 'SET_DOWNLOADING', payload: checkDownloading(plugins) });
    dispatch({ type: 'SET_PLUGIN', payload: plugins })

    const zipPath = path.join(pluginsPath, `${id}.zip`);

    request({ url: url, timeout: 30000 })

      .on('error', err => {

        fs.unlinkSync(zipPath);
        clicked.checked = false;
        clicked.downloaded = false;
        clicked.downloading = false;
        clicked.failed = true;

        dispatch({ type: 'SET_DOWNLOADING', payload: checkDownloading(plugins) });
        dispatch({ type: 'SET_PLUGIN', payload: plugins })
        new Notification('Error', { body: `There was a problem downloading ${clicked.label}` });
        return;
      })

      .pipe(fs.createWriteStream(zipPath))

      .on('finish', () => {

        fs.createReadStream(zipPath)
          .pipe(unzip.Extract({ path: pluginsPath }))
          .on('finish', () => {
            fs.unlinkSync(zipPath);
          })

        clicked.downloaded = true;
        clicked.downloading = false;

        dispatch({ type: 'SET_DOWNLOADING', payload: checkDownloading(plugins) });
        dispatch({ type: 'SET_PLUGIN', payload: plugins })
      })

  }
}

