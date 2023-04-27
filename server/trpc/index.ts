import { inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server'
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { db } from '../../prisma/db'
import { getUser } from '../github'

export const context = ({ req, resHeaders }: FetchCreateContextFnOptions) => ({req, resHeaders})
export type Context = inferAsyncReturnType<typeof context>

const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(async ({ctx, next}) => {
    const { req } = ctx
    
    console.log(req.headers.get('Cookie'))
    //const sessionToken = req.cookies.token || ''
    const sessionToken = ''
    const session = await db.session.findUnique({where: {session: sessionToken}})

    if (!session) throw new TRPCError({code: 'UNAUTHORIZED'})
    if (!session.token) throw new TRPCError({code: 'UNAUTHORIZED'})

    const user = await getUser(session.token)
    if ('message' in user) throw new TRPCError({code: 'UNAUTHORIZED'})

    return next({
        ctx: {user}
    })
})


export * from './router'

