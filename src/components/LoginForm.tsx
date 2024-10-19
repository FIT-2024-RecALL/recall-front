import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/library/Button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';

export type UserLoginData = {
  email: string;
  password: string;
};

export const userLoginScheme = z.object({
  email: z.string().email().min(1, 'Email is required'),
  password: z
    .string()
    .min(8, 'Password must be more than or equal to 8 symbols'),
});

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginData>({
    resolver: zodResolver(userLoginScheme),
  });

  const login: SubmitHandler<UserLoginData> = (data) => {
    userLoginScheme.parse(data);
  };

  return (
    <form className="vstack w-full p-2" onSubmit={handleSubmit(login)}>
      <input
        placeholder="Email"
        className="m-2 p-2 bg-1-2 focus:bg-1-3 text-1-6 rounded-md"
        {...register('email')}
      />
      {errors.email?.message && (
        <span className="text-red text-center m-2 p-2 bg-1-1 rounded-md">
          {errors.email?.message.toString()}
        </span>
      )}
      <input
        placeholder="Password"
        className="m-2 p-2 bg-1-2 focus:bg-1-3 text-1-6 rounded-md"
        {...register('password')}
        type="password"
      />
      {errors.password?.message && (
        <span className="text-red text-center m-2 p-2 bg-1-1 rounded-md">
          {errors.password?.message.toString()}
        </span>
      )}
      <Button variant="plate" type="submit" className="m-2">
        Sign in
      </Button>
    </form>
  );
};
