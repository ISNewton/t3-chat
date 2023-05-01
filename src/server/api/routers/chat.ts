
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
  chatId: z.string().optional(),
  receiverId: z.string().optional(),
}).refine(data => data.chatId || data.receiverId, {
  message: "Either chatId or receiverId is required",
});


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
        messages: {
          take: 1,
          orderBy: {
            createdAt: 'desc',
          }
        }
      }
    })

    return chats
  }),
  getChatMessages: protectedProcedure
    .input(getChatMessagesInput)
    .query(async ({ input, ctx }) => {

      let messages

      if (input.chatId) {
        messages = await prisma.message.findMany({
          where: {
            chatId: input.chatId
          }
        })
      } else if(input.receiverId) {
        messages = await prisma.message.findMany({
          where: {
            OR: [
              {
                senderId: input.receiverId,
                receiverId: ctx.session?.user.id
              },
              {
                senderId: ctx.session?.user.id,
                receiverId: input.receiverId
              }
            ]
          }
        })
      }
      else {
        console.log(33333333333333);
        
      }
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

    })

});

export default chatRouter
