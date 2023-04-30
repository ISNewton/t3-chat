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
import { uploadAvatar } from "~/utils/uplaodHelper";


export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(z.object({
      username: z.string(),
      email: z.string().email(),
      password: z.string(),
      avatar: z.string()
    }))

    .mutation(async ({ input }) => {

      const uploadPath = 'upload/path'

      const base64 = input.avatar.split(";base64,").pop();

      if (!base64) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Something went wrong",
        })
      }

      const avatar = uploadAvatar(base64)


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
          password,
          image: avatar
        }
      })

      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    }),
});
