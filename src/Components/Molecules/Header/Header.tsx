import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useUserContext } from "../../../Context/UserContext";
import { Link, useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import { useStyles } from "./Header.styles";

export const Header = () => {
  const { state, dispatch } = useUserContext();
  const history = useHistory();
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggleMenu = () => {
    setMenuOpen((prevOpen) => !prevOpen);
  };

  const handleCloseMenu = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch({ type: "logout", payload: null });
    localStorage.removeItem("user");
    history.push("/login");
  };

  const AddDeviceButton = () => {
    return (
      <>
        {state.user &&
          state.user.type === "admin" &&
          window.location.pathname === "/addDevice" && (
            <Button>
              <Link to={"/catalog"}>Katalog</Link>
            </Button>
          )}
      </>
    );
  };

  const CatalogButton = () => {
    return (
      <>
        {state.user &&
          state.user.type === "admin" &&
          window.location.pathname === "/catalog" && (
            <Button>
              <Link to={"/addDevice"}>Přidat zařízení</Link>
            </Button>
          )}
      </>
    );
  };

  const LogoutButton = () => {
    return (
      <>{state.user && <Button onClick={handleLogout}>Odhlásit</Button>}</>
    );
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.content}>
        <img
          src={`${process.env.PUBLIC_URL}/images/etnetera-cernobile.png`}
          alt={"Logo Etnetera"}
          width={150}
        />
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={handleToggleMenu}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor={"right"}
          open={menuOpen}
          onClose={handleCloseMenu}
          className={classes.drawer}
        >
          {state.user && (
            <Typography component={"span"}>{state.user.login}</Typography>
          )}
          <AddDeviceButton />
          <CatalogButton />
          <LogoutButton />
        </Drawer>
        <Box className={classes.userArea}>
          {state.user && (
            <Typography component={"p"}>{state.user.login}</Typography>
          )}
          <AddDeviceButton />
          <CatalogButton />
          <LogoutButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
