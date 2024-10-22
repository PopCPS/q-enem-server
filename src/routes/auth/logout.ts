import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export const logout = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post('/api/logout', {},
    async (request, reply) => {
      reply.setCookie('token', '', {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
        path: '/'
      })

      reply.send({ message: 'Logged out successfully' });
    }
  )
}