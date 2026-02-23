export type UserType = {
    id: number
    username: string
    email: string
    is_active: boolean
    is_superuser: boolean
    is_verified: boolean
    role: string
}

export type UpdateUserType = Omit<UserType, 'id'>
