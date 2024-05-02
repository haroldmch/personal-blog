'use server';
import User from '@/models/User';

import dbConnect from '@/lib/dbConnect';

export async function deleteUser(id: string) {
  await dbConnect();

  try {
    const deleteUser = await User.deleteOne({ _id: id });

    return deleteUser ? true : false;
  } catch (error) {
    console.error(error);
    return false;
  }
}
