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
  useMutation
} from '@tanstack/react-query'
import type {
  UseMutationOptions,
  MutationFunction
} from '@tanstack/react-query'
import type {
  AddLinkDto,
  EditLinkDto,
  UserLinksV1EnableLinkBody,
  UserLinksV1DisableLinkBody,
  UserLinksV1DeleteLinkBody
} from '.././models'


export const userLinksV1AddLink = (
    uid: string,
    addLinkDto: AddLinkDto, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.post(
      `/users/${uid}/links`,
      addLinkDto,options
    );
  }



    export type UserLinksV1AddLinkMutationResult = NonNullable<Awaited<ReturnType<typeof userLinksV1AddLink>>>
    export type UserLinksV1AddLinkMutationBody = AddLinkDto
    export type UserLinksV1AddLinkMutationError = AxiosError<unknown>

    export const useUserLinksV1AddLink = <TError = AxiosError<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof userLinksV1AddLink>>, TError,{uid: string;data: AddLinkDto}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof userLinksV1AddLink>>, {uid: string;data: AddLinkDto}> = (props) => {
          const {uid,data} = props ?? {};

          return  userLinksV1AddLink(uid,data,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof userLinksV1AddLink>>, TError, {uid: string;data: AddLinkDto}, TContext>(mutationFn, mutationOptions)
    }
    export const userLinksV1EditLink = (
    uid: string,
    editLinkDto: EditLinkDto, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.put(
      `/users/${uid}/links`,
      editLinkDto,options
    );
  }



    export type UserLinksV1EditLinkMutationResult = NonNullable<Awaited<ReturnType<typeof userLinksV1EditLink>>>
    export type UserLinksV1EditLinkMutationBody = EditLinkDto
    export type UserLinksV1EditLinkMutationError = AxiosError<unknown>

    export const useUserLinksV1EditLink = <TError = AxiosError<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof userLinksV1EditLink>>, TError,{uid: string;data: EditLinkDto}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof userLinksV1EditLink>>, {uid: string;data: EditLinkDto}> = (props) => {
          const {uid,data} = props ?? {};

          return  userLinksV1EditLink(uid,data,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof userLinksV1EditLink>>, TError, {uid: string;data: EditLinkDto}, TContext>(mutationFn, mutationOptions)
    }
    export const userLinksV1EnableLink = (
    uid: string,
    appId: string,
    userLinksV1EnableLinkBody: UserLinksV1EnableLinkBody, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.patch(
      `/users/${uid}/links/${appId}/enable`,
      userLinksV1EnableLinkBody,options
    );
  }



    export type UserLinksV1EnableLinkMutationResult = NonNullable<Awaited<ReturnType<typeof userLinksV1EnableLink>>>
    export type UserLinksV1EnableLinkMutationBody = UserLinksV1EnableLinkBody
    export type UserLinksV1EnableLinkMutationError = AxiosError<unknown>

    export const useUserLinksV1EnableLink = <TError = AxiosError<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof userLinksV1EnableLink>>, TError,{uid: string;appId: string;data: UserLinksV1EnableLinkBody}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof userLinksV1EnableLink>>, {uid: string;appId: string;data: UserLinksV1EnableLinkBody}> = (props) => {
          const {uid,appId,data} = props ?? {};

          return  userLinksV1EnableLink(uid,appId,data,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof userLinksV1EnableLink>>, TError, {uid: string;appId: string;data: UserLinksV1EnableLinkBody}, TContext>(mutationFn, mutationOptions)
    }
    export const userLinksV1DisableLink = (
    uid: string,
    appId: string,
    userLinksV1DisableLinkBody: UserLinksV1DisableLinkBody, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.patch(
      `/users/${uid}/links/${appId}/disable`,
      userLinksV1DisableLinkBody,options
    );
  }



    export type UserLinksV1DisableLinkMutationResult = NonNullable<Awaited<ReturnType<typeof userLinksV1DisableLink>>>
    export type UserLinksV1DisableLinkMutationBody = UserLinksV1DisableLinkBody
    export type UserLinksV1DisableLinkMutationError = AxiosError<unknown>

    export const useUserLinksV1DisableLink = <TError = AxiosError<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof userLinksV1DisableLink>>, TError,{uid: string;appId: string;data: UserLinksV1DisableLinkBody}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof userLinksV1DisableLink>>, {uid: string;appId: string;data: UserLinksV1DisableLinkBody}> = (props) => {
          const {uid,appId,data} = props ?? {};

          return  userLinksV1DisableLink(uid,appId,data,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof userLinksV1DisableLink>>, TError, {uid: string;appId: string;data: UserLinksV1DisableLinkBody}, TContext>(mutationFn, mutationOptions)
    }
    export const userLinksV1DeleteLink = (
    uid: string,
    appId: string,
    userLinksV1DeleteLinkBody: UserLinksV1DeleteLinkBody, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.delete(
      `/users/${uid}/links/${appId}`,{data:
      userLinksV1DeleteLinkBody, ...options}
    );
  }



    export type UserLinksV1DeleteLinkMutationResult = NonNullable<Awaited<ReturnType<typeof userLinksV1DeleteLink>>>
    export type UserLinksV1DeleteLinkMutationBody = UserLinksV1DeleteLinkBody
    export type UserLinksV1DeleteLinkMutationError = AxiosError<unknown>

    export const useUserLinksV1DeleteLink = <TError = AxiosError<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof userLinksV1DeleteLink>>, TError,{uid: string;appId: string;data: UserLinksV1DeleteLinkBody}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof userLinksV1DeleteLink>>, {uid: string;appId: string;data: UserLinksV1DeleteLinkBody}> = (props) => {
          const {uid,appId,data} = props ?? {};

          return  userLinksV1DeleteLink(uid,appId,data,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof userLinksV1DeleteLink>>, TError, {uid: string;appId: string;data: UserLinksV1DeleteLinkBody}, TContext>(mutationFn, mutationOptions)
    }
    