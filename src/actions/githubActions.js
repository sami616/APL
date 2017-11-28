import { json, status, apiBaseUrl, getApiHeader } from '../utils/fetch';
const electron = window.require('electron');
const { exec } = window.require('child_process');
const path = window.require('path');
const rimraf = window.require('rimraf');

export const build = () => {
  return (dispatch, getState) => {

    dispatch({
      type: 'SET_BUILD_STATUS',
      payload: { building: true, built: false, error: false }
    });

    const { repoSelected, createRepo, commitPush, createAs, orgs, privateRepo, repoName, installPath } = getState().github;

    if (repoSelected) {

      if (repoSelected && !createRepo) {
        exec(`cd ${installPath} && git clone ${repoSelected.cloneUrl}`, err => {


          if (err) {

            dispatch({
              type: 'SET_BUILD_STATUS',
              payload: { building: false, built: false, error: true, errMsg: `There was a problem cloning ${repoSelected.name}` }
            });
            return;
          }

          let gitFolder = path.join(installPath, repoSelected.name, '.git');
          let localDir = path.join(installPath, repoSelected.name);

          rimraf(gitFolder, () => {

            exec(`cd ${localDir} && git init`, err => {

              dispatch({
                type: 'SET_BUILD_STATUS',
                payload: { building: false, built: true, error: false }
              });

              dispatch({
                type: 'SET_SECTION',
                payload: 'end'
              })

            })

          })

        })
      }

      if (repoSelected && createRepo) {

        // If createAs is the first item in the orgs array
        // we know we are cloning as the user and not an org

        let i;

        orgs.forEach((org, index) => {
          let login = org.login;
          if (login === createAs) {
            i = index;
          }
        })

        let isUser = i === 0 ? true : false;
        let apiCreateUrl = isUser ? `${apiBaseUrl}/user/repos` : `${apiBaseUrl}/orgs/${createAs}/repos`

        let body = {
          name: repoName,
          private: privateRepo
        }

        // API CALL
        fetch(apiCreateUrl, {
          method: 'POST',
          headers: getApiHeader(),
          body: JSON.stringify(body)
        })
          .then(status)
          .then(json)
          .then(repo => {

            let newRepoURL = repo.clone_url;

            exec(`cd ${installPath} && git clone ${repoSelected.cloneUrl} ${repoName}`, err => {

              if (err) {

                dispatch({
                  type: 'SET_BUILD_STATUS',
                  payload: { building: false, built: false, error: true, errMsg: `There was a problem cloning ${repoSelected.name}` }
                });
                return;
              }

              if (commitPush) {

                let localDir = path.join(installPath, repoName);
                let gitFolder = path.join(installPath, repoName, '.git');

                rimraf(gitFolder, () => {

                  exec(`cd ${localDir} && git init`, err => {

                    exec(`cd ${localDir} && git remote add origin ${newRepoURL}`, err => {

                      exec(`cd ${localDir} && git add .`, err => {

                        exec(`cd ${localDir} && git commit -m "initial commit"`, err => {

                          exec(`cd ${localDir} && git push origin master`, err => {
                            if (err) {

                              dispatch({
                                type: 'SET_BUILD_STATUS',
                                payload: { building: false, built: false, error: true, errMsg: `There was a problem pushing you repository` }
                              });

                              return
                            }

                            dispatch({
                              type: 'SET_BUILD_STATUS',
                              payload: { building: false, built: true, error: false }
                            });

                            dispatch({
                              type: 'SET_SECTION',
                              payload: 'end'
                            })

                          })

                        })

                      })

                    })

                  });

                });


              } else {

                dispatch({
                  type: 'SET_BUILD_STATUS',
                  payload: { building: false, built: true, error: false }
                });

                dispatch({
                  type: 'SET_SECTION',
                  payload: 'end'
                })

              }
            })




          })
          .catch(e => {

            dispatch({
              type: 'SET_BUILD_STATUS',
              payload: { building: false, built: false, error: true, errMsg: "There was a problem creating your repository, if you have selected private please make sure your account has the privelages" }
            });

          })


      }

    } else {


      dispatch({
        type: 'SET_BUILD_STATUS',
        payload: { building: false, built: false, error: false }
      });

      dispatch({
        type: 'SET_SECTION',
        payload: 'end'
      });

    }

  }
}


export const check = e => {
  return (dispatch, getState) => {

    let id = e.target.id;
    let bool = getState().github[id]
    bool = !bool;

    dispatch({
      type: 'SET_GIT_CHECKBOX',
      payload: { bool, id }
    });

    validation(dispatch, getState);

  }

}

const validation = (dispatch, getState) => {

  let { repoName } = getState().github;
  let { createRepo, repoSelected } = getState().github;

  if (repoName === '' && createRepo && repoSelected) {
    dispatch({ type: 'SET_GIT_VALIDATED', payload: false })
  } else {
    dispatch({ type: 'SET_GIT_VALIDATED', payload: true })
  }

}

