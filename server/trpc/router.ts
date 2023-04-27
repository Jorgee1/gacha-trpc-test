import { router, publicProcedure } from '.'
import { user } from './user'

export const appRouter = router({
    pull: publicProcedure
        .mutation(() => Math.round(Math.random() * 100)),
    user
})

export type AppRouter = typeof appRouter
