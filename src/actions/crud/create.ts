'use server';
import User, { IUser } from '@/models/User';
import { z } from 'zod';

const validation = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

interface UserData {
  name: string;
  email: string;
  password: string;
  _id: string;
}

import dbConnect from '@/lib/dbConnect';

export async function create(data: UserData) {
  await dbConnect();

  try {
    const validated = validation.safeParse({
      name: data?.name,
      email: data?.email,
      password: data?.password,
    });

    if (!validated.success) {
      return {
        errors: validated.error.flatten().fieldErrors,
      };
    }

    const { name, email, password } = validated.data;

    const user: IUser = await User.create({
      name,
      email,
      password,
    });

    return user.toObject({ flattenObjectIds: true });
  } catch (error) {
    console.error(error);
    return;
  }
}
