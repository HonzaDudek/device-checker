import React from "react";
import {CustomPageTheme, MuiTheme} from "../../Utils/Theme";
import {Box, Button, makeStyles, Typography} from "@material-ui/core";
import {useUserContext} from "../../Context/UserContext";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme: CustomPageTheme) => ({
    root: {
        padding: 0,
        minHeight: 'calc(100vh - 100px)',
        maxWidth: '100vw',
    },
}));

export const Template: React.FC = ({children}) => {
    const {state, dispatch} = useUserContext();
    const history = useHistory();
    const classes = useStyles();

    const handleLogout = () => {
        dispatch({type: 'logout', payload: null});
        localStorage.removeItem('user');
        history.push('/login')
    }

    return (
        <MuiTheme>
            <Box className={classes.root}>
                <Box className={classes.root}>
                    <Typography>Logo</Typography>
                    {state.user && <Button onClick={handleLogout}>Logout</Button>}
                </Box>
                <Box>
                    {children}
                </Box>
                <Box>Footer</Box>
            </Box>

        </MuiTheme>
    )
}
