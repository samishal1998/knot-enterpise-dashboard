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
  CreateEnterpriseDto,
  Enterprise,
  EnterprisesFindOneParams,
  UpdateEnterpriseDto,
  User,
  CreateProfileDto
} from '.././models'


export const enterprisesCreate = (
    createEnterpriseDto: CreateEnterpriseDto, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.post(
      `/enterprises`,
      createEnterpriseDto,options
    );
  }



    export type EnterprisesCreateMutationResult = NonNullable<Awaited<ReturnType<typeof enterprisesCreate>>>
    export type EnterprisesCreateMutationBody = CreateEnterpriseDto
    export type EnterprisesCreateMutationError = AxiosError<unknown>

    export const useEnterprisesCreate = <TError = AxiosError<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof enterprisesCreate>>, TError,{data: CreateEnterpriseDto}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof enterprisesCreate>>, {data: CreateEnterpriseDto}> = (props) => {
          const {data} = props ?? {};

          return  enterprisesCreate(data,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof enterprisesCreate>>, TError, {data: CreateEnterpriseDto}, TContext>(mutationFn, mutationOptions)
    }
    export const enterprisesFindAll = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<Enterprise[]>> => {
    return axios.get(
      `/enterprises`,options
    );
  }


export const getEnterprisesFindAllQueryKey = () => [`/enterprises`];

    
export type EnterprisesFindAllQueryResult = NonNullable<Awaited<ReturnType<typeof enterprisesFindAll>>>
export type EnterprisesFindAllQueryError = AxiosError<unknown>

export const useEnterprisesFindAll = <TData = Awaited<ReturnType<typeof enterprisesFindAll>>, TError = AxiosError<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof enterprisesFindAll>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getEnterprisesFindAllQueryKey();

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof enterprisesFindAll>>> = ({ signal }) => enterprisesFindAll({ signal, ...axiosOptions });

  const query = useQuery<Awaited<ReturnType<typeof enterprisesFindAll>>, TError, TData>(queryKey, queryFn, queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

export const enterprisesFindOne = (
    id: string,
    params: EnterprisesFindOneParams, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<Enterprise>> => {
    return axios.get(
      `/enterprises/${id}`,{
    ...options,
        params: {...params, ...options?.params},}
    );
  }


export const getEnterprisesFindOneQueryKey = (id: string,
    params: EnterprisesFindOneParams,) => [`/enterprises/${id}`, ...(params ? [params]: [])];

    
export type EnterprisesFindOneQueryResult = NonNullable<Awaited<ReturnType<typeof enterprisesFindOne>>>
export type EnterprisesFindOneQueryError = AxiosError<unknown>

export const useEnterprisesFindOne = <TData = Awaited<ReturnType<typeof enterprisesFindOne>>, TError = AxiosError<unknown>>(
 id: string,
    params: EnterprisesFindOneParams, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof enterprisesFindOne>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getEnterprisesFindOneQueryKey(id,params);

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof enterprisesFindOne>>> = ({ signal }) => enterprisesFindOne(id,params, { signal, ...axiosOptions });

  const query = useQuery<Awaited<ReturnType<typeof enterprisesFindOne>>, TError, TData>(queryKey, queryFn, {enabled: !!(id), ...queryOptions}) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

export const enterprisesUpdate = (
    id: string,
    updateEnterpriseDto: UpdateEnterpriseDto, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<Enterprise>> => {
    return axios.patch(
      `/enterprises/${id}`,
      updateEnterpriseDto,options
    );
  }



    export type EnterprisesUpdateMutationResult = NonNullable<Awaited<ReturnType<typeof enterprisesUpdate>>>
    export type EnterprisesUpdateMutationBody = UpdateEnterpriseDto
    export type EnterprisesUpdateMutationError = AxiosError<unknown>

    export const useEnterprisesUpdate = <TError = AxiosError<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof enterprisesUpdate>>, TError,{id: string;data: UpdateEnterpriseDto}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof enterprisesUpdate>>, {id: string;data: UpdateEnterpriseDto}> = (props) => {
          const {id,data} = props ?? {};

          return  enterprisesUpdate(id,data,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof enterprisesUpdate>>, TError, {id: string;data: UpdateEnterpriseDto}, TContext>(mutationFn, mutationOptions)
    }
    export const enterprisesRemove = (
    id: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<Enterprise>> => {
    return axios.delete(
      `/enterprises/${id}`,options
    );
  }



    export type EnterprisesRemoveMutationResult = NonNullable<Awaited<ReturnType<typeof enterprisesRemove>>>
    
    export type EnterprisesRemoveMutationError = AxiosError<unknown>

    export const useEnterprisesRemove = <TError = AxiosError<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof enterprisesRemove>>, TError,{id: string}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof enterprisesRemove>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  enterprisesRemove(id,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof enterprisesRemove>>, TError, {id: string}, TContext>(mutationFn, mutationOptions)
    }
    export const enterprisesUnlinkEmployee = (
    id: string,
    employeeId: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<Enterprise>> => {
    return axios.patch(
      `/enterprises/${id}/employees/${employeeId}/unlink`,undefined,options
    );
  }



    export type EnterprisesUnlinkEmployeeMutationResult = NonNullable<Awaited<ReturnType<typeof enterprisesUnlinkEmployee>>>
    
    export type EnterprisesUnlinkEmployeeMutationError = AxiosError<unknown>

    export const useEnterprisesUnlinkEmployee = <TError = AxiosError<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof enterprisesUnlinkEmployee>>, TError,{id: string;employeeId: string}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof enterprisesUnlinkEmployee>>, {id: string;employeeId: string}> = (props) => {
          const {id,employeeId} = props ?? {};

          return  enterprisesUnlinkEmployee(id,employeeId,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof enterprisesUnlinkEmployee>>, TError, {id: string;employeeId: string}, TContext>(mutationFn, mutationOptions)
    }
    export const employeesCreateProfile = (
    eid: string,
    createProfileDto: CreateProfileDto, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<User>> => {
    return axios.post(
      `/enterprises/${eid}/employees`,
      createProfileDto,options
    );
  }



    export type EmployeesCreateProfileMutationResult = NonNullable<Awaited<ReturnType<typeof employeesCreateProfile>>>
    export type EmployeesCreateProfileMutationBody = CreateProfileDto
    export type EmployeesCreateProfileMutationError = AxiosError<unknown>

    export const useEmployeesCreateProfile = <TError = AxiosError<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof employeesCreateProfile>>, TError,{eid: string;data: CreateProfileDto}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof employeesCreateProfile>>, {eid: string;data: CreateProfileDto}> = (props) => {
          const {eid,data} = props ?? {};

          return  employeesCreateProfile(eid,data,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof employeesCreateProfile>>, TError, {eid: string;data: CreateProfileDto}, TContext>(mutationFn, mutationOptions)
    }
    