// This file is auto-generated by @hey-api/openapi-ts

import {
  createClient,
  createConfig,
  type Options,
  formDataBodySerializer,
} from '@hey-api/client-fetch';
import type {
  ReadCardCardsCardIdGetData,
  ReadCardCardsCardIdGetError,
  ReadCardCardsCardIdGetResponse,
  UpdateCardCardsCardIdPutData,
  UpdateCardCardsCardIdPutError,
  UpdateCardCardsCardIdPutResponse,
  DeleteCardCardsCardIdDeleteData,
  DeleteCardCardsCardIdDeleteError,
  DeleteCardCardsCardIdDeleteResponse,
  ReadCardCollectionsCardsCardIdCollectionsGetData,
  ReadCardCollectionsCardsCardIdCollectionsGetError,
  ReadCardCollectionsCardsCardIdCollectionsGetResponse,
  ReadCardFilesCardsCardIdFilesGetData,
  ReadCardFilesCardsCardIdFilesGetError,
  ReadCardFilesCardsCardIdFilesGetResponse,
  CreateCardCardsPostData,
  CreateCardCardsPostError,
  CreateCardCardsPostResponse,
  ReadCollectionCollectionsCollectionIdGetData,
  ReadCollectionCollectionsCollectionIdGetError,
  ReadCollectionCollectionsCollectionIdGetResponse,
  UpdateCollectionCollectionsCollectionIdPutData,
  UpdateCollectionCollectionsCollectionIdPutError,
  UpdateCollectionCollectionsCollectionIdPutResponse,
  DeleteCollectionCollectionsCollectionIdDeleteData,
  DeleteCollectionCollectionsCollectionIdDeleteError,
  DeleteCollectionCollectionsCollectionIdDeleteResponse,
  ReadCollectionsCollectionsGetData,
  ReadCollectionsCollectionsGetError,
  ReadCollectionsCollectionsGetResponse,
  CreateCollectionCollectionsPostData,
  CreateCollectionCollectionsPostError,
  CreateCollectionCollectionsPostResponse,
  ReadCollectionCardsCollectionsCollectionIdCardsGetData,
  ReadCollectionCardsCollectionsCollectionIdCardsGetError,
  ReadCollectionCardsCollectionsCollectionIdCardsGetResponse,
  TrainCardsCollectionsCollectionIdCardsTrainGetData,
  TrainCardsCollectionsCollectionIdCardsTrainGetError,
  TrainCardsCollectionsCollectionIdCardsTrainGetResponse,
  UpdateCollectionPublicityCollectionsCollectionIdPublicityPutData,
  UpdateCollectionPublicityCollectionsCollectionIdPublicityPutError,
  UpdateCollectionPublicityCollectionsCollectionIdPublicityPutResponse,
  AddFileStoragePostData,
  AddFileStoragePostError,
  AddFileStoragePostResponse,
  GetFileMetaStorageFileIdMetaGetData,
  GetFileMetaStorageFileIdMetaGetError,
  GetFileMetaStorageFileIdMetaGetResponse,
  GetFileCardsStorageFileIdCardsGetData,
  GetFileCardsStorageFileIdCardsGetError,
  GetFileCardsStorageFileIdCardsGetResponse,
  GetFileStorageFileIdGetData,
  GetFileStorageFileIdGetError,
  GetFileStorageFileIdGetResponse,
  DeleteFileStorageFileIdDeleteData,
  DeleteFileStorageFileIdDeleteError,
  DeleteFileStorageFileIdDeleteResponse,
  ReadCardLastTrainRecordTrainRecordsLastCardIdGetData,
  ReadCardLastTrainRecordTrainRecordsLastCardIdGetError,
  ReadCardLastTrainRecordTrainRecordsLastCardIdGetResponse,
  CreateTrainRecordTrainRecordsCardIdPostData,
  CreateTrainRecordTrainRecordsCardIdPostError,
  CreateTrainRecordTrainRecordsCardIdPostResponse,
  CompareAnswersByAiTrainRecordsCardIdComparePostData,
  CompareAnswersByAiTrainRecordsCardIdComparePostError,
  CompareAnswersByAiTrainRecordsCardIdComparePostResponse,
  ReadUserUserProfileGetError,
  ReadUserUserProfileGetResponse,
  ReadUserCollectionsUserCollectionsGetData,
  ReadUserCollectionsUserCollectionsGetError,
  ReadUserCollectionsUserCollectionsGetResponse,
  ReadUserCardsUserCardsGetData,
  ReadUserCardsUserCardsGetError,
  ReadUserCardsUserCardsGetResponse,
  ReadUserFilesUserFilesGetData,
  ReadUserFilesUserFilesGetError,
  ReadUserFilesUserFilesGetResponse,
  CreateUserUserRegisterPostData,
  CreateUserUserRegisterPostError,
  CreateUserUserRegisterPostResponse,
  UpdateUserUserEditProfilePutData,
  UpdateUserUserEditProfilePutError,
  UpdateUserUserEditProfilePutResponse,
  DeleteUserUserDeleteProfileDeleteError,
  DeleteUserUserDeleteProfileDeleteResponse,
  AuthenticateUserUserLoginPostData,
  AuthenticateUserUserLoginPostError,
  AuthenticateUserUserLoginPostResponse,
  LogoutUserUserLogoutPostError,
  LogoutUserUserLogoutPostResponse,
} from './types.gen';

