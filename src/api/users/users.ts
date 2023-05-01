/**
 * Generated by orval v6.10.2 🍺
 * Do not edit manually.
 * API
 * API DOCS
 * OpenAPI spec version: 1.0
 */
import axios from 'axios'
import type {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios'
import {
  useQuery,
  useMutation
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  UseMutationOptions,
  QueryFunction,
  MutationFunction,
  UseQueryResult,
  QueryKey
} from '@tanstack/react-query'
import type {
  ReportUserDto,
  User,
  CreateUserDto,
  UpdateUserDto,
  UsersIsUsernameAvailableDefault,
  UsersIsUsernameAvailableBody,
  UsersGetVCardDefaultOne,
  UsersGetVCardParams,
  UsersAddFcmTokenBody,
  CreateTagDto,
  UpdateTagDto
} from '.././models'


export const usersReport = (
    id: string,
    reportUserDto: ReportUserDto, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.post(
      `/users/${id}/flag-report`,
      reportUserDto,options
    );
  }



    export type UsersReportMutationResult = NonNullable<Awaited<ReturnType<typeof usersReport>>>
    export type UsersReportMutationBody = ReportUserDto
    export type UsersReportMutationError = AxiosError<unknown>

    export const useUsersReport = <TError = AxiosError<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersReport>>, TError,{id: string;data: ReportUserDto}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersReport>>, {id: string;data: ReportUserDto}> = (props) => {
          const {id,data} = props ?? {};

          return  usersReport(id,data,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof usersReport>>, TError, {id: string;data: ReportUserDto}, TContext>(mutationFn, mutationOptions)
    }
    export const usersCreate = (
    createUserDto: CreateUserDto, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    return axios.post(
      `/users`,
      createUserDto,options
    );
  }



    export type UsersCreateMutationResult = NonNullable<Awaited<ReturnType<typeof usersCreate>>>
    export type UsersCreateMutationBody = CreateUserDto
    export type UsersCreateMutationError = AxiosError<User>

    export const useUsersCreate = <TError = AxiosError<User>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersCreate>>, TError,{data: CreateUserDto}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersCreate>>, {data: CreateUserDto}> = (props) => {
          const {data} = props ?? {};

          return  usersCreate(data,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof usersCreate>>, TError, {data: CreateUserDto}, TContext>(mutationFn, mutationOptions)
    }
    export const usersFindAll = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    return axios.get(
      `/users`,options
    );
  }


export const getUsersFindAllQueryKey = () => [`/users`];

    
export type UsersFindAllQueryResult = NonNullable<Awaited<ReturnType<typeof usersFindAll>>>
export type UsersFindAllQueryError = AxiosError<User[]>

export const useUsersFindAll = <TData = Awaited<ReturnType<typeof usersFindAll>>, TError = AxiosError<User[]>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof usersFindAll>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getUsersFindAllQueryKey();

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof usersFindAll>>> = ({ signal }) => usersFindAll({ signal, ...axiosOptions });

  const query = useQuery<Awaited<ReturnType<typeof usersFindAll>>, TError, TData>(queryKey, queryFn, queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

export const usersTest = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.get(
      `/users/test`,options
    );
  }


export const getUsersTestQueryKey = () => [`/users/test`];

    
export type UsersTestQueryResult = NonNullable<Awaited<ReturnType<typeof usersTest>>>
export type UsersTestQueryError = AxiosError<unknown>

export const useUsersTest = <TData = Awaited<ReturnType<typeof usersTest>>, TError = AxiosError<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof usersTest>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getUsersTestQueryKey();

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof usersTest>>> = ({ signal }) => usersTest({ signal, ...axiosOptions });

  const query = useQuery<Awaited<ReturnType<typeof usersTest>>, TError, TData>(queryKey, queryFn, queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

export const usersFindOne = (
    id: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    return axios.get(
      `/users/${id}`,options
    );
  }


export const getUsersFindOneQueryKey = (id: string,) => [`/users/${id}`];

    
export type UsersFindOneQueryResult = NonNullable<Awaited<ReturnType<typeof usersFindOne>>>
export type UsersFindOneQueryError = AxiosError<User>

export const useUsersFindOne = <TData = Awaited<ReturnType<typeof usersFindOne>>, TError = AxiosError<User>>(
 id: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof usersFindOne>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getUsersFindOneQueryKey(id);

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof usersFindOne>>> = ({ signal }) => usersFindOne(id, { signal, ...axiosOptions });

  const query = useQuery<Awaited<ReturnType<typeof usersFindOne>>, TError, TData>(queryKey, queryFn, {enabled: !!(id), ...queryOptions}) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

export const usersUpdate = (
    id: string,
    updateUserDto: UpdateUserDto, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    return axios.patch(
      `/users/${id}`,
      updateUserDto,options
    );
  }



    export type UsersUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof usersUpdate>>>
    export type UsersUpdateMutationBody = UpdateUserDto
    export type UsersUpdateMutationError = AxiosError<User>

    export const useUsersUpdate = <TError = AxiosError<User>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersUpdate>>, TError,{id: string;data: UpdateUserDto}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersUpdate>>, {id: string;data: UpdateUserDto}> = (props) => {
          const {id,data} = props ?? {};

          return  usersUpdate(id,data,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof usersUpdate>>, TError, {id: string;data: UpdateUserDto}, TContext>(mutationFn, mutationOptions)
    }
    export const usersIsUsernameAvailable = (
    usersIsUsernameAvailableBody: UsersIsUsernameAvailableBody, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    return axios.post(
      `/users/username-available`,
      usersIsUsernameAvailableBody,options
    );
  }



    export type UsersIsUsernameAvailableMutationResult = NonNullable<Awaited<ReturnType<typeof usersIsUsernameAvailable>>>
    export type UsersIsUsernameAvailableMutationBody = UsersIsUsernameAvailableBody
    export type UsersIsUsernameAvailableMutationError = AxiosError<UsersIsUsernameAvailableDefault>

    export const useUsersIsUsernameAvailable = <TError = AxiosError<UsersIsUsernameAvailableDefault>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersIsUsernameAvailable>>, TError,{data: UsersIsUsernameAvailableBody}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersIsUsernameAvailable>>, {data: UsersIsUsernameAvailableBody}> = (props) => {
          const {data} = props ?? {};

          return  usersIsUsernameAvailable(data,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof usersIsUsernameAvailable>>, TError, {data: UsersIsUsernameAvailableBody}, TContext>(mutationFn, mutationOptions)
    }
    export const usersGetVCard = (
    id: string,
    params: UsersGetVCardParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    return axios.get(
      `/users/${id}/vcard`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getUsersGetVCardQueryKey = (id: string,
    params: UsersGetVCardParams,) => [`/users/${id}/vcard`, ...(params ? [params]: [])];

    
export type UsersGetVCardQueryResult = NonNullable<Awaited<ReturnType<typeof usersGetVCard>>>
export type UsersGetVCardQueryError = AxiosError<UsersGetVCardDefaultOne | Blob>

export const useUsersGetVCard = <TData = Awaited<ReturnType<typeof usersGetVCard>>, TError = AxiosError<UsersGetVCardDefaultOne | Blob>>(
 id: string,
    params: UsersGetVCardParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof usersGetVCard>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getUsersGetVCardQueryKey(id,params);

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof usersGetVCard>>> = ({ signal }) => usersGetVCard(id,params, { signal, ...axiosOptions });

  const query = useQuery<Awaited<ReturnType<typeof usersGetVCard>>, TError, TData>(queryKey, queryFn, {enabled: !!(id), ...queryOptions}) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

export const usersFindOneByFirebaseUid = (
    id: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    return axios.get(
      `/users/fireUID/${id}`,options
    );
  }


export const getUsersFindOneByFirebaseUidQueryKey = (id: string,) => [`/users/fireUID/${id}`];

    
export type UsersFindOneByFirebaseUidQueryResult = NonNullable<Awaited<ReturnType<typeof usersFindOneByFirebaseUid>>>
export type UsersFindOneByFirebaseUidQueryError = AxiosError<User>

export const useUsersFindOneByFirebaseUid = <TData = Awaited<ReturnType<typeof usersFindOneByFirebaseUid>>, TError = AxiosError<User>>(
 id: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof usersFindOneByFirebaseUid>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getUsersFindOneByFirebaseUidQueryKey(id);

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof usersFindOneByFirebaseUid>>> = ({ signal }) => usersFindOneByFirebaseUid(id, { signal, ...axiosOptions });

  const query = useQuery<Awaited<ReturnType<typeof usersFindOneByFirebaseUid>>, TError, TData>(queryKey, queryFn, {enabled: !!(id), ...queryOptions}) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

export const usersFindOneByUsername = (
    username: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    return axios.get(
      `/users/username/${username}`,options
    );
  }


export const getUsersFindOneByUsernameQueryKey = (username: string,) => [`/users/username/${username}`];

    
export type UsersFindOneByUsernameQueryResult = NonNullable<Awaited<ReturnType<typeof usersFindOneByUsername>>>
export type UsersFindOneByUsernameQueryError = AxiosError<User>

export const useUsersFindOneByUsername = <TData = Awaited<ReturnType<typeof usersFindOneByUsername>>, TError = AxiosError<User>>(
 username: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof usersFindOneByUsername>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getUsersFindOneByUsernameQueryKey(username);

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof usersFindOneByUsername>>> = ({ signal }) => usersFindOneByUsername(username, { signal, ...axiosOptions });

  const query = useQuery<Awaited<ReturnType<typeof usersFindOneByUsername>>, TError, TData>(queryKey, queryFn, {enabled: !!(username), ...queryOptions}) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

export const usersFindOneIncludeAllByFirebaseUid = (
    id: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    return axios.get(
      `/users/fireUID/${id}/include-all`,options
    );
  }


export const getUsersFindOneIncludeAllByFirebaseUidQueryKey = (id: string,) => [`/users/fireUID/${id}/include-all`];

    
export type UsersFindOneIncludeAllByFirebaseUidQueryResult = NonNullable<Awaited<ReturnType<typeof usersFindOneIncludeAllByFirebaseUid>>>
export type UsersFindOneIncludeAllByFirebaseUidQueryError = AxiosError<User>

export const useUsersFindOneIncludeAllByFirebaseUid = <TData = Awaited<ReturnType<typeof usersFindOneIncludeAllByFirebaseUid>>, TError = AxiosError<User>>(
 id: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof usersFindOneIncludeAllByFirebaseUid>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getUsersFindOneIncludeAllByFirebaseUidQueryKey(id);

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof usersFindOneIncludeAllByFirebaseUid>>> = ({ signal }) => usersFindOneIncludeAllByFirebaseUid(id, { signal, ...axiosOptions });

  const query = useQuery<Awaited<ReturnType<typeof usersFindOneIncludeAllByFirebaseUid>>, TError, TData>(queryKey, queryFn, {enabled: !!(id), ...queryOptions}) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

export const usersDelete = (
    uid: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.delete(
      `/users/${uid}`,options
    );
  }



    export type UsersDeleteMutationResult = NonNullable<Awaited<ReturnType<typeof usersDelete>>>
    
    export type UsersDeleteMutationError = AxiosError<unknown>

    export const useUsersDelete = <TError = AxiosError<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersDelete>>, TError,{uid: string}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersDelete>>, {uid: string}> = (props) => {
          const {uid} = props ?? {};

          return  usersDelete(uid,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof usersDelete>>, TError, {uid: string}, TContext>(mutationFn, mutationOptions)
    }
    export const usersAddFcmToken = (
    id: string,
    usersAddFcmTokenBody: UsersAddFcmTokenBody, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.patch(
      `/users/${id}/fcm-token`,
      usersAddFcmTokenBody,options
    );
  }



    export type UsersAddFcmTokenMutationResult = NonNullable<Awaited<ReturnType<typeof usersAddFcmToken>>>
    export type UsersAddFcmTokenMutationBody = UsersAddFcmTokenBody
    export type UsersAddFcmTokenMutationError = AxiosError<unknown>

    export const useUsersAddFcmToken = <TError = AxiosError<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersAddFcmToken>>, TError,{id: string;data: UsersAddFcmTokenBody}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersAddFcmToken>>, {id: string;data: UsersAddFcmTokenBody}> = (props) => {
          const {id,data} = props ?? {};

          return  usersAddFcmToken(id,data,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof usersAddFcmToken>>, TError, {id: string;data: UsersAddFcmTokenBody}, TContext>(mutationFn, mutationOptions)
    }
    export const usersCreateTag = (
    id: string,
    createTagDto: CreateTagDto, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.post(
      `/users/${id}/tags`,
      createTagDto,options
    );
  }



    export type UsersCreateTagMutationResult = NonNullable<Awaited<ReturnType<typeof usersCreateTag>>>
    export type UsersCreateTagMutationBody = CreateTagDto
    export type UsersCreateTagMutationError = AxiosError<unknown>

    export const useUsersCreateTag = <TError = AxiosError<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersCreateTag>>, TError,{id: string;data: CreateTagDto}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersCreateTag>>, {id: string;data: CreateTagDto}> = (props) => {
          const {id,data} = props ?? {};

          return  usersCreateTag(id,data,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof usersCreateTag>>, TError, {id: string;data: CreateTagDto}, TContext>(mutationFn, mutationOptions)
    }
    export const usersUpdateTag = (
    id: string,
    updateTagDto: UpdateTagDto, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.patch(
      `/users/${id}/tags`,
      updateTagDto,options
    );
  }



    export type UsersUpdateTagMutationResult = NonNullable<Awaited<ReturnType<typeof usersUpdateTag>>>
    export type UsersUpdateTagMutationBody = UpdateTagDto
    export type UsersUpdateTagMutationError = AxiosError<unknown>

    export const useUsersUpdateTag = <TError = AxiosError<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersUpdateTag>>, TError,{id: string;data: UpdateTagDto}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersUpdateTag>>, {id: string;data: UpdateTagDto}> = (props) => {
          const {id,data} = props ?? {};

          return  usersUpdateTag(id,data,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof usersUpdateTag>>, TError, {id: string;data: UpdateTagDto}, TContext>(mutationFn, mutationOptions)
    }
    export const usersDeleteTag = (
    id: string,
    tag: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.delete(
      `/users/${id}/tags/${tag}/delete`,options
    );
  }



    export type UsersDeleteTagMutationResult = NonNullable<Awaited<ReturnType<typeof usersDeleteTag>>>
    
    export type UsersDeleteTagMutationError = AxiosError<unknown>

    export const useUsersDeleteTag = <TError = AxiosError<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersDeleteTag>>, TError,{id: string;tag: string}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersDeleteTag>>, {id: string;tag: string}> = (props) => {
          const {id,tag} = props ?? {};

          return  usersDeleteTag(id,tag,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof usersDeleteTag>>, TError, {id: string;tag: string}, TContext>(mutationFn, mutationOptions)
    }
    export const usersBookEvent = (
    id: string,
    event: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.patch(
      `/users/${id}/events/${event}/book`,undefined,options
    );
  }



    export type UsersBookEventMutationResult = NonNullable<Awaited<ReturnType<typeof usersBookEvent>>>
    
    export type UsersBookEventMutationError = AxiosError<unknown>

    export const useUsersBookEvent = <TError = AxiosError<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersBookEvent>>, TError,{id: string;event: string}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersBookEvent>>, {id: string;event: string}> = (props) => {
          const {id,event} = props ?? {};

          return  usersBookEvent(id,event,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof usersBookEvent>>, TError, {id: string;event: string}, TContext>(mutationFn, mutationOptions)
    }
    export const usersMigrate = (
    token: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.post(
      `/users/migrate/${token}`,undefined,options
    );
  }



    export type UsersMigrateMutationResult = NonNullable<Awaited<ReturnType<typeof usersMigrate>>>
    
    export type UsersMigrateMutationError = AxiosError<unknown>

    export const useUsersMigrate = <TError = AxiosError<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof usersMigrate>>, TError,{token: string}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof usersMigrate>>, {token: string}> = (props) => {
          const {token} = props ?? {};

          return  usersMigrate(token,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof usersMigrate>>, TError, {token: string}, TContext>(mutationFn, mutationOptions)
    }
    