import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';

import { Button } from '@/components/library/Button';
import { FormItem } from '@/components/library/FormItem';
import { authenticateUserUsersLoginPost } from '@/api';
import { useAppStore } from '@/state';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getErrorObject } from '@/query';

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
      authenticateUserUsersLoginPost({
        body: {
          ...data,
        },
      }).then(({ data, response, error }) => {
        if (data) return data;
        throw getErrorObject(response, error);
      }),
    onSuccess: () => {
      closeAuthWindow();
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  return (
    <form
      className="vstack w-full p-2 text-white"
      onSubmit={handleSubmit((data) => login(data))}
    >
      <FormItem
        className="vstack p-1 w-full"
        errorMessage={errors.email?.message}
      >
        <input
          placeholder="Email"
          className="w-full p-2 bg-1-2 focus:bg-1-3 rounded-md"
          {...register('email')}
        />
      </FormItem>
      <FormItem
        className="vstack p-1 w-full"
        errorMessage={errors.password?.message}
      >
        <input
          placeholder="Password"
          className="w-full p-2 bg-1-2 focus:bg-1-3 rounded-md"
          {...register('password')}
          type="password"
        />
      </FormItem>
      {error && (
        <FormItem className="vstack p-1 w-full" errorMessage={error.message} />
      )}
      <Button variant="plate" type="submit" className="m-2">
        Sign in
      </Button>
    </form>
  );
};
