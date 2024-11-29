type HTTPSingleErrorType = {
  detail: string;
};

type OwnRequestResult<Data = unknown, TError = unknown> = Promise<
  (
    | {
        data: Data;
        error: undefined;
      }
    | {
        data: undefined;
        error: TError;
      }
  ) & {
    request: Request;
    response: Response;
  }
>;

type DataExtractorWrapper = <D>(
  promise: OwnRequestResult<D, any>
) => Promise<D>;

export const dataExtractionWrapper: DataExtractorWrapper = (promise) =>
  promise.then(({ data, error, response }) => {
    if (data) return data;
    if (error && (error satisfies HTTPSingleErrorType))
      throw new Error(error.detail);
    throw new Error(`${response.status}: ${response.statusText}`);
  });