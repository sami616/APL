import React from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import {Transition} from 'react-transition-group'
import { colors } from '../utils/global';
import { darken } from 'polished';
import folder from '../assets/folder.svg';
import chevron from '../assets/chevron.svg';


//Anim

export const SlideIn = props => {

    return (
        <Transition in appear timeout={0}>
        	{status => (
				<SlideInTrans status={status}>
                {props.children}
                </SlideInTrans>
            )}
        </Transition>
    )
}
export const SlideInTrans = styled.div`
    opacity: 0;
    transition: all 250ms ease-in-out;
    transform: translate3d(0, 10px, 0);
    ${props=>props.status === 'entered' && `
        opacity: 1;
        transform: translate3d(0,0,0);
    `}
`

// Wrappers
export const AppWrap = styled.div`
    background: ${colors.background};
    min-width: 750px;
`
export const SectionWrap = styled.div`
    min-height: ${props => props.noHeader ? '100vh' : 'calc(100vh - 80px)'};
    width: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
`
export const MaxWidth = styled.div`
    width: 100%;
    max-width: 600px;
    padding: 20px;
`


// Buttons and Icons

export const Button = styled.button.attrs({
    className: props => props.disabled ? '' : 'ripple'
}) `
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: center;
    padding: 20px;
    margin: 10px 0 0 0;
    border-radius: 4px;
    transition: all .2s ease-in-out;
    background: ${colors.primary};
    ${props => props.directory && `background: ${colors.secondary}`};
    ${props => props.disabled && `background: ${colors.disabled}`};
    
    &:hover {
        ${props => !props.disabled && `background: ${darken(0.2, colors.primary)}`};
        ${props => props.directory && `background: ${darken(0.1, colors.secondary)}`};
    }

    border: none;
    font-size: 18px;
    color: #fff;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    font-family: RobotoMedium;
`

export const Icon = styled.img.attrs({
    alt: ''
}) `
    display: block;
    margin: ${props => props.margin ? props.margin : 0};
    width:  ${props => props.size ? props.size : 20}px;
    height: ${props => props.size ? props.size : 20}px;
    cursor: ${props => props.clickable ? 'pointer' : 'inherit'};
`

// Form Stuff

export const Select = styled.select`
    appearance: none;
    border: 0;
    font-size: 14px;
    padding: 20px 60px 20px 20px;
    border-radius: 0;
    margin: 0;
    background: #efefef;
    color: #807d7d;
    font-family: RobotoLight;
    width: 100%;
    background-image: url(${chevron});
    background-repeat: no-repeat;
    background-position: center right 20px;
    background-size: 15px;
`

export const Input = styled.input`
    padding: 20px;
    border: none;
    width: 100%;
    color: #807d7d;
    background: ${props => props.grey ? '#efefef' : '#ffffff'};
    margin: ${props => props.margin ? props.margin : '0'};
    font-size: ${props => props.small ? '14px' : '16px'};
    font-family: RobotoLight;
    box-shadow: ${props => props.grey ? 'none' : '0px 0 3px 3px #ececec'};
    &::placeholder {
        color: #999;
    }
    &:last-child {
        margin: 0;
    }
`

export const Label = styled.label`
    font-size: 14px;
    color: ${props => props.checked ? '#222' : '#949494'};
`

export const TextLabel = Label.extend`
    width: 100px;
`

export const CheckBox = styled.span.attrs({
    className: 'ripple'
}) `
    display: flex;
    width: 20px;
    height: 20px;
    position: relative;
    cursor: pointer;
    border: 1px solid ${colors.primary};
    background: ${props => props.checked ? colors.primary : 'transparent'};
    margin: 0 10px 0 0;
    border-radius: 50%;
`

export const DirSelect = props => {

    const { onClick, noshadow, margin, noradius, borderbottom } = props;

    const inputProps = { ...props };
    delete inputProps['onClick'];

    return (
        <DirWrap borderbottom={borderbottom} margin={margin} noshadow={noshadow}>

            <FileName
                {...inputProps}
                type="text"
            />

            <Dir noradius={noradius} directory onClick={onClick}>
                <Icon size={26} src={folder} />
            </Dir>

        </DirWrap>
    );
}

const DirWrap = styled.div`
    display: flex;
    border-bottom: ${props => props.borderbottom ? '1px solid #e4e4e4' : ''};
    margin: ${props => props.margin ? props.margin : 0};
    box-shadow: ${props => props.noshadow ? '' : '0px 0 3px 3px #ececec'};
`

const FileName = styled(Input) `
    border-radius: 4px 0 0 4px;
    margin: 0;
    width: calc(100% - 100px);
    box-shadow: none;
    font-size: ${props => props.small ? '14px' : '16px;'};
`

const Dir = Button.extend`
    border-radius: ${props => props.noradius ? '0 0 0 0' : '0 4px 4px 0'};
    width: 100px;
    padding: 10px;
    margin: 0; 
`

// List Stuff

export const Ul = styled.ul`
    margin: 0;
    list-style: none;
    background: #fff;
    margin: ${props => props.margin ? props.margin : 0};
    box-shadow: 0 0 6px 1px #e0dfdf;
    padding: 0;
    border-radius: 4px;
`

export const Li = styled.li`
    border-bottom: 1px solid #e4e4e4;
    padding: 20px;
    display: flex;
    align-items: center;
        &:last-child {
            border-bottom: none;
        }
    }
`

// Loader

const Spinner = styled(ReactLoading) `
    margin: ${props => props.margin};
    padding: ${props => props.padding};
`
export const Loader = props => {

    let size = props.size ? props.size : 20;
    let margin = props.margin ? props.margin : 0;
    let padding = props.padding ? props.padding : 0;
    return (
        <Spinner
            padding={padding}
            margin={margin}
            delay={0} width={size}
            height={size}
            type="spokes"
            color={props.col} />
    );
}



// General

export const Flex = styled.div`
    display: flex;
`

export const Primary = styled.span`
    color: ${colors.primary};
`

export const SectionHeader = styled.p`
    color: #444;
    margin: 20px 0;
    word-break: break-all;
    text-align: center;
    font-size: 25px;
    align-items: center;
`

export const Msg = styled.div`
    color: #444;
    margin: ${props => props.margin ? props.margin : 0};
    text-align: center;
    align-items: center;
    justify-content: center;
    display: flex;
`

export const ScrollView = styled.div`
    max-height: 365px;
    overflow: scroll;
    background: #f9f9f9;
`

export const Avatar = styled.img`
    cursor: pointer;
    width: ${props => props.size ? props.size : 50}px;
    height: ${props => props.size ? props.size : 50}px;
    border-radius: 50%;
    border: 2px solid #fff;
    transition: all .2s linear;
` 