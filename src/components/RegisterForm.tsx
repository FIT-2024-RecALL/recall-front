import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';

import { Button } from '@/components/library/Button';
import { FormItem } from '@/components/library/FormItem';
import {
  authenticateUserUsersLoginPost,
  createUserUsersRegisterPost,
  readCurrentUserUsersProfileGet,
} from '@/api';
import { useAppStore } from '@/state';

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

  const [registerErrorMessage, setRegisterErrorMessage] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterData>({
    resolver: zodResolver(userRegisterScheme),
  });

  const registerUser: SubmitHandler<UserRegisterData> = (data) => {
    createUserUsersRegisterPost({
      body: {
        email: data.email,
        nickname: data.nickname,
        password: data.password1,
      },
    })
      .then((responseData) => {
        if (responseData.response.ok)
          return authenticateUserUsersLoginPost({
            body: {
              email: data.email,
              password: data.password1,
            },
          });
        // else setRegisterErrorMessage(responseData.error?.detail?.toString());
        else console.log(responseData.error?.detail);
      })
      .then((loginResponse) => {
        if (loginResponse?.response.ok) {
          readCurrentUserUsersProfileGet().then((userResponse) => {
            console.log(userResponse.data); // TODO: подать куда надо сигнал об обновлении визуала пользователя
          });
          closeAuthWindow();
        } else console.log('Error: ' + loginResponse?.error?.detail);
      });
  };

  return (
    <form
      className="vstack w-full p-2 text-white"
      onSubmit={handleSubmit(registerUser)}
    >
      <FormItem
        className="vstack p-1 w-full"
        errorMessage={errors.email?.message}
      >
        <input
          placeholder="Email"
          className="w-full p-2 bg-1-2 focus:bg-1-3 rounded-md placeholder-shown:text-1-8"
          {...register('email')}
        />
      </FormItem>
      <FormItem
        className="vstack p-1 w-full"
        errorMessage={errors.nickname?.message}
      >
        <input
          placeholder="Nickname"
          className="w-full p-2 bg-1-2 focus:bg-1-3 rounded-md placeholder-shown:text-1-8"
          {...register('nickname')}
        />
      </FormItem>
      <FormItem
        className="vstack p-1 w-full"
        errorMessage={errors.password1?.message}
      >
        <input
          placeholder="Create password"
          className="w-full p-2 bg-1-2 focus:bg-1-3 rounded-md"
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
          className="w-full p-2 bg-1-2 focus:bg-1-3 rounded-md"
          {...register('password2')}
          type="password"
        />
      </FormItem>
      {registerErrorMessage && (
        <FormItem
          className="vstack p-1 w-full"
          errorMessage={registerErrorMessage}
        />
      )}
      <Button variant="plate" type="submit" className="m-2">
        Sign up
      </Button>
    </form>
  );
};
