'use client';

import { create } from '@/actions/crud/create';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface UserData {
  name: string;
  email: string;
  password: string;
  _id: string;
}

export default function Page() {
  const [message, setMessage] = useState<string | null>(null);
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<UserData>({
    defaultValues: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    },
  });

  const handleCreate: SubmitHandler<UserData> = async (data) => {
    const newUser = await create(data);
    if (newUser) {
      setMessage(`User "${newUser._id}" was added successfully!`);
      reset({
        name: '',
        email: '',
        password: '',
      });
    }
  };

  return (
    <>
      <h3>Update</h3>
      {message && <h4>{message}</h4>}
      <form onSubmit={handleSubmit(handleCreate)}>
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
        <button type="submit">Create</button>
      </form>
    </>
  );

  // const formRef = useRef<HTMLFormElement>(null);
  // const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData: FormData = new FormData(e.currentTarget);

  //   const newUser = await create(formData);

  //   if (newUser) {
  //     setMessage(`User "${newUser._id}" was added successfully!`);
  //     formRef.current?.reset();
  //   }
  // };

  // return (
  //   <>
  //     <div>
  //       <h2>Server Actions + BBDD</h2>
  //       <hr />
  //       <div>
  //         <h3>Create</h3>
  //         {message && <h4>{message}</h4>}
  //         <form onSubmit={handleCreate} ref={formRef}>
  //           <label>
  //             <p>Name:</p>
  //             <input type="text" name="name" defaultValue="John" required />
  //           </label>
  //           <label>
  //             <p>E-Mail:</p>
  //             <input type="email" name="email" defaultValue="john.doe@test.com" required />
  //           </label>
  //           <label>
  //             <p>Password:</p>
  //             <input type="password" name="password" defaultValue="123456" required />
  //           </label>
  //           <button type="submit">Create</button>
  //         </form>
  //       </div>
  //     </div>
  //   </>
  // );
}
