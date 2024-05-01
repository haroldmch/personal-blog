'use client';

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

  return (
    <>
      <div>
        <h2>Server Actions + BBDD</h2>
        <hr />
        <div>
          <h3>Update: All Elements</h3>
          {users.length > 0 && (
            <ul>
              {users.map((key, i) => (
                <li key={i}>
                  <Link href={`update/${key._id}`}>{key.name}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