const isInvalid = str => {
  return /[§±@£€().~`!#$%^&*+=\\[\]';/,{} |":<>?]/g.test(str);
}

export const orgSelect = e => {
  return (dispatch, getState) => {
    let org = e.target.value;

    dispatch({
      type: 'SET_CREATE_AS',
      payload: org,
    });

  }
}

// Handle key down
export const keyDown = e => {
  return (dispatch, getState) => {
    if (isInvalid(e.key)) {
      e.preventDefault();
    }
  }
}


export const filter = e => {
  return (dispatch, getState) => {
    let searchTerm = e.target.value;
    const repos = [...getState().github.repos];

    if(searchTerm){
      

      repos.forEach((repo,index) => {

        if(searchTerm !== '' && searchTerm.trim().length > 0) {
            if(repo.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
              repos[index].hidden = false;
            } else {
              repos[index].hidden = true;
            }
        }
      
      })

      dispatch({
        type: 'SET_REPOS',
        payload: repos
      });
      
    } else {

      repos.forEach((repo,index) => {
        repos[index].hidden = false
      });

      dispatch({
        type: 'SET_REPOS',
        payload: repos
      });

    }
  }
}

export const setInputVal = e => {
  return (dispatch, getState) => {

    let val = e.target.value;
    let id = e.target.id;

    dispatch({
      type: 'SET_GIT_TEXT_INPUT',
      payload: { val, id }
    });


    validation(dispatch, getState);

  }

}




// Handle folder select
export const selectFolder = () => {
  return (dispatch, getState) => {

    const { dialog } = electron.remote;
    let defaultPath = getState().github.installPath;

    let rootPath = dialog.showOpenDialog({ defaultPath: defaultPath, properties: ['openDirectory'] });
    if (rootPath === undefined) { return }
    rootPath = rootPath[0];

    dispatch({
      type: 'SET_INSTALL_PATH',
      payload: rootPath
    })

  }
}


export const setDefaults = (dispatch, getState) => {

  const { themesPath } = getState().setup.paths;
  const { login } = getState().user
  const { name, year } = getState().setup;

  dispatch({
    type: 'SET_INSTALL_PATH',
    payload: themesPath
  });

  dispatch({
    type: 'SET_REPO_NAME',
    payload: `${name}-${year}-theme`
  });

  dispatch({
    type: 'SET_CREATE_AS',
    payload: login,
  });

}



export const setRepoName = name => {
  return (dispatch, getState) => {

    dispatch({
      type: 'SET_REPO_NAME',
      payload: name
    });

  }
}


export const checkRepo = e => {
  return (dispatch, getState) => {


    let name = e.target.id;
    let repos = [...getState().github.repos]
    let index;
    let repoSel;


    for (let r = 0; r < repos.length; r++) {
      if (repos[r].name === name) {
        if (!repos[r].checked) { index = r }
      }
      repos[r].checked = false;
    }

    if (index >= 0) {
      repoSel = {
        cloneUrl: repos[index].cloneUrl,
        name: repos[index].name
      }

      dispatch({ type: 'SET_CLONE_FOLD_NAME', payload: repoSel.name })
      repos[index].checked = true;

    } else {

      repoSel = false;
      dispatch({ type: 'SET_CLONE_FOLD_NAME', payload: '' })

    }

    dispatch({ type: 'SET_REPO_SELECTED', payload: repoSel });
    dispatch({ type: 'SET_REPOS', payload: repos });

    validation(dispatch, getState);

  }

}


export const getUserData = () => {
  return (dispatch, getState) => {


    dispatch({
      type: 'SET_GIT_STATUS',
      payload: { loaded: false, loading: true, error: false }
    });


    const urls = [
      `${apiBaseUrl}/user/repos`,
      `${apiBaseUrl}/user/orgs`
    ];

    let promises = urls.map(url => fetch(url, { headers: getApiHeader() }).then(status).then(json));

    Promise.all(promises).then(d => {

      // Repos 
      let reposData = d[0];
      let repos = [];
      reposData.forEach(repo => {
        repos.push({
          name: repo.name,
          checked: false,
          cloneUrl: repo.clone_url,
          ownerName: repo.owner.login,
          ownerAvatar: repo.owner.avatar_url,
          id: repo.id
        })
      })

      dispatch({ type: 'SET_REPOS', payload: repos })


      // Orgs
      let orgs = [];
      let orgsData = d[1];
      orgsData.forEach(org => {
        orgs.push({
          login: org.login,
          orgAvatar: org.avatar_url,
        })
      })

      orgs.unshift({
        login: getState().user.login,
        orgAvatar: getState().user.avatar_url,
      });

      dispatch({ type: 'SET_ORGS', payload: orgs })

      setDefaults(dispatch, getState);


      dispatch({
        type: 'SET_GIT_STATUS',
        payload: { loaded: true, loading: false, error: false }
      });


    }).catch(e => {


      dispatch({
        type: 'SET_GIT_STATUS',
        payload: { loaded: false, loading: false, error: true }
      });


    });

  }
}
