import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { takeSecretSecretsSecretKeyGet } from '@/api';
import { Button } from '@/components/library/Button';

type GetSecretFormData = {
  secret_key: string;
  password: string;
};

export const GetSecretPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GetSecretFormData>();

  const [secretMessage, setSecretMessage] = useState('');

  const sendCreateData: SubmitHandler<GetSecretFormData> = (data) => {
    takeSecretSecretsSecretKeyGet({
      path: {
        secret_key: data.secret_key,
      },
      query: {
        password: data.password,
      },
    }).then((response) => {
      if (!response.response.ok) {
        setSecretMessage(response.response.statusText);
        return;
      }
      if (response.data) setSecretMessage(response.data.secret_text);
      else console.log(response.error.detail);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(sendCreateData)}>
        <input
          placeholder="Secret key"
          {...register('secret_key', { required: true })}
        />
        {errors.secret_key && <span>Secret key is required</span>}
        <input
          placeholder="Password"
          {...register('password', { required: true })}
        />
        {errors.password && <span>Password is required</span>}
        <Button variant="default" type="submit">
          Get secret message
        </Button>
      </form>
      {secretMessage && <p>{secretMessage}</p>}
    </>
  );
};
