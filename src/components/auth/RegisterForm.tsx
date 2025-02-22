import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';

import { Button, Input, FormItem } from '@/components/library';
import { useAppStore } from '@/state';
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
    control,
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
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input placeholder="Email" {...field} />}
        />
      </FormItem>
      <FormItem
        className="vstack p-1 w-full"
        errorMessage={errors.nickname?.message}
      >
        <Controller
          name="nickname"
          control={control}
          render={({ field }) => <Input placeholder="Nickname" {...field} />}
        />
      </FormItem>
      <FormItem
        className="vstack p-1 w-full"
        errorMessage={errors.password1?.message}
      >
        <Controller
          name="password1"
          control={control}
          render={({ field }) => (
            <Input placeholder="Create password" type="password" {...field} />
          )}
        />
      </FormItem>
      <FormItem
        className="vstack p-1 w-full"
        errorMessage={errors.password2?.message}
      >
        <Controller
          name="password2"
          control={control}
          render={({ field }) => (
            <Input placeholder="Repeat password" type="password" {...field} />
          )}
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
