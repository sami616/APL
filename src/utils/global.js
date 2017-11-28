import { injectGlobal } from 'styled-components';
import ripple from './ripple';
import RobotoLight from '../fonts/Roboto-Light.ttf';
import RobotoMedium from '../fonts/Roboto-Medium.ttf';
import RobotoBold from '../fonts/Roboto-Bold.ttf';


export const colors = {
    primary: '#76ead5',
    secondary: '#585757',
    background: '#f5f3f3',
    disabled: '#d8d8d8',
}

export const fonts = {
    primary: 'RobotoLight',
    secondary: 'RobotoMedium',
    tertiary: 'RobotoBold',
}


export const globalCSS = injectGlobal`

    ${ripple}

    @font-face {
        font-family: RobotoLight;
        src: url(${RobotoLight});
    }

    @font-face {
        font-family: RobotoMedium;
        src: url(${RobotoMedium});
    }

    @font-face {
        font-family: RobotoBold;
        src: url(${RobotoBold});
    }

    * {
        box-sizing: border-box;
        outline: none;
    }
    body {
        margin: 0;
        font-size: 16px;
        font-family: RobotoLight;
    };
`
