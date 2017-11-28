const path = window.require('path');
const fs = window.require('fs');
const request = window.require('request');
const unzip = window.require('unzip');
 

export const check = e => {
  return (dispatch, getState) => {

    let id = e.target.id;
    let bool = getState().wp[id]
    bool = !bool;

    dispatch({
      type: 'SET_WP_CHECKBOX',
      payload: { bool, id }
    });

  }

}

export const setInputVal = e => {
  return (dispatch, getState) => {

    let val = e.target.value;
    let id = e.target.id;

    dispatch({
      type: 'SET_WP_TEXT_INPUT',
      payload: { val, id }
    });

  }

}



export const downloadWP = () => {
  return (dispatch, getState) => {

    const { yearPath, wordpressPath } = getState().setup.paths;
    const { renameConfig, dbPrefix, dbName, dbUser, dbPass, dbHost } = getState().wp
    const zipPath = path.join(yearPath, 'wp.zip');


    dispatch({
      type: 'SET_WP_STATUS',
      payload: {downloaded: false, downloading: true, failed: false}
    });



    let url = 'https://wordpress.org/latest.zip';

    request({ url: url, timeout: 30000 })

      .on('error', err => {
        fs.unlinkSync(zipPath);
        

        dispatch({
          type: 'SET_WP_STATUS',
          payload: {downloaded: false, downloading: false, failed: true}
        });

        new Notification('Error', { body: 'There was a problem downloading Wordpress' });
        return;
      })

      .pipe(fs.createWriteStream(zipPath))

      .on('finish', () => {



        fs.createReadStream(zipPath)
          .pipe(unzip.Extract({ path: yearPath }))
          .on('finish', () => {

            fs.unlinkSync(zipPath);


            let wpConfigPath = path.join(wordpressPath, 'wp-config-sample.php');

            if (renameConfig) {
              wpConfigPath = path.join(wordpressPath, 'wp-config.php');
              let wpConfigSample = path.join(wordpressPath, 'wp-config-sample.php');
              fs.renameSync(wpConfigSample, wpConfigPath);
            }


            fs.readFile(wpConfigPath, 'utf8', function (err, data) {

              if (err) { return console.log(err) }

              let result;
              result = data.replace('wp_', dbPrefix);
              result = result.replace('database_name_here', dbName);
              result = result.replace('username_here', dbUser);
              result = result.replace('password_here', dbPass);
              result = result.replace('localhost', dbHost);

              fs.writeFile(wpConfigPath, result, 'utf8', function (err) {
                if (err) { return console.log(err) }
              });

            });

            dispatch({
              type: 'SET_WP_STATUS',
              payload: {downloaded: true, downloading: false, failed: false}
            });

            dispatch({ type: 'SET_SECTION', payload: 'plugins' });

          })

      })


  }
}