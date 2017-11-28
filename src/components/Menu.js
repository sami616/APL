import React from 'react';
import logouticon from '../assets/logout.svg'
import { Icon } from '../components/UI';
import styled from 'styled-components';
import { colors } from '../utils/global'
import { darken } from 'polished'

const Menu = props => {

    const { name, signOut, toggleMenu } = props;

    const handleSignout = () => {
        signOut();
        toggleMenu();
    }

    return (
        <MenuWrap>
            <UserMenu>
                <MenuItem disabled>Signed in as {name}</MenuItem>
                <MenuItem onClick={handleSignout}><Icon src={logouticon} size={15} margin="0 5px 0 0" />Sign out</MenuItem>
            </UserMenu>
            <Overlay onClick={toggleMenu}></Overlay>
        </MenuWrap>
    )
}

export default Menu

const Overlay = styled.div`
    background: transparent;
    cursor: pointer;
    opacity: 0.5;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    position: fixed;
`

const MenuWrap = styled.div`
    position: absolute;
    position: absolute;
    top: 75px;
    right: 27px;
`
const UserMenu = styled.ul`
    &:before {
        content: '';
        position: absolute;
        top: -8px;
        right: 10px;
        width: 0;
        height: 0;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        border-bottom: 8px solid ${darken(0.2, colors.primary)};
    }
    position: relative;
    z-index: 2;
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 14px;
    border-radius: 4px;
`
const MenuItem = styled.li`
    display: flex;
    align-items: center;
    padding: 10px;
    transitin: all .2s linear;
    background: ${props => !props.disabled ? darken(0.25, colors.primary) : darken(0.2, colors.primary)};
    cursor: ${props => !props.disabled && 'pointer'};
    &:hover {
        background: ${props => !props.disabled && darken(0.3, colors.primary)}
    }
    &:first-child {
        border-radius: 3px 3px 0 0;
    }
    &:last-child {
        border-radius: 0 0 3px 3px
    }
`
