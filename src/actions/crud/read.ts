'use server';
import User, { IUser } from '@/models/User';

import dbConnect from '@/lib/dbConnect';

export async function readAll() {
  await dbConnect();
  try {
    const allUsers: IUser[] = await User.find({});
    return allUsers.map((doc) => doc.toObject({ flattenObjectIds: true }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function read(id: string) {
  await dbConnect();
  try {
    const user: IUser | null = await User.findById(id);

    return user?.toObject({ flattenObjectIds: true });
  } catch (error) {
    console.error(error);
    return null;
  }
}
