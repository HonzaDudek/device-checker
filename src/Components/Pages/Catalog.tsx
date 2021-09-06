import {AXIOS_METHODS, useCallApi} from "../../Hooks/callAPI";
import {Box, Typography} from "@material-ui/core";
import {Template} from "../Templates/Template";
import {useEffect, useMemo, useState} from "react";
import {useUserContext} from "../../Context/UserContext";
import {Phone} from "../../Models/Phone";
import {User} from "../../Models/User";

export const CatalogPage = () => {

    const {state, dispatch} = useUserContext();
    const [user, setUser] = useState<User | null>(state.user);

    useEffect(() => {
        if (!state.user) {
            const localUser = localStorage.getItem('user')
            if (localUser !== null) {
                const parsedLocalUser = JSON.parse(localUser)
                dispatch({type: 'login', payload: parsedLocalUser})
                setUser(parsedLocalUser)
            }
        }
    }, [user])

    const requestConfig = useMemo(() => ({
        url: 'phones',
        method: AXIOS_METHODS.GET,
        body: null,
        headers: {
            'Auth-Token': user?.token
        }
    }), [user])

    const {isLoading, response, error} = useCallApi<Phone[]>(requestConfig);

    return (
        <Template>
            <Box>Welcome to catalog</Box>
            {response && <>{response.map((phone: Phone) => <Typography>{phone.model}</Typography>)}</>}
        </Template>
    )
}
