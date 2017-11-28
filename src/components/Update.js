import React, {Component} from 'react';
import styled from 'styled-components';
import {Loader, Button, Flex} from './UI';
let ipcRenderer = window.require('electron').ipcRenderer;

class Update extends Component {

    state = {
        available: false,
        version: null,
        downloaded: false,
        downloading: false
    }

    componentDidMount() {

        ipcRenderer.on('updateAvailable', (event, info) => {
            this.setState({ available: true, version: info.version })
        })

        ipcRenderer.on('updateDownloaded', (event, info) => {
            this.setState({ downloaded: true, downloading: false })
        })

    }

    downloadUpdate = () => {
        this.setState({downloading: true});
        ipcRenderer.send('downloadUpdate');
    }

    quitAndInstall = () => {
        ipcRenderer.send('quitAndInstall');
    }

    renderDownload = () => (
        <Flex>
            <Action onClick={this.downloadUpdate}>Download</Action>
            <ActionLink href="https://github.com/sami616/APL/releases/latest" target="_blank">Info</ActionLink>
        </Flex>
    );

    renderDownloading = () => (
        <Flex>Downloading <Loader margin="0 0 0 10px" size={15}/></Flex>
    );

    renderDownloaded = (func) => (
        <Action onClick={this.quitAndInstall}>Quit and install</Action>
    );

    renderUpdateAvailable = () => {

        const {downloaded, downloading, version} = this.state;

        return (
            <Notification>
                <div><V>{version}</V>Update available</div>
                {!downloaded && !downloading && this.renderDownload()}
                {downloading && !downloaded && this.renderDownloading()}
                {downloaded && !downloading && this.renderDownloaded()}
            </Notification>
        );
    }
    
    render(){
        const {available} = this.state;
        return available && this.renderUpdateAvailable()
    }
}

export default Update

const Notification = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    padding: 7px;
    font-size: 16px;
    color: #fff;
    border: none;
    background: #ff5c82;
    font-family: RobotoLight;
`
const V = styled.span`
    background: #e64e71;
    padding: 5px;
    font-size: 13px;
    border-radius: 4px;
    margin: 0 10px 0 0;
    display: inline-block;
`
const Action = Button.extend`
    padding: 5px 9px;
    color: orange;
    font-size: 14px;
    background: #e64e71;
    color: #fff;
    margin: 0;
    width: auto;
    margin: 2px;
    text-decoration: none;
    font-family: RobotoLight;
    &:hover {
        color: #e64e71;
        background: #ffffff;
    }
`

const ActionLink = Action.withComponent('a')