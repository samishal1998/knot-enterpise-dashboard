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
  GetUserConnectionsDto,
  UserConnectionsGetUserConnectionsParams
} from '.././models'


export const userConnectionsGetUserConnections = (
    uid: string,
    params?: UserConnectionsGetUserConnectionsParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    return axios.get(
      `/users/${uid}/connections`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getUserConnectionsGetUserConnectionsQueryKey = (uid: string,
    params?: UserConnectionsGetUserConnectionsParams,) => [`/users/${uid}/connections`, ...(params ? [params]: [])];

    
export type UserConnectionsGetUserConnectionsQueryResult = NonNullable<Awaited<ReturnType<typeof userConnectionsGetUserConnections>>>
export type UserConnectionsGetUserConnectionsQueryError = AxiosError<GetUserConnectionsDto>

export const useUserConnectionsGetUserConnections = <TData = Awaited<ReturnType<typeof userConnectionsGetUserConnections>>, TError = AxiosError<GetUserConnectionsDto>>(
 uid: string,
    params?: UserConnectionsGetUserConnectionsParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof userConnectionsGetUserConnections>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getUserConnectionsGetUserConnectionsQueryKey(uid,params);

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof userConnectionsGetUserConnections>>> = ({ signal }) => userConnectionsGetUserConnections(uid,params, { signal, ...axiosOptions });

  const query = useQuery<Awaited<ReturnType<typeof userConnectionsGetUserConnections>>, TError, TData>(queryKey, queryFn, {enabled: !!(uid), ...queryOptions}) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

export const userConnectionsConnectWith = (
    uid: string,
    receiver: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.patch(
      `/users/${uid}/connections/connect/${receiver}`,undefined,options
    );
  }



    export type UserConnectionsConnectWithMutationResult = NonNullable<Awaited<ReturnType<typeof userConnectionsConnectWith>>>
    
    export type UserConnectionsConnectWithMutationError = AxiosError<unknown>

    export const useUserConnectionsConnectWith = <TError = AxiosError<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof userConnectionsConnectWith>>, TError,{uid: string;receiver: string}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof userConnectionsConnectWith>>, {uid: string;receiver: string}> = (props) => {
          const {uid,receiver} = props ?? {};

          return  userConnectionsConnectWith(uid,receiver,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof userConnectionsConnectWith>>, TError, {uid: string;receiver: string}, TContext>(mutationFn, mutationOptions)
    }
    export const userConnectionsEndConnection = (
    uid: string,
    connectionId: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.patch(
      `/users/${uid}/connections/${connectionId}/disconnect`,undefined,options
    );
  }



    export type UserConnectionsEndConnectionMutationResult = NonNullable<Awaited<ReturnType<typeof userConnectionsEndConnection>>>
    
    export type UserConnectionsEndConnectionMutationError = AxiosError<unknown>

    export const useUserConnectionsEndConnection = <TError = AxiosError<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof userConnectionsEndConnection>>, TError,{uid: string;connectionId: string}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof userConnectionsEndConnection>>, {uid: string;connectionId: string}> = (props) => {
          const {uid,connectionId} = props ?? {};

          return  userConnectionsEndConnection(uid,connectionId,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof userConnectionsEndConnection>>, TError, {uid: string;connectionId: string}, TContext>(mutationFn, mutationOptions)
    }
    export const userConnectionsRejectConnectionRequest = (
    uid: string,
    connectionId: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.patch(
      `/users/${uid}/connections/${connectionId}/reject`,undefined,options
    );
  }



    export type UserConnectionsRejectConnectionRequestMutationResult = NonNullable<Awaited<ReturnType<typeof userConnectionsRejectConnectionRequest>>>
    
    export type UserConnectionsRejectConnectionRequestMutationError = AxiosError<unknown>

    export const useUserConnectionsRejectConnectionRequest = <TError = AxiosError<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof userConnectionsRejectConnectionRequest>>, TError,{uid: string;connectionId: string}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof userConnectionsRejectConnectionRequest>>, {uid: string;connectionId: string}> = (props) => {
          const {uid,connectionId} = props ?? {};

          return  userConnectionsRejectConnectionRequest(uid,connectionId,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof userConnectionsRejectConnectionRequest>>, TError, {uid: string;connectionId: string}, TContext>(mutationFn, mutationOptions)
    }
    export const userConnectionsAcceptConnectionRequest = (
    uid: string,
    connectionId: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.patch(
      `/users/${uid}/connections/${connectionId}/accept`,undefined,options
    );
  }



    export type UserConnectionsAcceptConnectionRequestMutationResult = NonNullable<Awaited<ReturnType<typeof userConnectionsAcceptConnectionRequest>>>
    
    export type UserConnectionsAcceptConnectionRequestMutationError = AxiosError<unknown>

    export const useUserConnectionsAcceptConnectionRequest = <TError = AxiosError<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof userConnectionsAcceptConnectionRequest>>, TError,{uid: string;connectionId: string}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof userConnectionsAcceptConnectionRequest>>, {uid: string;connectionId: string}> = (props) => {
          const {uid,connectionId} = props ?? {};

          return  userConnectionsAcceptConnectionRequest(uid,connectionId,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof userConnectionsAcceptConnectionRequest>>, TError, {uid: string;connectionId: string}, TContext>(mutationFn, mutationOptions)
    }
    export const userConnectionsSeeConnection = (
    uid: string,
    connectionId: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.patch(
      `/users/${uid}/connections/${connectionId}/seen`,undefined,options
    );
  }



    export type UserConnectionsSeeConnectionMutationResult = NonNullable<Awaited<ReturnType<typeof userConnectionsSeeConnection>>>
    
    export type UserConnectionsSeeConnectionMutationError = AxiosError<unknown>

    export const useUserConnectionsSeeConnection = <TError = AxiosError<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof userConnectionsSeeConnection>>, TError,{uid: string;connectionId: string}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof userConnectionsSeeConnection>>, {uid: string;connectionId: string}> = (props) => {
          const {uid,connectionId} = props ?? {};

          return  userConnectionsSeeConnection(uid,connectionId,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof userConnectionsSeeConnection>>, TError, {uid: string;connectionId: string}, TContext>(mutationFn, mutationOptions)
    }
    export const userConnectionsBlockConnection = (
    uid: string,
    connectionId: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.patch(
      `/users/${uid}/connections/${connectionId}/block`,undefined,options
    );
  }



    export type UserConnectionsBlockConnectionMutationResult = NonNullable<Awaited<ReturnType<typeof userConnectionsBlockConnection>>>
    
    export type UserConnectionsBlockConnectionMutationError = AxiosError<unknown>

    export const useUserConnectionsBlockConnection = <TError = AxiosError<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof userConnectionsBlockConnection>>, TError,{uid: string;connectionId: string}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof userConnectionsBlockConnection>>, {uid: string;connectionId: string}> = (props) => {
          const {uid,connectionId} = props ?? {};

          return  userConnectionsBlockConnection(uid,connectionId,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof userConnectionsBlockConnection>>, TError, {uid: string;connectionId: string}, TContext>(mutationFn, mutationOptions)
    }
    export const userConnectionsUnblockConnection = (
    uid: string,
    connectionId: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.patch(
      `/users/${uid}/connections/${connectionId}/unblock`,undefined,options
    );
  }



    export type UserConnectionsUnblockConnectionMutationResult = NonNullable<Awaited<ReturnType<typeof userConnectionsUnblockConnection>>>
    
    export type UserConnectionsUnblockConnectionMutationError = AxiosError<unknown>

    export const useUserConnectionsUnblockConnection = <TError = AxiosError<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof userConnectionsUnblockConnection>>, TError,{uid: string;connectionId: string}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof userConnectionsUnblockConnection>>, {uid: string;connectionId: string}> = (props) => {
          const {uid,connectionId} = props ?? {};

          return  userConnectionsUnblockConnection(uid,connectionId,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof userConnectionsUnblockConnection>>, TError, {uid: string;connectionId: string}, TContext>(mutationFn, mutationOptions)
    }
    export const userConnectionsCancelConnection = (
    uid: string,
    connectionId: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.delete(
      `/users/${uid}/connections/${connectionId}`,options
    );
  }



    export type UserConnectionsCancelConnectionMutationResult = NonNullable<Awaited<ReturnType<typeof userConnectionsCancelConnection>>>
    
    export type UserConnectionsCancelConnectionMutationError = AxiosError<unknown>

    export const useUserConnectionsCancelConnection = <TError = AxiosError<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof userConnectionsCancelConnection>>, TError,{uid: string;connectionId: string}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof userConnectionsCancelConnection>>, {uid: string;connectionId: string}> = (props) => {
          const {uid,connectionId} = props ?? {};

          return  userConnectionsCancelConnection(uid,connectionId,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof userConnectionsCancelConnection>>, TError, {uid: string;connectionId: string}, TContext>(mutationFn, mutationOptions)
    }
    