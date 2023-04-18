import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from './auth'

export const Nav = () => {
    const { logOut } = useAuthContext()
    
    return <nav>
        <Link to="/">Home</Link>
        <Link to="/2">Home2</Link>
        <button onClick={logOut}>LogOut</button>
    </nav>
}

export const Login = () => {
    const { isAuthed, logIn } = useAuthContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthed) navigate('/')
    }, [isAuthed])
    
    return <div>
        <button onClick={logIn}>LogIn</button>
    </div>
}