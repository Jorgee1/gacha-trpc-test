import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from './auth'
import { trpc } from './trpc'



export const Nav = () => {
    const { logOut } = useAuthContext()

    const { data } = trpc.user.whoami.useQuery()
    
    return <nav>
        <Link to="/">Home</Link>
        <Link to="/2">Home2</Link>
        <div>{data? data.name: 'User'}</div>
        <button onClick={logOut}>LogOut</button>
    </nav>
}

export const Login = () => {
    const navigate = useNavigate()
    const [ OAuthURL, setURL ] = useState<string | undefined>(undefined)
    const { isAuthed } = useAuthContext()
    
    trpc.user.authURL.useQuery(undefined, {
        onSuccess: (responseURL) => {
            setURL(responseURL)
        }
    })

    useEffect(() => {
        if (isAuthed) navigate('/')
    }, [isAuthed])
    

    const click = () => {
        if (!OAuthURL) return
        window.location.href = OAuthURL
    }

    return <div>
        <button onClick={click} disabled={!OAuthURL? true: false}>LogIn</button>
    </div>
}