import axios, { AxiosError, AxiosResponse } from 'axios'
import { useCallback } from 'react'
import { useMutation, UseMutationOptions } from 'react-query'

type LoginRequestVariables = {
  username: string
}

const loginRequest = async ({ username }: LoginRequestVariables) => {
  const response = await axios.post('/login', { username })
  return response
}

type MutationOptions = Omit<
  UseMutationOptions<
    AxiosResponse<any, any>,
    AxiosError<{ errorMessage: string }, any>,
    LoginRequestVariables,
    unknown
  >,
  'mutationFn'
>

export const useLogin = (options?: MutationOptions) => {
  const mutation = useMutation<
    AxiosResponse,
    AxiosError<{ errorMessage: string }>,
    LoginRequestVariables
  >(loginRequest, { ...options })

  const handleFormSubmit = useCallback(
    ({ username }: LoginRequestVariables) =>
      (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutation.mutate({ username })
      },
    []
  )

  return { ...mutation, handleFormSubmit }
}
