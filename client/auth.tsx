import { useState, createContext, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import type { ReactElement } from 'react'

type AuthContextType = {
    isAuthed: boolean,
    logIn: () => void,
    logOut: () => void
}

const authContext = createContext<AuthContextType>({
    isAuthed: false,
    logIn: () => {},
    logOut: () =>{}
})

export const useAuthContext = () => useContext(authContext)

export const AuthProvider = ({children}: {children: ReactElement}) => {
    const localIsAuthed = window.localStorage.getItem('isAuthed')
    const [ isAuthed, setAuth ] = useState(localIsAuthed === 't')

    const authParams: AuthContextType = {
        isAuthed,
        logIn: () => {
            window.localStorage.setItem('isAuthed', 't')
            setAuth(true)
        },
        logOut: () => {
            window.localStorage.setItem('isAuthed', 'f')
            setAuth(false)
        }
    }

    return <authContext.Provider value={authParams}>
        { children }
    </authContext.Provider>
}

export const ProtectedRoute = () => {
    const { isAuthed } = useAuthContext()
    return isAuthed? <Outlet/>: <Navigate to='/login'/>
}
