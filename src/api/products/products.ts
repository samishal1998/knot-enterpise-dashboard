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
  Product,
  CreateProductDto
} from '.././models'


export const productsCreate = (
    createProductDto: CreateProductDto, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    return axios.post(
      `/products`,
      createProductDto,options
    );
  }



    export type ProductsCreateMutationResult = NonNullable<Awaited<ReturnType<typeof productsCreate>>>
    export type ProductsCreateMutationBody = CreateProductDto
    export type ProductsCreateMutationError = AxiosError<Product>

    export const useProductsCreate = <TError = AxiosError<Product>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof productsCreate>>, TError,{data: CreateProductDto}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof productsCreate>>, {data: CreateProductDto}> = (props) => {
          const {data} = props ?? {};

          return  productsCreate(data,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof productsCreate>>, TError, {data: CreateProductDto}, TContext>(mutationFn, mutationOptions)
    }
    export const productsFindAll = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    return axios.get(
      `/products`,options
    );
  }


export const getProductsFindAllQueryKey = () => [`/products`];

    
export type ProductsFindAllQueryResult = NonNullable<Awaited<ReturnType<typeof productsFindAll>>>
export type ProductsFindAllQueryError = AxiosError<Product[]>

export const useProductsFindAll = <TData = Awaited<ReturnType<typeof productsFindAll>>, TError = AxiosError<Product[]>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof productsFindAll>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getProductsFindAllQueryKey();

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof productsFindAll>>> = ({ signal }) => productsFindAll({ signal, ...axiosOptions });

  const query = useQuery<Awaited<ReturnType<typeof productsFindAll>>, TError, TData>(queryKey, queryFn, queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

export const productsFindOneByUuidIncludeUser = (
    id: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    return axios.get(
      `/products/uuid/${id}/user`,options
    );
  }


export const getProductsFindOneByUuidIncludeUserQueryKey = (id: string,) => [`/products/uuid/${id}/user`];

    
export type ProductsFindOneByUuidIncludeUserQueryResult = NonNullable<Awaited<ReturnType<typeof productsFindOneByUuidIncludeUser>>>
export type ProductsFindOneByUuidIncludeUserQueryError = AxiosError<Product>

export const useProductsFindOneByUuidIncludeUser = <TData = Awaited<ReturnType<typeof productsFindOneByUuidIncludeUser>>, TError = AxiosError<Product>>(
 id: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof productsFindOneByUuidIncludeUser>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getProductsFindOneByUuidIncludeUserQueryKey(id);

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof productsFindOneByUuidIncludeUser>>> = ({ signal }) => productsFindOneByUuidIncludeUser(id, { signal, ...axiosOptions });

  const query = useQuery<Awaited<ReturnType<typeof productsFindOneByUuidIncludeUser>>, TError, TData>(queryKey, queryFn, {enabled: !!(id), ...queryOptions}) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

export const productsFindOneByQrUuidIncludeUser = (
    id: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    return axios.get(
      `/products/qr-uuid/${id}/user`,options
    );
  }


export const getProductsFindOneByQrUuidIncludeUserQueryKey = (id: string,) => [`/products/qr-uuid/${id}/user`];

    
export type ProductsFindOneByQrUuidIncludeUserQueryResult = NonNullable<Awaited<ReturnType<typeof productsFindOneByQrUuidIncludeUser>>>
export type ProductsFindOneByQrUuidIncludeUserQueryError = AxiosError<Product>

export const useProductsFindOneByQrUuidIncludeUser = <TData = Awaited<ReturnType<typeof productsFindOneByQrUuidIncludeUser>>, TError = AxiosError<Product>>(
 id: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof productsFindOneByQrUuidIncludeUser>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getProductsFindOneByQrUuidIncludeUserQueryKey(id);

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof productsFindOneByQrUuidIncludeUser>>> = ({ signal }) => productsFindOneByQrUuidIncludeUser(id, { signal, ...axiosOptions });

  const query = useQuery<Awaited<ReturnType<typeof productsFindOneByQrUuidIncludeUser>>, TError, TData>(queryKey, queryFn, {enabled: !!(id), ...queryOptions}) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

export const productsFindOneIncludeUser = (
    id: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    return axios.get(
      `/products/${id}/user`,options
    );
  }


export const getProductsFindOneIncludeUserQueryKey = (id: string,) => [`/products/${id}/user`];

    
export type ProductsFindOneIncludeUserQueryResult = NonNullable<Awaited<ReturnType<typeof productsFindOneIncludeUser>>>
export type ProductsFindOneIncludeUserQueryError = AxiosError<Product>

export const useProductsFindOneIncludeUser = <TData = Awaited<ReturnType<typeof productsFindOneIncludeUser>>, TError = AxiosError<Product>>(
 id: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof productsFindOneIncludeUser>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getProductsFindOneIncludeUserQueryKey(id);

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof productsFindOneIncludeUser>>> = ({ signal }) => productsFindOneIncludeUser(id, { signal, ...axiosOptions });

  const query = useQuery<Awaited<ReturnType<typeof productsFindOneIncludeUser>>, TError, TData>(queryKey, queryFn, {enabled: !!(id), ...queryOptions}) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

export const productsFindOneByQrUuid = (
    id: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    return axios.get(
      `/products/qr-uuid/${id}`,options
    );
  }


export const getProductsFindOneByQrUuidQueryKey = (id: string,) => [`/products/qr-uuid/${id}`];

    
export type ProductsFindOneByQrUuidQueryResult = NonNullable<Awaited<ReturnType<typeof productsFindOneByQrUuid>>>
export type ProductsFindOneByQrUuidQueryError = AxiosError<Product>

export const useProductsFindOneByQrUuid = <TData = Awaited<ReturnType<typeof productsFindOneByQrUuid>>, TError = AxiosError<Product>>(
 id: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof productsFindOneByQrUuid>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getProductsFindOneByQrUuidQueryKey(id);

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof productsFindOneByQrUuid>>> = ({ signal }) => productsFindOneByQrUuid(id, { signal, ...axiosOptions });

  const query = useQuery<Awaited<ReturnType<typeof productsFindOneByQrUuid>>, TError, TData>(queryKey, queryFn, {enabled: !!(id), ...queryOptions}) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

export const productsFindOneByUuid = (
    id: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    return axios.get(
      `/products/uuid/${id}`,options
    );
  }


export const getProductsFindOneByUuidQueryKey = (id: string,) => [`/products/uuid/${id}`];

    
export type ProductsFindOneByUuidQueryResult = NonNullable<Awaited<ReturnType<typeof productsFindOneByUuid>>>
export type ProductsFindOneByUuidQueryError = AxiosError<Product>

export const useProductsFindOneByUuid = <TData = Awaited<ReturnType<typeof productsFindOneByUuid>>, TError = AxiosError<Product>>(
 id: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof productsFindOneByUuid>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getProductsFindOneByUuidQueryKey(id);

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof productsFindOneByUuid>>> = ({ signal }) => productsFindOneByUuid(id, { signal, ...axiosOptions });

  const query = useQuery<Awaited<ReturnType<typeof productsFindOneByUuid>>, TError, TData>(queryKey, queryFn, {enabled: !!(id), ...queryOptions}) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

export const productsFindOne = (
    id: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<unknown>> => {
    return axios.get(
      `/products/${id}`,options
    );
  }


export const getProductsFindOneQueryKey = (id: string,) => [`/products/${id}`];

    
export type ProductsFindOneQueryResult = NonNullable<Awaited<ReturnType<typeof productsFindOne>>>
export type ProductsFindOneQueryError = AxiosError<Product>

export const useProductsFindOne = <TData = Awaited<ReturnType<typeof productsFindOne>>, TError = AxiosError<Product>>(
 id: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof productsFindOne>>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getProductsFindOneQueryKey(id);

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof productsFindOne>>> = ({ signal }) => productsFindOne(id, { signal, ...axiosOptions });

  const query = useQuery<Awaited<ReturnType<typeof productsFindOne>>, TError, TData>(queryKey, queryFn, {enabled: !!(id), ...queryOptions}) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

export const productsRemove = (
    id: string, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<void>> => {
    return axios.delete(
      `/products/${id}`,options
    );
  }



    export type ProductsRemoveMutationResult = NonNullable<Awaited<ReturnType<typeof productsRemove>>>
    
    export type ProductsRemoveMutationError = AxiosError<unknown>

    export const useProductsRemove = <TError = AxiosError<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof productsRemove>>, TError,{id: string}, TContext>, axios?: AxiosRequestConfig}
) => {
      const {mutation: mutationOptions, axios: axiosOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof productsRemove>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  productsRemove(id,axiosOptions)
        }

      return useMutation<Awaited<ReturnType<typeof productsRemove>>, TError, {id: string}, TContext>(mutationFn, mutationOptions)
    }
    