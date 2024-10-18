import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/library/Button';

export type UserRegisterData = {
  email: string;
  password1: string;
  password2: string;
};

export const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterData>();

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
      {errors.email?.type === 'required' && (
        <span className="text-red text-center m-2 p-2 bg-1-1 rounded-md">
          Email is required
        </span>
      )}
      <input
        placeholder="Create password"
        className="m-2 p-2 bg-1-2 focus:bg-1-3 text-1-6 rounded-md"
        {...register('password1', { required: true })}
        type="password"
      />
      {errors.password1?.type === 'required' && (
        <span className="text-red text-center m-2 p-2 bg-1-1 rounded-md">
          Password is required
        </span>
      )}
      <input
        placeholder="Repeat password"
        className="m-2 p-2 bg-1-2 focus:bg-1-3 text-1-6 rounded-md"
        {...register('password2', { required: true })}
        type="password"
      />
      {/* TODO: добавить проверку на эквивалентность */}
      {errors.password1?.type === 'required' && (
        <span className="text-red text-center m-2 p-2 bg-1-1 rounded-md">
          You must repeat your password
        </span>
      )}
      <Button variant="plate" type="submit" className="m-2">
        Sign up
      </Button>
    </form>
  );
};
