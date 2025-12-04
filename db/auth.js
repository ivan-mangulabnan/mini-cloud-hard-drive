import { prisma } from "../config/prisma.js";

const getUserByUsername = async (username) => {
  const user = await prisma.user.findUnique({
    where: { username }
  })

  return user;
}

const getProfileByID = async (id) => {
  const profile = await prisma.user.findUnique({
    where: { id },
    include: { profile: true }
  })

  return profile;
}

export default { getUserByUsername, getProfileByID }