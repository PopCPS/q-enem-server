import fastify from "fastify";
import cors from "@fastify/cors"
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import fastifyCookie from "@fastify/cookie";
import { CORS_ORIGIN, JWT_SECRET } from "./lib/secrets";
import fastifyJwt from "@fastify/jwt";
import { register } from "./routes/auth/register";
import { login } from "./routes/auth/login";
import { logout } from "./routes/auth/logout";
import { getUser } from "./routes/user/get-user";
import { deleteUser } from "./routes/user/delete-user";
import { patchUser } from "./routes/user/patch-user";
import { ping } from "./routes/auth/ping";

const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`;

const app = fastify()

console.log('CORS_ORIGIN:', CORS_ORIGIN, 'Type:', typeof CORS_ORIGIN);
app.register(cors, {
  origin: CORS_ORIGIN,
  methods: ['POST', 'GET', 'PATCH', 'DELETE'],
  credentials: true,
})

app.register(fastifyCookie, {});
app.register(fastifyJwt, {
  secret: JWT_SECRET,
  cookie: {
    cookieName: 'token',
    signed: false,
  },
})

app.register(register)
app.register(login)
app.register(logout)
app.register(ping)

app.register(getUser)
app.register(deleteUser)
app.register(patchUser)

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.listen({ port: 3333, host: host }).then((s) => {
  console.log(`Server running on ${s}!`)
})