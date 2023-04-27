import { z } from 'zod'
import { router, publicProcedure, privateProcedure } from '.'
import { loginURL, getToken, getUser } from '../github'
import { db } from '../../prisma/db'


export const user = router({
    authURL: publicProcedure
        .query(() => loginURL),
    whoami: privateProcedure
        .query(async ({ctx: {user}}) => {
            return user
        }),
    auth: publicProcedure
        .input(z.object({code: z.string()}))
        .query(async ({input: {code}, ctx}) => {
            const { resHeaders } = ctx
            const { access_token } = await getToken(code)
            const response = await getUser(access_token)
            if ('message' in response) return false
            const { id } = response

            const user = await db.user.findUnique({where: {id}})
            if (!user) await db.user.create({data: {id}})

            const curentSession = await db.session.findUnique({where: {userId: id}})
            if (curentSession) await db.session.delete({where: {userId: id}})

            const session = await db.session.create({data: {token: access_token, userId: id}})

            resHeaders.set('Set-Cookie', `token=${session.session}; Secure; HttpOnly; SameSite=strict; Path=/`)
            return true
        })
})