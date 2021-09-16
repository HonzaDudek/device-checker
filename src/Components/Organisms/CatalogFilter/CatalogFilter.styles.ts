import { makeStyles } from "@material-ui/core";
import { CustomPageTheme } from "../../../Utils/Theme";

export const useStyles = makeStyles((theme: CustomPageTheme) => ({
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    maxWidth: 1045,
    margin: "auto",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 0",

    "& .MuiInputBase-root": {
      minWidth: 200,
    },

    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },
}));
