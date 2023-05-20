
import { observable } from "@trpc/server/observable";
import { EventEmitter } from "stream";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { hash } from "~/utils/hashHelper";

const ee = new EventEmitter();
const roomRouter = createTRPCRouter({

  onAdd: publicProcedure.subscription(() => {
    // return an `observable` with a callback which is triggered immediately
    return observable<any>((emit) => {
      const onAdd = (data: any) => {
        // emit data to client
        console.log(88888)
        emit.next(data);
      };

      // trigger `onAdd()` when `add` is triggered in our event emitter
      ee.on('add', onAdd);

      console.log(88888)
      // unsubscribe function when client disconnects or stops subscribing
      return () => {
        ee.off('add', onAdd);
      };
    });
  }),
  add: publicProcedure
    .input(
      z.object({
        id: z.string().uuid().optional(),
        text: z.string().min(1),
      }),
    )
    .mutation(async (opts) => {
      const post = { ...opts.input }; /* [..] add to db */

      console.log('add funtion 3333333333333333')
  const i =     ee.emit('add', post);
  console.log(i , 44)
      return post;
    }),
});

export default roomRouter
