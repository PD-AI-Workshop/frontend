import { AuthApi } from "@/http/AuthApi";
import { UserType } from "@/types/UserType";
import { AxiosError } from "axios";
import { makeAutoObservable } from "mobx";

export class UserStore {
    private user: UserType | null
    isAuth: boolean

    constructor() {
        let token = null
        let storedUser = null

        if (typeof window !== 'undefined') {
            storedUser = localStorage.getItem('user')
            token = localStorage.getItem('token')
        }

        this.user = storedUser ? JSON.parse(storedUser) : null
        this.isAuth = !!token
        makeAutoObservable(this)
    }

    public setAuth(bool: boolean) {
        this.isAuth = bool
    }

    public setUser(user: UserType) {
        this.user = user
    }

    public getUser(): UserType | null {
        return this.user
    }

    public async getCurrentUser(): Promise<UserType | null> {
        try {
            const response = await AuthApi.getCurrentUser()
            return response.data
        } catch (error) {
            this.logout()
            return null
        }
    }

    public async login(email: string, password: string): Promise<void> {
        try {
            const response = await AuthApi.login(email, password)
            localStorage.setItem('token', response.data.access_token)
            await this.checkAuth()
            window.location.href = '/profile'
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 400)
                alert('Неверный email или пароль')
        }
    }

    public async registration(username: string, email: string, password: string, role: string): Promise<void> {
        await AuthApi.register(username, email, password, role)
    }

    public async logout(): Promise<void> {
        try {
            await AuthApi.logout()
        } finally {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
            }

            this.setAuth(false)
            this.setUser({} as UserType)
        }
    }

    public async checkAuth(): Promise<void> {
        const token = typeof window !== 'undefined'
            ? localStorage.getItem('token')
            : null

        if (!token) {
            this.setAuth(false)
            this.setUser({} as UserType)
            return
        }

        try {
            const response = await AuthApi.getCurrentUser()

            this.setAuth(true)
            this.setUser(response.data)
        }

        catch (error) {
            this.setAuth(false)
            this.setUser({} as UserType)
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    }
}