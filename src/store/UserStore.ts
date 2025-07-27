import { AuthApi } from "@/http/AuthApi";
import { UserApi } from "@/http/UserApi";
import { UpdateUserType } from "@/types/UpdateUserType";
import { UserType } from "@/types/UserType";
import { AxiosError } from "axios";
import { makeAutoObservable, runInAction } from "mobx";

export class UserStore {
    private user: UserType | null
    private users: UserType[] = []
    private readonly userApi = new UserApi()
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

    public setUsers(users: UserType[]): void {
        this.users = users
    }

    public getUsers(): UserType[] {
        return this.users
    }

    async fetch(): Promise<void> {
        try {
            const users = await this.userApi.getAll()
            const sortedUsers = users.sort((a, b) => a.id - b.id)
            this.setUsers(sortedUsers)
        } catch (error) {
            console.error("Ошибка загрузки пользователей:", error)
        }
    }

    async update(id: number, user: UpdateUserType): Promise<void> {
        await this.userApi.update(id, user)

        runInAction(() => {
            const index = this.users.findIndex(a => a.id === id)
            if (index !== -1) {
                this.users[index] = {
                    ...this.users[index],
                    ...user
                }
            }
        })
    }

    async delete(id: number): Promise<void> {
        await this.userApi.delete(id)

        runInAction(() => {
            this.users = this.users.filter(a => a.id !== id)
        })
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