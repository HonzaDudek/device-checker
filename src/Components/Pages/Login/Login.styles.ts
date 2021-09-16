import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    maxWidth: 800,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "100%",
    padding: 20,

    "& form": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      alignItems: "stretch",
      width: "100%",
    },

    "& .MuiFormControl-root": {
      marginBottom: 30,
    },
  },
}));
