import { readUserUsersProfileGet } from '@/api';
import { useQuery } from '@tanstack/react-query';

// export const UnpackedFetchWrapper: <T>(fetchFn: Promise<T>) => Promise<T> = (fetchFn) => {

// }

type HTTPSingleErrorType = {
  detail: string;
};

export const getErrorObject = (response: Response, error: any) => {
  if (error satisfies HTTPSingleErrorType) return new Error(error.detail);
  // if (error satisfies HTTPMultiErrorsType) return new Error(error.detail.map((err) => err.msg).join(';'));
  return new Error(`${response.status}: ${response.statusText}`);
}

export const useProfile = () => {
  const { data: profile, ...rest } = useQuery({
    queryKey: ['profile'],
    queryFn: () =>
      readUserUsersProfileGet().then(({ data, error, response }) => {
        if (data) return data;
        throw getErrorObject(response, error);
      }),
  });

  return { profile, ...rest };
}