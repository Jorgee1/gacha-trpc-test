import { useState } from 'react'
import { Nav } from './pages'
import { trpc } from './trpc'

export const Home = () => {
    const [ disabled, setDisabled ] = useState(false)
    const [ poll, setPoll ] = useState<number | undefined>()

    const pollMutation = trpc.pull.useMutation({
        onSuccess: (result) => {
            setPoll(result)
            setDisabled(true)
        }
    })

    return <>
        <Nav/>
        <div>Home</div>
        <button onClick={() => {
            setDisabled(true)
            pollMutation.mutate()
        }} disabled={disabled}>Poll</button>

        {poll? <div>{poll}</div>: <></>}
    </>
}
