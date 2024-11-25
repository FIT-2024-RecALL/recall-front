import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';

import { Button } from '@/components/library/Button';
import { FormItem } from '@/components/library/FormItem';
import {
  authenticateUserUsersLoginPost,
  readCurrentUserUsersProfileGet,
} from '@/api';
import { useAppStore } from '@/state';

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

  const login: SubmitHandler<UserLoginData> = (data) => {
    authenticateUserUsersLoginPost({
      body: {
        ...data,
      },
    }).then((data) => {
      if (data.response.ok) {
        readCurrentUserUsersProfileGet().then((data) => {
          console.log(data.data); // TODO: подать куда надо сигнал об обновлении визуала пользователя
        });
        closeAuthWindow();
      } else console.log('Error: ' + data.error?.detail);
    });
  };

  return (
    <form
      className="vstack w-full p-2 text-white"
      onSubmit={handleSubmit(login)}
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
      <Button variant="plate" type="submit" className="m-2">
        Sign in
      </Button>
    </form>
  );
};
