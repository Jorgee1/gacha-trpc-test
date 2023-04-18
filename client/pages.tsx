import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from './auth'
import { trpc } from './trpc'
export const Nav = () => {
    const { logOut } = useAuthContext()
    
    return <nav>
        <Link to="/">Home</Link>
        <Link to="/2">Home2</Link>
        <button onClick={logOut}>LogOut</button>
    </nav>
}

export const Login = () => {
    const navigate = useNavigate()
    const { isAuthed } = useAuthContext()
    const { data } = trpc.authURL.useQuery()

    useEffect(() => {
        if (isAuthed) navigate('/')
    }, [isAuthed])
    

    const click = () => {
        if (!data) return
        window.location.href = data
    }

    return <div>
        <button onClick={click} disabled={!data? true: true}>LogIn</button>
    </div>
}