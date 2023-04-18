import { initTRPC } from '@trpc/server'


const t = initTRPC.create()

const publicProcedure = t.procedure

export const appRouter = t.router({
    greetings: publicProcedure
        .query(() => 'Hello from TRPC')
})

export type AppRouter = typeof appRouter