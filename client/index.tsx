import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'


const Nav = () => {
    return <nav>
        <Link to="/">Home</Link>
        <Link to="/2">Home2</Link>
    </nav>
}

const App = () => {
    const router = createBrowserRouter([
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
                <div>Home</div>
            </>
        }
    ])
    return <RouterProvider router={router}/>
}

const main = () => {
    const root = document.createElement('div')
    document.body.replaceChildren()
    document.body.appendChild(root)
    createRoot(root).render(<App/>)
}
main()
