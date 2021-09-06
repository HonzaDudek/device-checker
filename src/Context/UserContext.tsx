import React from "react";
import {User} from "../Models/User";

type Action = {type: 'login', payload: User} | {type: 'logout', payload: null}
type Dispatch = (action: Action) => void
type State = {user: User | null}
type UserProviderProps = {children: React.ReactNode}

const UserContext = React.createContext<
    {state: State; dispatch: Dispatch} | undefined
    >(undefined)

const userReducer = (state: any, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case 'login': {
            return {user: action.payload}
        }
        case 'logout': {
            return {user: null}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

const UserProvider = ({children}: UserProviderProps) => {
    const [state, dispatch] = React.useReducer(userReducer, {user: null});
    const value = {state, dispatch};
    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}

const useUserContext = () => {
    const context = React.useContext(UserContext)
    if (context === undefined) {
        throw new Error('useCount must be used within a CountProvider')
    }
    return context
}
export { UserProvider, useUserContext }
