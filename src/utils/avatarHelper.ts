import { env } from "~/env.mjs";
import fs from 'fs'
import { v4 as uuid4 } from "uuid";

import sharp from "sharp";
import { TRPCError } from "@trpc/server";
import { User } from "@prisma/client";

export function uploadAvatar(file:string):string {
    const dir = 'public/avatars/';
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

     
  
      const base64Data = file.split(";base64,").pop();
      const fileName = uuid4() + ".jpeg";
      const fullPath = dir + fileName;


      
      if (base64Data)
        sharp(Buffer.from(base64Data, "base64"))
          .toFormat("jpeg", { quality: 80 })
          .toFile(fullPath);          
  
      return fileName;
    } catch (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Something went wrong",
      });
    }

}

export function getAvatarText(user:User) {
  return 'ss';
  return `public/avatars/${user.image}`
}