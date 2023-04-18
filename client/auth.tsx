import { useState, createContext, useContext } from 'react'
import { LoaderFunctionArgs, Navigate, Outlet, useLoaderData, useNavigate } from 'react-router-dom'
import { trpc } from './trpc'
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


export const authPageLoader = ({request}: LoaderFunctionArgs) => {
    const url = new URL(request.url)
    return url.searchParams.get('code') || ''
}

export const AuthPage = () => {
    const navigate = useNavigate()
    const { logIn, logOut } = useAuthContext()
    const code = useLoaderData() as ReturnType<typeof authPageLoader>

    trpc.auth.useQuery({code}, {
        onSuccess: (response) => {
            if (!response) navigate('/login')
            logIn()
            navigate('/')
        },
        onError: () => {
            logOut()
            navigate('/login')
        },
        retry: false
    })
    return <div>Loading...</div>
}