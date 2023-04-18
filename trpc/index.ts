import { z } from 'zod'
import { inferAsyncReturnType, initTRPC } from '@trpc/server'
import { loginURL, getToken } from './github'

import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'


export const context = ({ req, resHeaders }: FetchCreateContextFnOptions) => ({req, resHeaders})
export type Context = inferAsyncReturnType<typeof context>

const t = initTRPC.context<Context>().create()

const publicProcedure = t.procedure

export const appRouter = t.router({
    authURL: publicProcedure
        .query(() => loginURL),
    auth: publicProcedure
        .input(z.object({code: z.string()}))
        .query(async ({input: {code}}) => {
            const tokenResponse = await getToken(code)
            console.log(tokenResponse)

            return true
        }),
    greetings: publicProcedure
        .query(() => 'Hello from TRPC')
})

export type AppRouter = typeof appRouter
