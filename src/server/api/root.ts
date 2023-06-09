import { createTRPCRouter } from "~/server/api/trpc";
import { authRouter } from "~/server/api/routers/auth";
import chatRouter from "./routers/chat";
import { usersRouter } from "./routers/users";
import { testRouter } from "./routers/test";
import  roomRouter  from "./routers/dd";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  chat: chatRouter,
  users: usersRouter,
  test: testRouter,
 room:roomRouter ,
});

// export type definition of API
export type AppRouter = typeof appRouter;
