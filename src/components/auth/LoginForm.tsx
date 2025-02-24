import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';

import { Button, Input, FormItem } from '@/components/library';
import { useAppStore } from '@/state';
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
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserLoginData>({
    resolver: zodResolver(userLoginScheme),
  });

  const { login, error } = useLogin(() => closeAuthWindow());

  return (
    <form
      className="vstack center w-full"
      onSubmit={handleSubmit((data) => login(data))}
    >
      <FormItem
        className="vstack mb-2 w-full"
        errorMessage={errors.email?.message}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input placeholder="Email" inputMode="email" {...field} />
          )}
        />
      </FormItem>
      <FormItem
        className="vstack mb-2 w-full"
        errorMessage={errors.password?.message}
      >
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input placeholder="Password" type="password" {...field} />
          )}
        />
      </FormItem>
      {error && (
        <FormItem className="vstack mb-2 w-full" errorMessage={error.message} />
      )}
      <Button
        variant="plate-green"
        type="submit"
        className="full text-lg font-medium"
        withShadow
        shadowBoxClassName="w-2/3 mt-1 mb-2"
      >
        Sign in
      </Button>
    </form>
  );
};
