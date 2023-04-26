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



      const userExists = await prisma.user.findFirst({
        where: {
          OR: [
            {
              username: input.username,
            },
            {
              email: input.email
            }
          ]
        },
      })

      if (userExists) {
        throw new TRPCClientError('User already exists')
      }


      const password = await hash(input.password)

      const user = await prisma.user.create({
        data: {
          username: input.username,
          email: input.email,
          password
        }
      })

      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    }),
});
