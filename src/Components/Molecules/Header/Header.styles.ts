import { lighten, makeStyles } from "@material-ui/core";
import { CustomPageTheme } from "../../../Utils/Theme";

export const useStyles = makeStyles((theme: CustomPageTheme) => ({
  root: {
    height: 100,
    backgroundColor: theme.customTheme.colors.orangePrimary,
  },
  content: {
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box",
    width: "100%",
    maxWidth: 1250,
    margin: "auto",
  },
  userArea: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
    alignItems: "center",

    "& button": {
      margin: "0 10px",
      width: 100,
    },

    "& p": {
      margin: 0,
    },
  },
  menuButton: {
    display: "inline-block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  drawer: {
    "& .MuiPaper-root": {
      padding: 20,
      backgroundColor: lighten(theme.customTheme.colors.orangePrimary, 0.75),
    },

    "& button:first-of-type": {
      marginTop: 15,
    },
    "& button": {
      marginBottom: 15,
    },
  },
}));
