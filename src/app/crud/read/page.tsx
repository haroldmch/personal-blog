'use client';

import { deleteUser } from '@/actions/crud/delete';
import { readAll } from '@/actions/crud/read';
import { IUser } from '@/models/User';
import Link from 'next/link';
import { useState, useEffect } from 'react';
export default function Page() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const getAll = async () => {
      const allUsers: IUser[] = await readAll();

      setUsers(allUsers);
    };

    getAll();
  }, []);

  const handleDelete = async (id: string) => {
    const resp: boolean = await deleteUser(id);

    if (resp) {
      const newUsers = users.filter((item) => item._id !== id);
      setUsers(newUsers);
    }
  };

  return (
    <>
      <h3>All Elements</h3>
      {users.length > 0 && (
        <ul>
          {users.map((key, i) => (
            <li key={i}>
              {key.name}:{' '}
              <Link href={`update/${key._id}`}>
                <button>Update</button>
              </Link>
              <button onClick={() => handleDelete(key._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
