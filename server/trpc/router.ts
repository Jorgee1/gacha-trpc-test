import { router, publicProcedure } from '.'
import { user } from './user'

export const appRouter = router({
    greetings: publicProcedure
        .query(() => 'Hello from TRPC'),
    user
})

export type AppRouter = typeof appRouter
