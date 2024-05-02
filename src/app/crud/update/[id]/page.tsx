'use client';

import { read } from '@/actions/crud/read';
import { update } from '@/actions/crud/update';
import { IUser } from '@/models/User';
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface UserData {
  name: string;
  email: string;
  password: string;
  _id: string;
}

export default function Page({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<UserData>();

  const handleUpdate: SubmitHandler<UserData> = async (data) => {
    const userUpdated: IUser = await update(data);

    if (userUpdated) {
      setMessage(`User "${userUpdated._id}" was updated successfully!`);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const user: IUser = await read(params.id);
      if (user) {
        setUser(true);
        reset({
          name: user.name,
          email: user.email,
          password: user.password,
          _id: user._id,
        });
      }
    };
    getUser();
  }, [params.id, reset]);

  return (
    <>
      {user && (
        <>
          <h3>Update</h3>
          {message && <h4>{message}</h4>}
          <form onSubmit={handleSubmit(handleUpdate)}>
            <label>
              <p>Name:</p>
              <input
                type="text"
                {...register('name', {
                  required: {
                    value: true,
                    message: 'Name is required',
                  },
                })}
              />
              {errors.name && <span>{errors.name?.message?.toString()}</span>}
            </label>
            <label>
              <p>E-Mail:</p>
              <input
                type="text"
                {...register('email', {
                  required: {
                    value: true,
                    message: 'E-Mail is required',
                  },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Entered value does not match email format',
                  },
                })}
              />
              {errors.email && <span>{errors.email?.message?.toString()}</span>}
            </label>
            <label>
              <p>Password:</p>
              <input
                type="text"
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Password is required',
                  },
                  minLength: {
                    value: 6,
                    message: 'Password must have at least 6 characters',
                  },
                })}
              />
              {errors.password && <span>{errors.password?.message?.toString()}</span>}
            </label>
            <hr />
            <button type="submit">Update</button>
          </form>
        </>
      )}
    </>
  );
}
