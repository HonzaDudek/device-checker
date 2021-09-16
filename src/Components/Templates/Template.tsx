import React from "react";
import { MuiTheme } from "../../Utils/Theme";
import { Box, Container, makeStyles } from "@material-ui/core";
import { Header } from "../Molecules/Header/Header";
import { Footer } from "../Molecules/Footer";

const useStyles = makeStyles(() => ({
  root: {
    padding: 0,
    minHeight: "calc(100vh - 200px)",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    paddingTop: 50,
    paddingBottom: 100,
  },
  content: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const Template: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <MuiTheme>
      <Header />
      <Container maxWidth={"lg"} className={classes.root}>
        <Box className={classes.content}>{children}</Box>
      </Container>
      <Footer />
    </MuiTheme>
  );
};
