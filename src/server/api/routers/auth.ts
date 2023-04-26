import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";


export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`
      };
    }),
    signUp: publicProcedure
    .input(z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string()
    }))

    .mutation(async ({ input }) => {


        const userExists = await prisma.user.findUnique({
            where: {
                username: input.username
            }
        })

        if (userExists) {
            throw new TRPCClientError('User already exists')
        }

        const user = await prisma.user.create({
            data: {
                username: input.username,
                email: input.email,
                password: hash(input.password)

            }
        })
        console.log(user);

        return {
            id: user.id,
            name: user.name,
            email: user.email,
        };
    }),
});
