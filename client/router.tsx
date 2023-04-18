import { createBrowserRouter} from 'react-router-dom'
import { ProtectedRoute } from './auth'
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
                    <div>Home2</div>
                </>
            },
        ]
    },
    {
        path: '/login',
        element: <Login/>
    }
])
