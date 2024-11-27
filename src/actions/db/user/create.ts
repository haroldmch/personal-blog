"use server"

import User, { IUser, IUserZod, zUserSchema } from "@/models/User"

import dbConnect from "@/libs/dbConnect"

export async function create({ name, email, role, status }: IUserZod) {
  await dbConnect()

  try {
    const validated = zUserSchema.safeParse({
      name,
      email,
      role,
      status,
    })

    if (!validated.success) {
      return {
        errors: validated.error.flatten().fieldErrors,
      }
    }

    const user: IUser = await User.create({
      name,
      email,
      role,
      status,
    })

    return { status: "success", user: user.toObject({ flattenObjectIds: true }) }
  } catch (error) {
    console.error(error)
    return { status: "error", message: "Unknown error: " + error }
  }
}
