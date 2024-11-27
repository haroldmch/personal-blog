"use server"
import User, { IUser } from "@/models/User"

import dbConnect from "@/libs/dbConnect"

export async function readAll() {
  await dbConnect()
  try {
    const allUsers: IUser[] = await User.find({})
    return allUsers.map((doc) => doc.toObject({ flattenObjectIds: true }))
  } catch (error) {
    console.error(error)
    return []
  }
}

// change this for zod
export async function findUser(email: string | undefined | null) {
  await dbConnect()
  try {
    const user: IUser | null = await User.findOne({ email })

    return user ? user?.toObject({ flattenObjectIds: true }) : "User not found"
  } catch (error) {
    console.error(error)
    return null
  }
}
