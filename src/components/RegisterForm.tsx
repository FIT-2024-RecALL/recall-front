import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/library/Button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';

export type UserRegisterData = {
  email: string;
  password1: string;
  password2: string;
};

export const userRegisterScheme = z.object({
  email: z.string().email().min(1, 'Email is required'),
  password1: z
    .string()
    .min(8, 'Password must be more than or equal to 8 symbols'),
  password2: z.string().min(8, 'Repeat your password'),
});

export const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterData>({
    resolver: zodResolver(userRegisterScheme),
  });

  // TODO: добавить дополнительную стороннюю проверку на соответствие паролей

  const registerUser: SubmitHandler<UserRegisterData> = (data) => {
    console.log(data);
  };

  return (
    <form className="vstack w-full p-2" onSubmit={handleSubmit(registerUser)}>
      <input
        placeholder="Email"
        className="m-2 p-2 bg-1-2 focus:bg-1-3 text-1-6 rounded-md"
        {...register('email', { required: true })}
      />
      {errors.email?.message && (
        <span className="text-red text-center m-2 p-2 bg-1-1 rounded-md">
          {errors.email?.message.toString()}
        </span>
      )}
      <input
        placeholder="Create password"
        className="m-2 p-2 bg-1-2 focus:bg-1-3 text-1-6 rounded-md"
        {...register('password1', { required: true })}
        type="password"
      />
      {errors.password1?.message && (
        <span className="text-red text-center m-2 p-2 bg-1-1 rounded-md">
          {errors.password1?.message.toString()}
        </span>
      )}
      <input
        placeholder="Repeat password"
        className="m-2 p-2 bg-1-2 focus:bg-1-3 text-1-6 rounded-md"
        {...register('password2')}
        type="password"
      />
      {errors.password2?.message && (
        <span className="text-red text-center m-2 p-2 bg-1-1 rounded-md">
          {errors.password2?.message.toString()}
        </span>
      )}
      <Button variant="plate" type="submit" className="m-2">
        Sign up
      </Button>
    </form>
  );
};
