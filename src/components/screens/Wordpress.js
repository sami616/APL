import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as wpActions from '../../actions/wpActions';
import { SectionWrap, Msg, SectionHeader, Button, Input, Loader, Ul, Li, CheckBox, Label, TextLabel, MaxWidth, Icon } from '../UI';
import alert from '../../assets/alert.svg';

class Wordpress extends Component {

	renderDownloading = () => (
		<SectionWrap>
			<MaxWidth>
				<Msg>
					<Loader margin="0 10px 0 0" size={25} col="#a5a2a2" />Installing Wordpress
				</Msg>
			</MaxWidth>
		</SectionWrap>
	)

	renderFailed = () => (
		<SectionWrap>
			<MaxWidth>
				<Msg><Icon src={alert} clickable size={25} margin="0 10px 0 0" onClick={this.props.downloadWP} />Oops something went wrong. Retry?</Msg>
			</MaxWidth>
		</SectionWrap>
	)

	render() {

		const { check, setInputVal, downloadWP } = this.props;
		const { downloading, failed, renameConfig, generateAuth, dbPrefix, dbName, dbUser, dbPass, dbHost } = this.props.wp;
		const { renderDownloading, renderFailed } = this;

		if (downloading) {
			return renderDownloading();
		}
		if (failed) {
			return renderFailed();
		}


		return (

			<SectionWrap>

				<MaxWidth>

					<SectionHeader>Wordpress</SectionHeader>

					<Ul>
						<Li>
							<CheckBox id="renameConfig" onClick={e => { check(e) }} checked={renameConfig} />
							<Label>Rename wp config</Label>
						</Li>

						<Li>
							<CheckBox id="generateAuth" onClick={e => { check(e) } } checked={generateAuth} />
							<Label>Generate auth keys</Label>
						</Li>

						<Li>
							<TextLabel>Prefix</TextLabel>
							<Input onChange={(e) => { setInputVal(e) }} id="dbPrefix" grey small type="text" placeholder="Database prefix" value={dbPrefix} />
						</Li>

						<Li>
							<TextLabel>Name</TextLabel>
							<Input onChange={(e) => { setInputVal(e) }} id="dbName" grey small type="text" placeholder="Name" value={dbName} />
						</Li>

						<Li>
							<TextLabel>User</TextLabel>
							<Input onChange={(e) => { setInputVal(e) }} id="dbUser" grey small type="text" placeholder="User" value={dbUser} />
						</Li>

						<Li>
							<TextLabel>Password</TextLabel>
							<Input onChange={(e) => { setInputVal(e) }} id="dbPass" grey small type="text" placeholder="Password" value={dbPass} />
						</Li>

						<Li>
							<TextLabel>Host</TextLabel>
							<Input onChange={(e) => { setInputVal(e) }} id="dbHost" grey small type="text" placeholder="Host" value={dbHost} />
						</Li>

					</Ul>

					<Button onClick={() => { downloadWP() }} primary>Install</Button>

				</MaxWidth>

			</SectionWrap>

		);

	}

}

const mapStateToProps = state => ({
	wp: state.wp
})

export default connect(mapStateToProps, { ...wpActions })(Wordpress);