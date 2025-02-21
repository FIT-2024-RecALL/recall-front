import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';

import { Button } from '@/components/library/Button';
import { FormItem } from '@/components/library/FormItem';
import { useAppStore } from '@/state';
import clsx from 'clsx';
import { useRegister } from '@/query/mutationHooks';

const userRegisterScheme = z
  .object({
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    nickname: z.string().min(1, 'Nickname is required'),
    password1: z.string().min(8, 'Password must be >= 8 symbols'),
    password2: z.string().min(8, 'Repetition of password is required'),
  })
  .refine((data) => data.password1 === data.password2, {
    message: 'Repeat your password correctly',
    path: ['password2'],
  });
export type UserRegisterData = z.infer<typeof userRegisterScheme>;

export const RegisterForm: React.FC = () => {
  const closeAuthWindow = useAppStore((state) => state.closeAuthWindow);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterData>({
    resolver: zodResolver(userRegisterScheme),
  });

  const { registerUser, error } = useRegister(() => {
    closeAuthWindow();
  });

  return (
    <form
      className="vstack w-full p-2 text-white"
      onSubmit={handleSubmit((data) => registerUser(data))}
    >
      <FormItem
        className="vstack p-1 w-full"
        errorMessage={errors.email?.message}
      >
        <input
          placeholder="Email"
          className={clsx(
            'p-1 md:p-2 w-full',
            'text-o-black font-medium rounded',
            'bg-transparent border-b border-o-black',
            'focus:outline-none focus:border-b-2'
          )}
          {...register('email')}
        />
      </FormItem>
      <FormItem
        className="vstack p-1 w-full"
        errorMessage={errors.nickname?.message}
      >
        <input
          placeholder="Nickname"
          className={clsx(
            'p-1 md:p-2 w-full',
            'text-o-black font-medium rounded',
            'bg-transparent border-b border-o-black',
            'focus:outline-none focus:border-b-2'
          )}
          {...register('nickname')}
        />
      </FormItem>
      <FormItem
        className="vstack p-1 w-full"
        errorMessage={errors.password1?.message}
      >
        <input
          placeholder="Create password"
          className={clsx(
            'p-1 md:p-2 w-full',
            'text-o-black font-medium rounded',
            'bg-transparent border-b border-o-black',
            'focus:outline-none focus:border-b-2'
          )}
          {...register('password1')}
          type="password"
        />
      </FormItem>
      <FormItem
        className="vstack p-1 w-full"
        errorMessage={errors.password2?.message}
      >
        <input
          placeholder="Repeat password"
          className={clsx(
            'p-1 md:p-2 w-full',
            'text-o-black font-medium rounded',
            'bg-transparent border-b border-o-black',
            'focus:outline-none focus:border-b-2'
          )}
          {...register('password2')}
          type="password"
        />
      </FormItem>
      {error && (
        <FormItem className="vstack p-1 w-full" errorMessage={error.message} />
      )}
      <div className="center mt-2 mb-1">
        <Button
          variant="plate-blue"
          type="submit"
          className="w-2/3 text-lg font-medium"
        >
          Sign up
        </Button>
      </div>
    </form>
  );
};
