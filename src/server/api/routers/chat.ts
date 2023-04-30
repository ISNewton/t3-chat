
import { Chat, Message } from "@prisma/client";
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

const getChatMessagesInput = z.object({
  chatId: z.string()
})


const chatRouter = createTRPCRouter({
  getAllChats: publicProcedure.query(async ({ input, ctx }) => {

    const chats = await prisma.chat.findMany({
      where: {
        OR: [
          {
            firstUserId: ctx.session?.user.id
          },
          {
            secondUserId: ctx.session?.user.id
          },
        ]
      },
      include: {
        firstUser: true,
        secondUser: true,
      }
    })


    // console.log(userChats);
    console.log(11111);
    console.log(chats);

    return chats


    // return [...<[]>userChats?.firstUserChats, ...<[]>userChats?.secondUserChats] as Chat[]
  }),
  getChatMessages: publicProcedure
    .input(getChatMessagesInput)
    .query(async ({ input }) => {



      const messages = await prisma.message.findMany({
        where: {
          chatId: input.chatId
        }
      })
      console.log('logging getChatMessages');
      console.log(messages);
      console.log('logging getChatMessages');

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

      if (!chat) {
        chat = await prisma.chat.create({
          data: {
            firstUserId: ctx.session.user.id,
            secondUserId: input.receiverId
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

      console.log(3434343434, message, chat)
    })

});

export default chatRouter
