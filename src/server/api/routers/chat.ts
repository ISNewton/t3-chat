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


const chatRouter = createTRPCRouter({
  getAllChats: publicProcedure.query(async({ input, ctx }) => {

    const userChats = await prisma.user.findFirst({
      where: {
        id: ctx.session?.user.id
      },
      select: {
        firstUserChats: true,
        secondUserChats: true
      }
    })    

    return [...<[]>userChats?.firstUserChats , ...<[]>userChats?.secondUserChats]
  }),
  getChatMessages: publicProcedure
  .input(z.string())
  .query(async ({input}) => {
    const messages = await prisma.message.findMany({
      where: {
        chatId: input
      }
    })

    console.log(44444444)
    console.log(messages)
  })
  
});

export default chatRouter
