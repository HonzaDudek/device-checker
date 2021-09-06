import React, {PropsWithChildren, ReactElement} from 'react';
import { createTheme, MuiThemeProvider, responsiveFontSizes, Theme as OriginalTheme } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

export enum FontWeight {
    Light = 300,
    Regular = 400,
    Medium = 500,
    Semibold = 600,
    Bold = 700,
}

export const Font = {
    type: {
        primary: 'Open-Sans, Verdana, Arial, sans-serif',
        secondary: 'Lato, Verdana, Arial, sans-serif',
    },
    weight: FontWeight,
    lineHeight: {
        title: '1.4em',
    },
    size: {
        label: 12,
        base: 14,
        larger: 16,
    },
};

const baseTheme = {
    colors: {
        orangePrimary: '#ED5B2F',
        greyPrimary: '#F2F2F2',
        white: '#FFFFFF',
        black: '#000000',
    },
};

let customTheme: OriginalTheme = createTheme(
    {
        spacing: 5,
        palette: {
            primary: {
                main: baseTheme.colors.orangePrimary,
            },
            secondary: {
                main: baseTheme.colors.greyPrimary,
            },
            background: {
                default: baseTheme.colors.greyPrimary,
            },
        },
        typography: {
            fontFamily: Font.type.primary,
            caption: {
                fontFamily: Font.type.secondary,
            },
            fontSize: 12,
            h1: {
                fontSize: 40,
                fontWeight: FontWeight.Semibold,
            },
        },
    },
    {
        customTheme: baseTheme,
    },
    {},
) as CustomPageTheme;

export interface CustomPageTheme extends OriginalTheme {
    customTheme: typeof baseTheme;
}

customTheme = responsiveFontSizes(customTheme);

export const MuiTheme: React.FC = ({ children }): JSX.Element => {
    return (
        <MuiThemeProvider theme={customTheme}>
            <CssBaseline>{children}</CssBaseline>
        </MuiThemeProvider>
    );
};
