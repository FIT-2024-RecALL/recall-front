import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';

import { Button } from '@/components/library/Button';
import { FormItem } from '@/components/library/FormItem';
import { useAppStore } from '@/state';
import clsx from 'clsx';
import { useLogin } from '@/query/mutationHooks';

const userLoginScheme = z.object({
  email: z.string().email().min(1, 'Email is required'),
  password: z
    .string()
    .min(8, 'Password must be more than or equal to 8 symbols'),
});
export type UserLoginData = z.infer<typeof userLoginScheme>;

export const LoginForm: React.FC = () => {
  const closeAuthWindow = useAppStore((state) => state.closeAuthWindow);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginData>({
    resolver: zodResolver(userLoginScheme),
  });

  const { login, error } = useLogin(() => closeAuthWindow());

  return (
    <form
      className="vstack w-full"
      onSubmit={handleSubmit((data) => login(data))}
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
        errorMessage={errors.password?.message}
      >
        <input
          placeholder="Password"
          className={clsx(
            'p-1 md:p-2 w-full',
            'text-o-black font-medium rounded',
            'bg-transparent border-b border-o-black',
            'focus:outline-none focus:border-b-2'
          )}
          {...register('password')}
          type="password"
        />
      </FormItem>
      {error && (
        <FormItem className="vstack p-1 w-full" errorMessage={error.message} />
      )}
      <div className="center mt-2 mb-1">
        <Button
          variant="plate-green"
          type="submit"
          className="w-2/3 text-lg font-medium"
        >
          Sign in
        </Button>
      </div>
    </form>
  );
};
