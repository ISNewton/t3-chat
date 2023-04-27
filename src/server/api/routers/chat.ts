
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { hash } from "~/utils/hashHelper";

const sendMessageInput = z.object({
  content: z.string(),
  receiverId: z.string()
})

const chatRouter = createTRPCRouter({
  getAllChats: publicProcedure.query(async ({ input, ctx }) => {

    const userChats = await prisma.user.findFirst({
      where: {
        id: ctx.session?.user.id
      },
      select: {
        firstUserChats: true,
        secondUserChats: true
      }
    })

    return [...<[]>userChats?.firstUserChats, ...<[]>userChats?.secondUserChats]
  }),
  getChatMessages: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const messages = await prisma.message.findMany({
        where: {
          chatId: input
        }
      })
      return messages
    }),
  sendMessage: protectedProcedure
    .input(sendMessageInput)
    .mutation(async ({ input, ctx }) => {
      //find user chat
      let chat = await prisma.chat.findFirst({
        where: {
          OR: [
            {
              firstUserId: input.receiverId,
              secondUserId: ctx.session?.user.id
            },
            {
              firstUserId: ctx.session?.user.id,
              secondUserId: input.receiverId
            }
          ]
        }
      })

      if(!chat) {
        chat  = await prisma.chat.create({
          data:{
            content: 'chatsjdhsdksjdksjdksdj',
            firstUserId: ctx.session.user.id,
            secondUserId: input.receiverId,
          }
        })
      }




      const message = await prisma.message.create({
        data: {
          content: input.content,
          receiverId: input.receiverId,
          chatId: chat.id,
          senderId: ctx.session?.user.id
        }
      })

      console.log(3434343434,message , chat)
    })

});

export default chatRouter
