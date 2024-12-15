// This file is auto-generated by @hey-api/openapi-ts

export type Body_add_file_storage__post = {
  file: Blob | File;
};

export type Body_create_card_cards__post = {
  card: CardCreate;
  collections: Array<number>;
};

export type Body_update_card_cards__card_id__put = {
  new_card: CardCreate;
  collections: Array<number>;
};

export type Card = {
  frontSide: string;
  backSide: string;
  id: number;
  ownerId: number;
};

export type CardCreate = {
  frontSide: string;
  backSide: string;
};

export type Collection = {
  title: string;
  description?: string | null;
  id: number;
  ownerId: number;
};

export type CollectionCreate = {
  title: string;
  description?: string | null;
};

export type CollectionShort = {
  id: number;
  ownerId: number;
  title: string;
};

export type FileUploadedScheme = {
  url: string;
};

export type HTTPValidationError = {
  detail?: Array<ValidationError>;
};

export type TrainRecord = {
  mark: number;
  id: number;
  cardId: number;
  userId: number;
  repeatDate: string;
  nextRepeatDate: string;
  progress: number;
};

export type TrainRecordCreate = {
  mark: number;
};

export type User = {
  nickname: string;
  email: string;
  id: number;
};

export type UserAuth = {
  email: string;
  password: string;
};

export type UserBase = {
  nickname: string;
  email: string;
};

export type UserCreate = {
  nickname: string;
  email: string;
  password: string;
};

export type ValidationError = {
  loc: Array<string | number>;
  msg: string;
  type: string;
};

export type ReadCardCardsCardIdGetData = {
  path: {
    card_id: number;
  };
};

export type ReadCardCardsCardIdGetResponse = Card;

export type ReadCardCardsCardIdGetError = HTTPValidationError;

export type DeleteCardCardsCardIdDeleteData = {
  path: {
    card_id: number;
  };
};

export type DeleteCardCardsCardIdDeleteResponse = unknown;

export type DeleteCardCardsCardIdDeleteError = HTTPValidationError;

export type UpdateCardCardsCardIdPutData = {
  body: Body_update_card_cards__card_id__put;
  path: {
    card_id: number;
  };
};

export type UpdateCardCardsCardIdPutResponse = Card;

export type UpdateCardCardsCardIdPutError = HTTPValidationError;

export type CreateCardCardsPostData = {
  body: Body_create_card_cards__post;
};

export type CreateCardCardsPostResponse = Card;

export type CreateCardCardsPostError = HTTPValidationError;

export type ReadCardCollectionsCardsCardIdCollectionsGetData = {
  path: {
    card_id: number;
  };
};

export type ReadCardCollectionsCardsCardIdCollectionsGetResponse =
  Array<CollectionShort>;

export type ReadCardCollectionsCardsCardIdCollectionsGetError =
  HTTPValidationError;

export type ReadCollectionCollectionsCollectionIdGetData = {
  path: {
    collection_id: number;
  };
};

export type ReadCollectionCollectionsCollectionIdGetResponse = Collection;

export type ReadCollectionCollectionsCollectionIdGetError = HTTPValidationError;

export type DeleteCollectionCollectionsCollectionIdDeleteData = {
  path: {
    collection_id: number;
  };
};

export type DeleteCollectionCollectionsCollectionIdDeleteResponse = unknown;

export type DeleteCollectionCollectionsCollectionIdDeleteError =
  HTTPValidationError;

export type UpdateCollectionCollectionsCollectionIdPutData = {
  body: CollectionCreate;
  path: {
    collection_id: number;
  };
};

export type UpdateCollectionCollectionsCollectionIdPutResponse = Collection;

export type UpdateCollectionCollectionsCollectionIdPutError =
  HTTPValidationError;

export type ReadCollectionsCollectionsGetData = {
  query?: {
    limit?: number;
    skip?: number;
  };
};

export type ReadCollectionsCollectionsGetResponse = Array<CollectionShort>;

export type ReadCollectionsCollectionsGetError = HTTPValidationError;

export type CreateCollectionCollectionsPostData = {
  body: CollectionCreate;
};

export type CreateCollectionCollectionsPostResponse = Collection;

export type CreateCollectionCollectionsPostError = HTTPValidationError;

export type ReadCollectionCardsCollectionsCollectionIdCardsGetData = {
  path: {
    collection_id: number;
  };
};

export type ReadCollectionCardsCollectionsCollectionIdCardsGetResponse =
  Array<number>;

export type ReadCollectionCardsCollectionsCollectionIdCardsGetError =
  HTTPValidationError;

export type TrainCardsCollectionsCollectionIdCardsTrainGetData = {
  path: {
    collection_id: number;
  };
};

export type TrainCardsCollectionsCollectionIdCardsTrainGetResponse =
  Array<number>;

export type TrainCardsCollectionsCollectionIdCardsTrainGetError =
  HTTPValidationError;

