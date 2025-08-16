import { useEffect, useState } from 'react'

export const useLocalStorageState = <T>(key: string, defaultValue: T) => {
    const [state, setState] = useState<T>(() => {
        if (typeof window !== 'undefined') {
            const storedValue = localStorage.getItem(key)
            return storedValue ? JSON.parse(storedValue) : defaultValue
        }
        return defaultValue
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    }, [key, state])

    return [state, setState] as const
}
