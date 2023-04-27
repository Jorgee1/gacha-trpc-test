import { useState } from 'react'
import { httpBatchLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppRouter } from '../server/trpc'
import type { ReactElement } from 'react'


export const trpc = createTRPCReact<AppRouter>()

export const TRPCProvider = ({children}: {children: ReactElement}) => {
    const [trpcClient] = useState(() => trpc.createClient({
        links: [httpBatchLink({url: '/api'})]
    }))
    const [queryClient] = useState(() => new QueryClient())

    return <trpc.Provider queryClient={queryClient} client={trpcClient}>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </trpc.Provider>
}
