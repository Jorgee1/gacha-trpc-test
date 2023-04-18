import { inferAsyncReturnType, initTRPC } from '@trpc/server'
import { loginURL } from './github'

import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'


export const context = ({ req, resHeaders }: FetchCreateContextFnOptions) => ({req, resHeaders})
export type Context = inferAsyncReturnType<typeof context>

const t = initTRPC.context<Context>().create()

const publicProcedure = t.procedure

export const appRouter = t.router({
    authURL: publicProcedure
        .query(() => loginURL),
    greetings: publicProcedure
        .query(() => 'Hello from TRPC')
})

export type AppRouter = typeof appRouter