import { makeStyles } from "@material-ui/core";
import { CustomPageTheme } from "../../../Utils/Theme";

export const useStyles = makeStyles((theme: CustomPageTheme) => ({
  root: {
    height: 350,
    width: 250,
    padding: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },
  cardBottom: {
    width: "100%",
  },
  borrowedOverlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    width: "100%",
    left: 0,
    top: 200,

    "& span": {
      color: theme.customTheme.colors.white,
    },
  },
  phoneName: {
    lineHeight: 1.3,
  },
  phoneVendor: {
    lineHeight: 1.3,
  },
  phoneOs: {
    marginBottom: 10,
    color: theme.customTheme.colors.greyPrimary,
  },
}));
