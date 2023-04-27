import { router, publicProcedure } from '.'
import { user } from './user'

export const appRouter = router({
    pull: publicProcedure
        .query(() => Math.round(Math.random() * 100)),
    user
})

export type AppRouter = typeof appRouter
