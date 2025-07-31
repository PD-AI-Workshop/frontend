import { useContext } from 'react'
import { StoresType } from '@/types/StoresType'
import { Context } from '@/components/StoresProvider'

export const useStores = (): StoresType => {
    const stores = useContext(Context)
    if (!stores) throw new Error('Stores not available')
    return stores
}
