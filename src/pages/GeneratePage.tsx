import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { createSecretGeneratePost } from '@/api';
import { Button } from '@/components/library/Button';

// Объект данных формы. Может быть и type, и interface
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
    // data будет иметь тип CreateSecretFormData
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
      {/* handleSubmit - функция высшего порядка, которая передаст 
      в наш собственный обработчик чистые данные желаемого типа */}
      <form onSubmit={handleSubmit(sendCreateData)}>
        <input
          className="bg-1-2 br-1-6 border-1 p-1 m-1"
          placeholder="Secret text"
          {...register('secret_text', { required: true })}
        />
        {errors.secret_text && <span>Secret text is required</span>}
        <input
          placeholder="Password"
          {...register('password', { required: true, minLength: 4 })}
        />
        {errors.password?.type == 'required' && (
          <span>Password is required</span>
        )}
        {errors.password?.type == 'minLength' && (
          <span>Minimal password length is 4</span>
        )}
        <Button variant="plate" type="submit">
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
