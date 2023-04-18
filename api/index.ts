import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter, context } from '../trpc'

export const config = {
    runtime: 'edge'
}

export default (req: Request) => {
    return fetchRequestHandler({
        req,
        endpoint: '/api',
        router: appRouter,
        createContext: context
    })
}

