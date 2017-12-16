import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as loginActions from '../../actions/loginActions';
import { SectionWrap, Button, Msg, Icon, Loader, MaxWidth, Ul, SlideIn } from '../UI';
import githubIcon from '../../assets/github.svg';
import alert from '../../assets/alert.svg';
import {Transition} from 'react-transition-group';

let ipcRenderer = window.require('electron').ipcRenderer;

class Login extends Component {

	componentWillMount() {

		this.props.checkSignedIn();

		ipcRenderer.removeAllListeners('receivedCode')
		ipcRenderer.removeAllListeners('receivedErr')

		ipcRenderer.on('receivedCode', (e, data) => {
			this.props.signIn(data);
		})

		ipcRenderer.on('receivedErr', () => {
			this.props.setAuthError();
			ipcRenderer.send('authClearCookies');
		})

	}

	renderLoginForm = () => {
		const { authError } = this.props.user;
		return (
			<SlideIn>
				<Ul>
					<Auth>
						{authError && this.renderAuthError()}
						<Icon margin="0 auto 20px" src={githubIcon} size={60} />
						<Button onClick={this.props.openAuthWindow} primary>Login with GitHub</Button>
					</Auth>
				</Ul>
			</SlideIn>
		)
	}

	renderAuthError = () => (
		<Msg margin="0 0 20px 0"><Icon src={alert} size={25} margin="0 10px 0 0" />There was a problem authenticating, please try again</Msg>
	)


	renderUserError = () => {
		return (
			<Msg><Icon src={alert} clickable size={25} margin="0 10px 0 0" onClick={this.props.checkSignedIn} />Please check your connection. Retry?</Msg>
		);
	}

	renderUserLoading = () => {
		return (
			<Msg><Loader margin="0 10px 0 0" size={25} col="#a5a2a2" />Loading profile </Msg>
		);
	}

	renderLoadingAuth = () => {
		return (
			<Msg><Loader margin="0 10px 0 0" size={25} col="#a5a2a2" />Authenticating </Msg>
		);
	}

	render() {

		const { userLoading, userError, authLoading } = this.props.user;

		return (
			<SectionWrap>
				<MaxWidth>
					{authLoading && this.renderLoadingAuth()}
					{userLoading && this.renderUserLoading()}
					{!userLoading && !userError && !authLoading && this.renderLoginForm()}
					{userError && this.renderUserError()}
				</MaxWidth>
			</SectionWrap>
		);

	}

}

const mapStateToProps = state => ({
	user: state.user
})

export default connect(mapStateToProps, { ...loginActions })(Login);


const Auth = styled.div`
	padding: 20px;
`