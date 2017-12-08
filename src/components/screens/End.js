import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { SectionWrap, Msg, SectionHeader, Button, MaxWidth, Flex } from '../UI';
import killbill from '../../assets/killbill.png';
const {app} = window.require('electron').remote;

class End extends Component {

	closeApp = () => {
		app.quit();
	}

	componentDidMount(){
		new Notification('Success', { body: 'Project initialized' });
	}

	render() {
		return (

			<SectionWrap>

				<FlexMaxWidth>

					<KillBill src={killbill}/>
					<SectionHeader>You're all done {this.props.user.name}!</SectionHeader>
					<Msg>Happy Hacking</Msg>

					<Flex>
						<EndButton onClick={this.closeApp}>Seeya</EndButton>
					</Flex>

				</FlexMaxWidth>

			</SectionWrap>

		)
	}

}

const mapStateToProps = state => ({
	user: state.user
})

export default connect(mapStateToProps)(End);

const EndButton = Button.extend`
	margin: 30px 5px 5px 5px;
`

const FlexMaxWidth = MaxWidth.extend`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`

const KillBill = styled.img`
width: 260px;
border: 3px solid #fff;
border-radius: 50%;
height: 260px;
`


