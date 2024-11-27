import mongoose, { Document, Schema } from "mongoose"
import { z } from "zod"

export const zUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Email format invalid"),
  role: z.number(),
  status: z.boolean(),
})
export type IUserZod = z.infer<typeof zUserSchema>

export interface IUser extends Document, IUserZod {}

const userSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    role: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema)

export default User
