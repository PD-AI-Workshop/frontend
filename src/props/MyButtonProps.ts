import { ReactNode } from 'react'
export interface MyButtonProps {
    isSubmitting: boolean
    children: ReactNode
    isDarkMode: boolean
    testId?: string
}
