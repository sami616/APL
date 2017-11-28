import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Primary, Icon, Avatar } from '../components/UI';
import * as loginActions from '../actions/loginActions';
import Menu from './Menu';
import user from '../assets/user.svg';
import rocket from '../assets/smallrocket.svg';

class Header extends Component {

    state = {
        avatarImg: user,
        menuOpen: false,
    }

    swapAvatar = () => {
        const { avatar_url } = this.props.user;
        this.setState({ avatarImg: avatar_url })
    }

    toggleMenu = e => {
        let menuState = this.state.menuOpen
        this.setState({ menuOpen: !menuState });
    }

    renderMenu = () => {
        const { menuOpen } = this.state;
        const { name } = this.props.user;
        const { signOut } = this.props;

        if (menuOpen) {
            return (
                <Menu
                    toggleMenu={this.toggleMenu}
                    name={name}
                    signOut={signOut}
                />
            );
        }
    }


    renderProfile = () => {
        const { loggedIn, avatar_url } = this.props.user;

        if (loggedIn && avatar_url !== '') {
            return (
                <Profile onClick={this.toggleMenu}>
                    <Hidden onLoad={this.swapAvatar} src={avatar_url} />
                    <Avatar src={this.state.avatarImg} />
                </Profile>
            );
        }
    }

    render() {
        return (
            <HeaderWrap>
                <Brand>
                    <Icon size={30} margin="0 5px 0 0" src={rocket} />
                    <Primary>A</Primary>PL
                </Brand>
                
                {this.renderProfile()}
                {this.renderMenu()}
            </HeaderWrap>
        )
    }
}


const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, { ...loginActions })(Header);

const HeaderWrap = styled.div`
    padding: 15px 20px;
    background: #313131;
    color: #fff;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    position: relative;
    font-size: 20px;
`

const Brand = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: RobotoBold;
`

const Profile = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
    position: relative;
    z-index: 2;
`

const Hidden = styled.img`
    display: none;
` 
