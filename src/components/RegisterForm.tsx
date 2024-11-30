import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';

import { Button } from '@/components/library/Button';
import { FormItem } from '@/components/library/FormItem';
import { createUserUserRegisterPost } from '@/api';
import { useAppStore } from '@/state';
import { dataExtractionWrapper } from '@/query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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

  const queryClient = useQueryClient();
  const { mutate: registerUser, error } = useMutation({
    mutationFn: (data: UserRegisterData) =>
      dataExtractionWrapper(
        createUserUserRegisterPost({
          body: {
            email: data.email,
            nickname: data.nickname,
            password: data.password1,
          },
        })
      ),
    onSuccess: (data) => {
      closeAuthWindow();
      queryClient.setQueryData(['profile'], data);
    },
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
      {error && (
        <FormItem className="vstack p-1 w-full" errorMessage={error.message} />
      )}
      <Button variant="plate" type="submit" className="m-2">
        Sign up
      </Button>
    </form>
  );
};
