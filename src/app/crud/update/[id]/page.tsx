'use client';

import { read } from '@/actions/crud/read';
import { IUser } from '@/models/User';
import { useState, useEffect } from 'react';

export default function Page({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const user: IUser = await read(params.id);

      setUser(user);
    };

    getUser();
  }, [params.id]);

  const handleUpdate = (e: FormEvent<HTMLFormElement>) => {};

  return (
    <>
      <div>
        <h2>Server Actions + BBDD</h2>
        <hr />
        <div>
          {user && (
            <>
              <h3>Update {user.name}</h3>
              <form onSubmit={handleUpdate}>
                <label>
                  <p>Name:</p>
                  <input type="text" name="name" value={user.name} required />
                </label>
                <label>
                  <p>E-Mail:</p>
                  <input type="email" name="email" value={user.email} required />
                </label>
                <label>
                  <p>Password:</p>
                  <input type="text" name="password" value={user.password} required />
                </label>
                <input type="hidden" name="_id" value={user._id} />
                <button type="submit">Update</button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
