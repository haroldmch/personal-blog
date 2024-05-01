'use server';
import User, { IUser } from '@/models/User';
import { z } from 'zod';

const validation = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

import dbConnect from '@/lib/dbConnect';

export async function create(formData: FormData) {
  await dbConnect();

  try {
    const validated = validation.safeParse({
      name: formData?.get('name'),
      email: formData?.get('email'),
      password: formData?.get('password'),
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