export const client = createClient(createConfig());

/**
 * Read Card
 */
export const readCardCardsCardIdGet = <ThrowOnError extends boolean = false>(
  options: Options<ReadCardCardsCardIdGetData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ReadCardCardsCardIdGetResponse,
    ReadCardCardsCardIdGetError,
    ThrowOnError
  >({
    ...options,
    url: '/cards/{card_id}',
  });
};

/**
 * Update Card
 */
export const updateCardCardsCardIdPut = <ThrowOnError extends boolean = false>(
  options: Options<UpdateCardCardsCardIdPutData, ThrowOnError>
) => {
  return (options?.client ?? client).put<
    UpdateCardCardsCardIdPutResponse,
    UpdateCardCardsCardIdPutError,
    ThrowOnError
  >({
    ...options,
    url: '/cards/{card_id}',
  });
};

/**
 * Delete Card
 */
export const deleteCardCardsCardIdDelete = <
  ThrowOnError extends boolean = false
>(
  options: Options<DeleteCardCardsCardIdDeleteData, ThrowOnError>
) => {
  return (options?.client ?? client).delete<
    DeleteCardCardsCardIdDeleteResponse,
    DeleteCardCardsCardIdDeleteError,
    ThrowOnError
  >({
    ...options,
    url: '/cards/{card_id}',
  });
};

/**
 * Read Card Collections
 */
export const readCardCollectionsCardsCardIdCollectionsGet = <
  ThrowOnError extends boolean = false
>(
  options: Options<
    ReadCardCollectionsCardsCardIdCollectionsGetData,
    ThrowOnError
  >
) => {
  return (options?.client ?? client).get<
    ReadCardCollectionsCardsCardIdCollectionsGetResponse,
    ReadCardCollectionsCardsCardIdCollectionsGetError,
    ThrowOnError
  >({
    ...options,
    url: '/cards/{card_id}/collections',
  });
};

/**
 * Read Card Files
 */
export const readCardFilesCardsCardIdFilesGet = <
  ThrowOnError extends boolean = false
>(
  options: Options<ReadCardFilesCardsCardIdFilesGetData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ReadCardFilesCardsCardIdFilesGetResponse,
    ReadCardFilesCardsCardIdFilesGetError,
    ThrowOnError
  >({
    ...options,
    url: '/cards/{card_id}/files',
  });
};

/**
 * Create Card
 */
export const createCardCardsPost = <ThrowOnError extends boolean = false>(
  options: Options<CreateCardCardsPostData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    CreateCardCardsPostResponse,
    CreateCardCardsPostError,
    ThrowOnError
  >({
    ...options,
    url: '/cards/',
  });
};

/**
 * Read Collection
 */
export const readCollectionCollectionsCollectionIdGet = <
  ThrowOnError extends boolean = false
>(
  options: Options<ReadCollectionCollectionsCollectionIdGetData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ReadCollectionCollectionsCollectionIdGetResponse,
    ReadCollectionCollectionsCollectionIdGetError,
    ThrowOnError
  >({
    ...options,
    url: '/collections/{collection_id}',
  });
};

/**
 * Update Collection
 */
export const updateCollectionCollectionsCollectionIdPut = <
  ThrowOnError extends boolean = false
>(
  options: Options<UpdateCollectionCollectionsCollectionIdPutData, ThrowOnError>
) => {
  return (options?.client ?? client).put<
    UpdateCollectionCollectionsCollectionIdPutResponse,
    UpdateCollectionCollectionsCollectionIdPutError,
    ThrowOnError
  >({
    ...options,
    url: '/collections/{collection_id}',
  });
};

/**
 * Delete Collection
 */
export const deleteCollectionCollectionsCollectionIdDelete = <
  ThrowOnError extends boolean = false
>(
  options: Options<
    DeleteCollectionCollectionsCollectionIdDeleteData,
    ThrowOnError
  >
) => {
  return (options?.client ?? client).delete<
    DeleteCollectionCollectionsCollectionIdDeleteResponse,
    DeleteCollectionCollectionsCollectionIdDeleteError,
    ThrowOnError
  >({
    ...options,
    url: '/collections/{collection_id}',
  });
};

/**
 * Read Collections
 * Returns collections' list without descriptions
 */
