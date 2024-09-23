import React, { useState } from 'react';
import {
  createSecretGeneratePost,
  takeSecretSecretsSecretKeyGet,
} from '@/api/services.gen';
import { Button } from '@/components/library/Button';

export const GeneratePage: React.FC = () => {
  const [key, setKey] = useState('');
  const [secretText, setSecretText] = useState('');

  const testPost = () => {
    createSecretGeneratePost({
      body: { password: '1234', secret_text: 'TOP SECRET' },
    }).then((response) => {
      if (response.error) setKey(`Error: ${response.error}`);
      else setKey(response.data.secret_key);
    });
  };
  const testGet = () => {
    takeSecretSecretsSecretKeyGet({
      path: {
        secret_key: key,
      },
      query: {
        password: '1234',
      },
    }).then((response) => {
      if (response.error) setSecretText(`Error: ${response.error}`);
      else setSecretText(`Secret text is: ${response.data.secret_text}`);
    });
  };

  return (
    <>
      <Button onClick={testPost}>Generate some text</Button>
      <p>
        Secret key: <code>{key}</code>
      </p>
      <Button onClick={testGet}>Get secret text</Button>
      <p>
        Text: <code>{secretText}</code>
      </p>
    </>
  );
};
