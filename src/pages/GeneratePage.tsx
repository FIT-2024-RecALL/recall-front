import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { createSecretGeneratePost } from '@/api';
import { Button } from '@/components/library/Button';

type CreateSecretFormData = {
  secret_text: string;
  password: string;
};

export const GeneratePage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSecretFormData>();

  const [secretKey, setSecretKey] = useState('');

  const sendCreateData: SubmitHandler<CreateSecretFormData> = (data) => {
    createSecretGeneratePost({
      body: data,
    }).then((response) => {
      if (!response.response.ok) {
        setSecretKey(response.response.statusText);
        return;
      }
      if (response.data) setSecretKey(response.data.secret_key);
      else console.log(response.error.detail);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(sendCreateData)}>
        <input
          placeholder="Secret text"
          {...register('secret_text', { required: true })}
        />
        {errors.secret_text && <span>Secret text is required</span>}
        <input
          placeholder="Password"
          {...register('password', { required: true })}
        />
        {errors.password && <span>Password is required</span>}
        <Button variant="default" type="submit">
          Create secret message
        </Button>
      </form>
      {secretKey && (
        <span>
          Your secret code is: <code>{secretKey}</code>
        </span>
      )}
    </>
  );
};
