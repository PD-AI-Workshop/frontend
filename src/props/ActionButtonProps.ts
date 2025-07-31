import { ReactNode } from 'react'

export interface ActionButtonProps {
    children: ReactNode
    onClick: () => void
    color: 'primary' | 'secondary' | 'danger'
}