export type ReadCardLastTrainRecordTrainRecordsLastCardIdGetData = {
  path: {
    card_id: number;
  };
};

export type ReadCardLastTrainRecordTrainRecordsLastCardIdGetResponse =
  TrainRecord | null;

export type ReadCardLastTrainRecordTrainRecordsLastCardIdGetError =
  HTTPValidationError;

export type CreateTrainRecordTrainRecordsCardIdPostData = {
  body: TrainRecordCreate;
  path: {
    card_id: number;
  };
};

export type CreateTrainRecordTrainRecordsCardIdPostResponse = TrainRecord;

export type CreateTrainRecordTrainRecordsCardIdPostError = HTTPValidationError;

export type ReadUserUserProfileGetResponse = User;

export type ReadUserUserProfileGetError = unknown;

export type CreateUserUserRegisterPostData = {
  body: UserCreate;
  query?: {
    auto_login?: boolean;
  };
};

export type CreateUserUserRegisterPostResponse = User;

export type CreateUserUserRegisterPostError = HTTPValidationError;

export type UpdateUserUserEditProfilePutData = {
  body: UserBase;
};

export type UpdateUserUserEditProfilePutResponse = User;

export type UpdateUserUserEditProfilePutError = HTTPValidationError;

export type AuthenticateUserUserLoginPostData = {
  body: UserAuth;
};

export type AuthenticateUserUserLoginPostResponse = User;

export type AuthenticateUserUserLoginPostError = HTTPValidationError;

export type ReadCardsUserCardsGetData = {
  query?: {
    limit?: number | null;
    skip?: number;
  };
};

export type ReadCardsUserCardsGetResponse = Array<number>;

export type ReadCardsUserCardsGetError = HTTPValidationError;

export type ReadCollectionsShortUserCollectionsGetData = {
  query?: {
    limit?: number | null;
    skip?: number;
  };
};

export type ReadCollectionsShortUserCollectionsGetResponse =
  Array<CollectionShort>;

export type ReadCollectionsShortUserCollectionsGetError = HTTPValidationError;

export type ReadCollectionsUserCollectionsFullGetData = {
  query?: {
    limit?: number | null;
    skip?: number;
  };
};

export type ReadCollectionsUserCollectionsFullGetResponse = Array<Collection>;

export type ReadCollectionsUserCollectionsFullGetError = HTTPValidationError;

export type LogoutUserUserLogoutPostResponse = unknown;

export type LogoutUserUserLogoutPostError = unknown;

export type DeleteUserUserDeleteProfileDeleteResponse = unknown;

export type DeleteUserUserDeleteProfileDeleteError = unknown;

export type GetFileStorageUserIdFilenameGetData = {
  path: {
    filename: string;
    user_id: number;
  };
};

export type GetFileStorageUserIdFilenameGetResponse = unknown;

export type GetFileStorageUserIdFilenameGetError = HTTPValidationError;

export type ListFilesStorageGetResponse = Array<FileUploadedScheme>;

export type ListFilesStorageGetError = unknown;

export type AddFileStoragePostData = {
  body: Body_add_file_storage__post;
};

export type AddFileStoragePostResponse = FileUploadedScheme;

export type AddFileStoragePostError = HTTPValidationError;

export type DeleteFileStorageFilenameDeleteData = {
  path: {
    filename: string;
  };
};

export type DeleteFileStorageFilenameDeleteResponse = unknown;

export type DeleteFileStorageFilenameDeleteError = HTTPValidationError;

export type ReadItemItemsItemIdGetData = {
  path: {
    item_id: number | null;
  };
};

export type ReadItemItemsItemIdGetResponse = unknown;

export type ReadItemItemsItemIdGetError = unknown | HTTPValidationError;

export type ReadCardsAdminCardsGetData = {
  query?: {
    limit?: number | null;
    skip?: number;
  };
};

export type ReadCardsAdminCardsGetResponse = Array<Card>;

export type ReadCardsAdminCardsGetError = HTTPValidationError;

export type ReadTrainRecordsAdminTrainRecordsGetData = {
  query?: {
    limit?: number | null;
    skip?: number;
  };
};

export type ReadTrainRecordsAdminTrainRecordsGetResponse = Array<TrainRecord>;

export type ReadTrainRecordsAdminTrainRecordsGetError = HTTPValidationError;

export type ReadUsersAdminUsersGetData = {
  query?: {
    limit?: number;
    skip?: number;
  };
};

export type ReadUsersAdminUsersGetResponse = Array<User>;

export type ReadUsersAdminUsersGetError = HTTPValidationError;

export type ReadCollectionsAdminCollectionsGetData = {
  query?: {
    limit?: number | null;
    skip?: number;
  };
};

export type ReadCollectionsAdminCollectionsGetResponse = Array<Collection>;

export type ReadCollectionsAdminCollectionsGetError = HTTPValidationError;
