import { createBrowserRouter} from 'react-router-dom'
import { ProtectedRoute, AuthPage, authPageLoader } from './auth'
import { Login, Nav } from './pages'


export const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute/>,
        children: [
            {
                path: '/',
                element: <>
                    <Nav/>
                    <div>Home</div>
                </>
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

