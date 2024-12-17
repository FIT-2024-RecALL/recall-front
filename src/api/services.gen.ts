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
  DeleteCardCardsCardIdDeleteData,
  DeleteCardCardsCardIdDeleteError,
  DeleteCardCardsCardIdDeleteResponse,
  UpdateCardCardsCardIdPutData,
  UpdateCardCardsCardIdPutError,
  UpdateCardCardsCardIdPutResponse,
  CreateCardCardsPostData,
  CreateCardCardsPostError,
  CreateCardCardsPostResponse,
  ReadCardCollectionsCardsCardIdCollectionsGetData,
  ReadCardCollectionsCardsCardIdCollectionsGetError,
  ReadCardCollectionsCardsCardIdCollectionsGetResponse,
  ReadCollectionCollectionsCollectionIdGetData,
  ReadCollectionCollectionsCollectionIdGetError,
  ReadCollectionCollectionsCollectionIdGetResponse,
  DeleteCollectionCollectionsCollectionIdDeleteData,
  DeleteCollectionCollectionsCollectionIdDeleteError,
  DeleteCollectionCollectionsCollectionIdDeleteResponse,
  UpdateCollectionCollectionsCollectionIdPutData,
  UpdateCollectionCollectionsCollectionIdPutError,
  UpdateCollectionCollectionsCollectionIdPutResponse,
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
  ReadCardLastTrainRecordTrainRecordsLastCardIdGetData,
  ReadCardLastTrainRecordTrainRecordsLastCardIdGetError,
  ReadCardLastTrainRecordTrainRecordsLastCardIdGetResponse,
  CreateTrainRecordTrainRecordsCardIdPostData,
  CreateTrainRecordTrainRecordsCardIdPostError,
  CreateTrainRecordTrainRecordsCardIdPostResponse,
  ReadUserUserProfileGetError,
  ReadUserUserProfileGetResponse,
  CreateUserUserRegisterPostData,
  CreateUserUserRegisterPostError,
  CreateUserUserRegisterPostResponse,
  UpdateUserUserEditProfilePutData,
  UpdateUserUserEditProfilePutError,
  UpdateUserUserEditProfilePutResponse,
  AuthenticateUserUserLoginPostData,
  AuthenticateUserUserLoginPostError,
  AuthenticateUserUserLoginPostResponse,
  ReadCardsUserCardsGetData,
  ReadCardsUserCardsGetError,
  ReadCardsUserCardsGetResponse,
  ReadCollectionsShortUserCollectionsGetData,
  ReadCollectionsShortUserCollectionsGetError,
  ReadCollectionsShortUserCollectionsGetResponse,
  ReadCollectionsUserCollectionsFullGetData,
  ReadCollectionsUserCollectionsFullGetError,
  ReadCollectionsUserCollectionsFullGetResponse,
  LogoutUserUserLogoutPostError,
  LogoutUserUserLogoutPostResponse,
  DeleteUserUserDeleteProfileDeleteError,
  DeleteUserUserDeleteProfileDeleteResponse,
  GetFileStorageUserIdFilenameGetData,
  GetFileStorageUserIdFilenameGetError,
  GetFileStorageUserIdFilenameGetResponse,
  ListFilesStorageGetError,
  ListFilesStorageGetResponse,
  AddFileStoragePostData,
  AddFileStoragePostError,
  AddFileStoragePostResponse,
  DeleteFileStorageFilenameDeleteData,
  DeleteFileStorageFilenameDeleteError,
  DeleteFileStorageFilenameDeleteResponse,
  ReadItemItemsItemIdGetData,
  ReadItemItemsItemIdGetError,
  ReadItemItemsItemIdGetResponse,
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
 * Read Cards
 */
export const readCardsUserCardsGet = <ThrowOnError extends boolean = false>(
  options?: Options<ReadCardsUserCardsGetData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ReadCardsUserCardsGetResponse,
    ReadCardsUserCardsGetError,
    ThrowOnError
  >({
    ...options,
    url: '/user/cards',
  });
};

/**
 * Read Collections Short
 */
export const readCollectionsShortUserCollectionsGet = <
  ThrowOnError extends boolean = false
>(
  options?: Options<ReadCollectionsShortUserCollectionsGetData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ReadCollectionsShortUserCollectionsGetResponse,
    ReadCollectionsShortUserCollectionsGetError,
    ThrowOnError
  >({
    ...options,
    url: '/user/collections',
  });
};

/**
 * Read Collections
 */
export const readCollectionsUserCollectionsFullGet = <
  ThrowOnError extends boolean = false
>(
  options?: Options<ReadCollectionsUserCollectionsFullGetData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ReadCollectionsUserCollectionsFullGetResponse,
    ReadCollectionsUserCollectionsFullGetError,
    ThrowOnError
  >({
    ...options,
    url: '/user/collections/full',
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
 * Get File
 */
export const getFileStorageUserIdFilenameGet = <
  ThrowOnError extends boolean = false
>(
  options: Options<GetFileStorageUserIdFilenameGetData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    GetFileStorageUserIdFilenameGetResponse,
    GetFileStorageUserIdFilenameGetError,
    ThrowOnError
  >({
    ...options,
    url: '/storage/{user_id}/{filename}',
  });
};

/**
 * List Files
 */
export const listFilesStorageGet = <ThrowOnError extends boolean = false>(
  options?: Options<unknown, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ListFilesStorageGetResponse,
    ListFilesStorageGetError,
    ThrowOnError
  >({
    ...options,
    url: '/storage/',
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
 * Delete File
 */
export const deleteFileStorageFilenameDelete = <
  ThrowOnError extends boolean = false
>(
  options: Options<DeleteFileStorageFilenameDeleteData, ThrowOnError>
) => {
  return (options?.client ?? client).delete<
    DeleteFileStorageFilenameDeleteResponse,
    DeleteFileStorageFilenameDeleteError,
    ThrowOnError
  >({
    ...options,
    url: '/storage/{filename}',
  });
};

/**
 * Read Item
 */
export const readItemItemsItemIdGet = <ThrowOnError extends boolean = false>(
  options: Options<ReadItemItemsItemIdGetData, ThrowOnError>
) => {
  return (options?.client ?? client).get<
    ReadItemItemsItemIdGetResponse,
    ReadItemItemsItemIdGetError,
    ThrowOnError
  >({
    ...options,
    url: '/items/{item_id}',
  });
};
