import { createBrowserRouter} from 'react-router-dom'
import { ProtectedRoute, AuthPage, authPageLoader } from './auth'
import { Login, Nav } from './pages'
import { Home } from './home'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/2',
                element: <>
                    <Nav/>
                    <div>Home2</div>
                </>
            },
        ]
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/auth',
        element: <AuthPage/>,
        loader: authPageLoader
    }
])

