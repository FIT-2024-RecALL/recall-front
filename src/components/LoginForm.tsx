import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/library/Button';

export type UserLoginData = {
  email: string;
  password: string;
};

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginData>();

  const login: SubmitHandler<UserLoginData> = (data) => {
    console.log(data);
  };

  return (
    <form className="vstack w-full p-2" onSubmit={handleSubmit(login)}>
      <input
        placeholder="Email"
        className="m-2 p-2 bg-1-2 focus:bg-1-3 text-1-6 rounded-md"
        {...register('email', { required: true })}
      />
      {errors.email?.type === 'required' && (
        <span className="text-red text-center m-2 p-2 bg-1-1 rounded-md">
          Email is required
        </span>
      )}
      <input
        placeholder="Password"
        className="m-2 p-2 bg-1-2 focus:bg-1-3 text-1-6 rounded-md"
        {...register('password', { required: true })}
        type="password"
      />
      {errors.password?.type === 'required' && (
        <span className="text-red text-center m-2 p-2 bg-1-1 rounded-md">
          Password is required
        </span>
      )}
      <Button variant="plate" type="submit" className="m-2">
        Sign in
      </Button>
    </form>
  );
};
