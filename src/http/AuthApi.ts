import { AuthResponseType } from '@/types/AuthResponseType'
import { AxiosResponse } from 'axios'
import $host from '.'
import { RegResponseType } from '@/types/RegResponseType'
import { UserType } from '@/types/UserTypes'

const FORM_URLENCODED_HEADERS = {
    'Content-Type': 'application/x-www-form-urlencoded',
}

export class AuthApi {
    async login(email: string, password: string): Promise<AxiosResponse<AuthResponseType>> {
        const params = new URLSearchParams({ username: email, password })

        return $host.post<AuthResponseType>('auth/login', params, { headers: FORM_URLENCODED_HEADERS })
    }

    async register(
        username: string,
        email: string,
        password: string,
        role: string
    ): Promise<AxiosResponse<RegResponseType>> {
        return $host.post<RegResponseType>('auth/register', { username, email, password, role })
    }

    async logout(): Promise<AxiosResponse<void>> {
        return $host.post<void>('auth/logout')
    }

    async getCurrentUser(): Promise<AxiosResponse<UserType>> {
        return $host.get<UserType>('user/me')
    }
}