export const readCollectionsCollectionsGet = <
  ThrowOnError extends boolean = false
>(
  options?: Options<ReadCollectionsCollectionsGetData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ReadCollectionsCollectionsGetResponse,
    ReadCollectionsCollectionsGetError,
    ThrowOnError
  >({
    ...options,
    url: '/collections/',
  });
};

/**
 * Create Collection
 */
export const createCollectionCollectionsPost = <
  ThrowOnError extends boolean = false
>(
  options: Options<CreateCollectionCollectionsPostData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    CreateCollectionCollectionsPostResponse,
    CreateCollectionCollectionsPostError,
    ThrowOnError
  >({
    ...options,
    url: '/collections/',
  });
};

/**
 * Read Collection Cards
 */
export const readCollectionCardsCollectionsCollectionIdCardsGet = <
  ThrowOnError extends boolean = false
>(
  options: Options<
    ReadCollectionCardsCollectionsCollectionIdCardsGetData,
    ThrowOnError
  >
) => {
  return (options?.client ?? client).get<
    ReadCollectionCardsCollectionsCollectionIdCardsGetResponse,
    ReadCollectionCardsCollectionsCollectionIdCardsGetError,
    ThrowOnError
  >({
    ...options,
    url: '/collections/{collection_id}/cards',
  });
};

/**
 * Train Cards
 */
export const trainCardsCollectionsCollectionIdCardsTrainGet = <
  ThrowOnError extends boolean = false
>(
  options: Options<
    TrainCardsCollectionsCollectionIdCardsTrainGetData,
    ThrowOnError
  >
) => {
  return (options?.client ?? client).get<
    TrainCardsCollectionsCollectionIdCardsTrainGetResponse,
    TrainCardsCollectionsCollectionIdCardsTrainGetError,
    ThrowOnError
  >({
    ...options,
    url: '/collections/{collection_id}/cards/train',
  });
};

/**
 * Update Collection Publicity
 */
export const updateCollectionPublicityCollectionsCollectionIdPublicityPut = <
  ThrowOnError extends boolean = false
>(
  options: Options<
    UpdateCollectionPublicityCollectionsCollectionIdPublicityPutData,
    ThrowOnError
  >
) => {
  return (options?.client ?? client).put<
    UpdateCollectionPublicityCollectionsCollectionIdPublicityPutResponse,
    UpdateCollectionPublicityCollectionsCollectionIdPublicityPutError,
    ThrowOnError
  >({
    ...options,
    url: '/collections/{collection_id}/publicity',
  });
};

/**
 * Add File
 */
export const addFileStoragePost = <ThrowOnError extends boolean = false>(
  options: Options<AddFileStoragePostData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    AddFileStoragePostResponse,
    AddFileStoragePostError,
    ThrowOnError
  >({
    ...options,
    ...formDataBodySerializer,
    headers: {
      'Content-Type': null,
      ...options?.headers,
    },
    url: '/storage/',
  });
};

/**
 * Get File Meta
 */
export const getFileMetaStorageFileIdMetaGet = <
  ThrowOnError extends boolean = false
>(
  options: Options<GetFileMetaStorageFileIdMetaGetData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetFileMetaStorageFileIdMetaGetResponse,
    GetFileMetaStorageFileIdMetaGetError,
    ThrowOnError
  >({
    ...options,
    url: '/storage/{file_id}/meta',
  });
};

/**
 * Get File Cards
 */
export const getFileCardsStorageFileIdCardsGet = <
  ThrowOnError extends boolean = false
>(
  options: Options<GetFileCardsStorageFileIdCardsGetData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetFileCardsStorageFileIdCardsGetResponse,
    GetFileCardsStorageFileIdCardsGetError,
    ThrowOnError
  >({
    ...options,
    url: '/storage/{file_id}/cards',
  });
};

/**
 * Get File
 */
export const getFileStorageFileIdGet = <ThrowOnError extends boolean = false>(
  options: Options<GetFileStorageFileIdGetData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetFileStorageFileIdGetResponse,
    GetFileStorageFileIdGetError,
    ThrowOnError
  >({
    ...options,
    url: '/storage/{file_id}',
  });
};

/**
 * Delete File
 */
export const deleteFileStorageFileIdDelete = <
  ThrowOnError extends boolean = false
>(
  options: Options<DeleteFileStorageFileIdDeleteData, ThrowOnError>
) => {
  return (options?.client ?? client).delete<
    DeleteFileStorageFileIdDeleteResponse,
    DeleteFileStorageFileIdDeleteError,
    ThrowOnError
  >({
    ...options,
    url: '/storage/{file_id}',
  });
};

/**
 * Read Card Last Train Record
 */
export const readCardLastTrainRecordTrainRecordsLastCardIdGet = <
  ThrowOnError extends boolean = false
