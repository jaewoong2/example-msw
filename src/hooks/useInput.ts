import React, { useCallback, useState } from 'react'

const useInput = (initialValue?: string) => {
  const [value, setValue] = useState<string>(initialValue ?? '')

  const handleChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  return [value, setValue, handleChangeValue] as const
}

export default useInput
