import React from "react";
import {
  createTheme,
  MuiThemeProvider,
  responsiveFontSizes,
  Theme as OriginalTheme,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

export enum FontWeight {
  Light = 300,
  Regular = 400,
  Medium = 500,
  Semibold = 600,
  Bold = 700,
}

export const Font = {
  type: {
    primary: "Roboto, Arial, Verdana, sans-serif",
    secondary: "Lato, Verdana, Arial, sans-serif",
  },
  weight: FontWeight,
  lineHeight: {
    title: "1.4em",
  },
  size: {
    label: 12,
    base: 14,
    larger: 16,
  },
};

const baseTheme = {
  colors: {
    orangePrimary: "#ED5B2F",
    greyPrimary: "#F2F2F2",
    white: "#FFFFFF",
    black: "#000000",
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
    overrides: {
      MuiButton: {
        root: {
          fontFamily: Font.type.primary,
          padding: "0 20",
          cursor: "pointer",
          display: "inline-flex",
          fontWeight: FontWeight.Medium,
          justifyContent: "center",
          fontSize: 14,
          height: 40,
          borderRadius: 10,
          boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.15)",
          border: "2px solid transparent",
          outline: "none",
          width: "100%",
          textTransform: "none",
          whiteSpace: "nowrap",
          backgroundColor: baseTheme.colors.white,

          "& a": {
            textDecoration: "none",
            color: "#000000",
          },

          "&:hover": {
            backgroundColor: "rgba(237, 91,47, 0.2)",
          },
        },
      },
      MuiCheckbox: {
        colorSecondary: {
          "&.Mui-checked": {
            color: baseTheme.colors.orangePrimary,
          },
        },
      },
    },
  },
  {
    customTheme: baseTheme,
  },
  {}
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
