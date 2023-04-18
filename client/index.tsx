import { createRoot } from 'react-dom/client'

const App = () => {
    return <div>Hello from React</div>
}

const main = () => {
    const root = document.createElement('div')
    document.body.replaceChildren()
    document.body.appendChild(root)
    createRoot(root).render(<App/>)
}
main()
