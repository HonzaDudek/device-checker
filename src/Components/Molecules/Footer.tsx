import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { CustomPageTheme } from "../../Utils/Theme";

const useStyles = makeStyles((theme: CustomPageTheme) => ({
  root: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: theme.customTheme.colors.orangePrimary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export const Footer = () => {
  const classes = useStyles();

  return <Box className={classes.root}>2021</Box>;
};
