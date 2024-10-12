// This file is auto-generated by @hey-api/openapi-ts

export const CreateSecretResponseSchemeSchema = {
  properties: {
    secret_key: {
      type: 'string',
      title: 'Secret Key',
    },
  },
  type: 'object',
  required: ['secret_key'],
  title: 'CreateSecretResponseScheme',
} as const;

export const HTTPValidationErrorSchema = {
  properties: {
    detail: {
      items: {
        $ref: '#/components/schemas/ValidationError',
      },
      type: 'array',
      title: 'Detail',
    },
  },
  type: 'object',
  title: 'HTTPValidationError',
} as const;

export const SecretSchemeSchema = {
  properties: {
    secret_text: {
      type: 'string',
      title: 'Secret Text',
    },
    password: {
      type: 'string',
      title: 'Password',
    },
  },
  type: 'object',
  required: ['secret_text', 'password'],
  title: 'SecretScheme',
} as const;

export const TakeSecretResponseSchemeSchema = {
  properties: {
    secret_text: {
      type: 'string',
      title: 'Secret Text',
    },
  },
  type: 'object',
  required: ['secret_text'],
  title: 'TakeSecretResponseScheme',
} as const;

export const ValidationErrorSchema = {
  properties: {
    loc: {
      items: {
        anyOf: [
          {
            type: 'string',
          },
          {
            type: 'integer',
          },
        ],
      },
      type: 'array',
      title: 'Location',
    },
    msg: {
      type: 'string',
      title: 'Message',
    },
    type: {
      type: 'string',
      title: 'Error Type',
    },
  },
  type: 'object',
  required: ['loc', 'msg', 'type'],
  title: 'ValidationError',
} as const;
