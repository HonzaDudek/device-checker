import {useContext, useEffect, useMemo, useState} from "react";
import {AXIOS_METHODS, useCallApi} from "../../Hooks/callAPI";
import {User} from "../../Models/User";
import {AxiosResponse} from "axios";
import {Template} from "../Templates/Template";
import { Formik } from "formik";
import {useLogin} from "../../Hooks/useLogin";
import {userLogin} from "../../Services/userLogin.service";
import { useHistory } from "react-router-dom";
import {useUserContext} from "../../Context/UserContext";
import {useSnackbar} from "../../Context/SnackbarContext";
import {Snackbar} from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';


interface ILoginData {
    login: string;
    password: string;
}

const mockLoginData = {
    "login": "frodo.baggins@etnetera.cz",
    "password": "theoner1ng"
}

export const LoginPage = () => {
    const config = useMemo(() => ({
        url: '/login',
        method: AXIOS_METHODS.POST,
        body: mockLoginData,
        headers: {
            'Content-Type': 'application/json'
        }
    }), [])
    const history = useHistory();
    const {state, dispatch} = useUserContext();
    const {state: snackBarState , dispatch: dispatchSnackbar} = useSnackbar();

    const [data, setData] = useState<User>();

    const onLoginSubmit = (name: string, password: string) => {
        userLogin({
            login: name,
            password: password
        }).then((response) => {
            if (response?.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data))
                setData(response.data);
                dispatch({type: 'login', payload: response.data});
                history.push('catalog')
            } else {
                dispatchSnackbar({type: 'show', payload: {type: 'error', label: 'Invalid login information provided'}})
                setTimeout(() => {
                    dispatchSnackbar({type: 'hide', payload: null})
                }, 3000)
            }
        })
    }

    return (<Template>
        <Formik
            initialValues={{ name: '', password: '' }}
            onSubmit={(values, actions) => {
                onLoginSubmit(values.name, values.password)
            }}
        >
            {props => (
                <form onSubmit={props.handleSubmit}>
                    <input
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.name}
                        name="name"
                    />
                    <input
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.password}
                        name="password"
                    />
                    {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                    {props.errors.password && <div id="feedback">{props.errors.password}</div>}
                    <button type="submit">Submit</button>
                    {snackBarState &&
                        <Snackbar open={snackBarState.snackbar !== null}>
                          <MuiAlert severity='error'>{snackBarState.snackbar?.label}</MuiAlert>
                        </Snackbar>
                    }
                </form>
            )}
        </Formik>
    </Template>)
}
