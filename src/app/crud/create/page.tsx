'use client';

import { create } from '@/actions/crud/create';
import { FormEvent, useState, useRef } from 'react';

export default function Page() {
  const [message, setMessage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: FormData = new FormData(e.currentTarget);

    const newUser = await create(formData);

    if (newUser) {
      setMessage(`User "${newUser._id}" was added successfully!`);
      formRef.current?.reset();
    }
  };

  return (
    <>
      <div>
        <h2>Server Actions + BBDD</h2>
        <hr />
        <div>
          <h3>Create</h3>
          {message && <h4>{message}</h4>}
          <form onSubmit={handleCreate} ref={formRef}>
            <label>
              <p>Name:</p>
              <input type="text" name="name" defaultValue="John" required />
            </label>
            <label>
              <p>E-Mail:</p>
              <input type="email" name="email" defaultValue="john.doe@test.com" required />
            </label>
            <label>
              <p>Password:</p>
              <input type="password" name="password" defaultValue="123456" required />
            </label>
            <button type="submit">Create</button>
          </form>
        </div>
      </div>
    </>
  );
}
