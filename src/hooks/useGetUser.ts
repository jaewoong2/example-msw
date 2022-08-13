import axios, { AxiosError, AxiosResponse } from 'axios'
import { QueryKey, useQuery, UseQueryOptions } from 'react-query'

const getUserRequest = async () => {
  const response = await axios.get('/user')
  return response
}

type QueryOptions = Omit<
  UseQueryOptions<
    AxiosResponse<any, any>,
    AxiosError<{ errorMessage: string }, any>,
    AxiosResponse<any, any>,
    QueryKey
  >,
  'queryKey' | 'queryFn'
>

export const useGetUser = <T>(options?: QueryOptions) => {
  return useQuery<AxiosResponse<T>, AxiosError<{ errorMessage: string }>>('user', getUserRequest, {
    ...options,
  })
}
