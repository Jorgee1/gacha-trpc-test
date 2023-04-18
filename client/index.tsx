import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './auth'
import { router } from './router'


const App = () => {
    return <AuthProvider>
        <RouterProvider router={router}/>
    </AuthProvider>
}

const main = () => {
    const root = document.createElement('div')
    document.body.replaceChildren()
    document.body.appendChild(root)
    createRoot(root).render(<App/>)
}
main()
