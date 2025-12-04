import { prisma } from "../config/prisma.js";
import bcrypt from "bcryptjs";

const createUserAndProfile = async (firstName, lastName, username, password) => {
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      username,
      password: hashPassword,
      profile: {
        create: {
          firstName,
          lastName
        }
      }
    },
    include: { profile: true }
  })

  return user;
}

export default { createUserAndProfile }