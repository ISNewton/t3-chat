import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { uploadAvatar } from "~/utils/avatarHelper";
import { hash } from "~/utils/hashHelper";


export const usersRouter = createTRPCRouter({
    search: protectedProcedure
        .input(z.string())
        .query(async ({ input , ctx }) => {
            const users = await prisma.user.findMany({
                where: {
                    username: {
                        contains: input,
                    },
                    id: {
                        not: ctx.session.user.id
                    }
                }
            })
            return users
        })
});
