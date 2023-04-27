import { inferAsyncReturnType, initTRPC } from '@trpc/server'
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'


export const context = ({ req, resHeaders }: FetchCreateContextFnOptions) => ({req, resHeaders})
export type Context = inferAsyncReturnType<typeof context>

const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure

export * from './router'

