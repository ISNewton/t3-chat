import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { hash } from "~/utils/hashHelper";


export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(z.object({
      username: z.string(),
      email: z.string().email(),
      password: z.string()
    }))

    .mutation(async ({ input }) => {

      console.log(input)


      const userExists = await prisma.user.findFirst({
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
