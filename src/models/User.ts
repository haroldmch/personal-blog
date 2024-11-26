"use server"
import mongoose, { Document, Schema } from "mongoose"
import { z } from "zod"

const zUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Email format invalid"),
  role: z.number(),
  status: z.boolean(),
  creation: z.object({
    t: z.number().int().positive(),
    i: z.number().int().min(0),
  }),
})
export type IUserZod = z.infer<typeof zUserSchema>

export interface IUser extends Document, IUserZod {}

const userSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address"],
  },
  role: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  creation: {
    type: Boolean,
    required: true,
  },
})

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema)

export default User
