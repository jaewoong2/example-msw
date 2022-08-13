import React from 'react'
import { useGetUser } from './hooks/useGetUser'
import useInput from './hooks/useInput'
import { useLogin } from './hooks/useLogin'

const App = () => {
  const [username, , handleChangeUsername] = useInput('')
  const { data, refetch } = useGetUser<{ username: string }>({ enabled: false })
  const { handleFormSubmit, error: loginError } = useLogin({
    onSuccess: () => {
      refetch()
    },
  })

  return (
    <div>
      <form
        className="w-2/5 h-40 flex justify-center flex-col mx-auto px-5"
        onSubmit={handleFormSubmit({ username })}
      >
        <input
          className="w-3/5 border rounded-lg p-2"
          placeholder="유저이름을 등록해주세요"
          value={username}
          onChange={handleChangeUsername}
        />
        <button
          type="submit"
          className="flex border w-fit p-3 mt-1 rounded-lg bg-blue-500 hover:bg-blue-400"
        >
          유저 등록
        </button>
      </form>
      <p className="w-2/5  flex justify-center flex-col mx-auto px-5 text-red-400">
        {loginError?.response?.data.errorMessage}
      </p>
      <p className="w-2/5  flex justify-center flex-col mx-auto px-5">
        유저 이름: {data?.data.username}
      </p>
    </div>
  )
}

export default App
