import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/library/Button';
import { FormItem } from '@/components/library/FormItem';
import { authenticateUserUserLoginPost } from '@/api';
import { useAppStore } from '@/state';
import { dataExtractionWrapper } from '@/query';
import { getProfileQueryOptions } from '@/query/queryHooks';
import clsx from 'clsx';

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

  const queryClient = useQueryClient();
  const { mutate: login, error } = useMutation({
    mutationFn: (data: UserLoginData) =>
      dataExtractionWrapper(
        authenticateUserUserLoginPost({
          body: {
            ...data,
          },
        })
      ),
    onSuccess: (data) => {
      closeAuthWindow();
      queryClient.setQueryData(getProfileQueryOptions().queryKey, data);
    },
  });

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
            'text-1-1 font-medium rounded',
            'bg-transparent border-b border-1-1',
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
            'text-1-1 font-medium rounded',
            'bg-transparent border-b border-1-1',
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
          variant="plate"
          type="submit"
          className="w-2/3 text-lg font-medium"
        >
          Sign in
        </Button>
      </div>
    </form>
  );
};