>(
  options: Options<
    ReadCardLastTrainRecordTrainRecordsLastCardIdGetData,
    ThrowOnError
  >
) => {
  return (options?.client ?? client).get<
    ReadCardLastTrainRecordTrainRecordsLastCardIdGetResponse,
    ReadCardLastTrainRecordTrainRecordsLastCardIdGetError,
    ThrowOnError
  >({
    ...options,
    url: '/train_records/last/{card_id}',
  });
};

/**
 * Create Train Record
 */
export const createTrainRecordTrainRecordsCardIdPost = <
  ThrowOnError extends boolean = false
>(
  options: Options<CreateTrainRecordTrainRecordsCardIdPostData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    CreateTrainRecordTrainRecordsCardIdPostResponse,
    CreateTrainRecordTrainRecordsCardIdPostError,
    ThrowOnError
  >({
    ...options,
    url: '/train_records/{card_id}',
  });
};

/**
 * Compare Answers By Ai
 */
export const compareAnswersByAiTrainRecordsCardIdComparePost = <
  ThrowOnError extends boolean = false
>(
  options: Options<
    CompareAnswersByAiTrainRecordsCardIdComparePostData,
    ThrowOnError
  >
) => {
  return (options?.client ?? client).post<
    CompareAnswersByAiTrainRecordsCardIdComparePostResponse,
    CompareAnswersByAiTrainRecordsCardIdComparePostError,
    ThrowOnError
  >({
    ...options,
    url: '/train_records/{card_id}/compare',
  });
};

/**
 * Read User
 */
export const readUserUserProfileGet = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ReadUserUserProfileGetResponse,
    ReadUserUserProfileGetError,
    ThrowOnError
  >({
    ...options,
    url: '/user/profile',
  });
};

/**
 * Read User Collections
 */
export const readUserCollectionsUserCollectionsGet = <
  ThrowOnError extends boolean = false
>(
  options?: Options<ReadUserCollectionsUserCollectionsGetData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ReadUserCollectionsUserCollectionsGetResponse,
    ReadUserCollectionsUserCollectionsGetError,
    ThrowOnError
  >({
    ...options,
    url: '/user/collections',
  });
};

/**
 * Read User Cards
 */
export const readUserCardsUserCardsGet = <ThrowOnError extends boolean = false>(
  options?: Options<ReadUserCardsUserCardsGetData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ReadUserCardsUserCardsGetResponse,
    ReadUserCardsUserCardsGetError,
    ThrowOnError
  >({
    ...options,
    url: '/user/cards',
  });
};

/**
 * Read User Files
 */
export const readUserFilesUserFilesGet = <ThrowOnError extends boolean = false>(
  options?: Options<ReadUserFilesUserFilesGetData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ReadUserFilesUserFilesGetResponse,
    ReadUserFilesUserFilesGetError,
    ThrowOnError
  >({
    ...options,
    url: '/user/files',
  });
};

/**
 * Create User
 */
export const createUserUserRegisterPost = <
  ThrowOnError extends boolean = false
>(
  options: Options<CreateUserUserRegisterPostData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    CreateUserUserRegisterPostResponse,
    CreateUserUserRegisterPostError,
    ThrowOnError
  >({
    ...options,
    url: '/user/register',
  });
};

/**
 * Update User
 */
export const updateUserUserEditProfilePut = <
  ThrowOnError extends boolean = false
>(
  options: Options<UpdateUserUserEditProfilePutData, ThrowOnError>
) => {
  return (options?.client ?? client).put<
    UpdateUserUserEditProfilePutResponse,
    UpdateUserUserEditProfilePutError,
    ThrowOnError
  >({
    ...options,
    url: '/user/edit_profile',
  });
};

/**
 * Delete User
 */
export const deleteUserUserDeleteProfileDelete = <
  ThrowOnError extends boolean = false
>(
  options?: Options<unknown, ThrowOnError>
) => {
  return (options?.client ?? client).delete<
    DeleteUserUserDeleteProfileDeleteResponse,
    DeleteUserUserDeleteProfileDeleteError,
    ThrowOnError
  >({
    ...options,
    url: '/user/delete_profile',
  });
};

/**
 * Authenticate User
 */
export const authenticateUserUserLoginPost = <
  ThrowOnError extends boolean = false
>(
  options: Options<AuthenticateUserUserLoginPostData, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    AuthenticateUserUserLoginPostResponse,
    AuthenticateUserUserLoginPostError,
    ThrowOnError
  >({
    ...options,
    url: '/user/login',
  });
};

/**
 * Logout User
 */
export const logoutUserUserLogoutPost = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>
) => {
  return (options?.client ?? client).post<
    LogoutUserUserLogoutPostResponse,
    LogoutUserUserLogoutPostError,
    ThrowOnError
  >({
    ...options,
    url: '/user/logout',
  });
};
