import { UserType } from "@/types/UserType";
import $host from ".";
import { UpdateUserType } from "@/types/UpdateUserType";

export class UserApi {
    async getAll() {
        const { data } = await $host.get<UserType[]>('user/')
        return data
    }

    async update(id: number, dto: UpdateUserType): Promise<UserType> {
        const { data } = await $host.patch<UserType>(`user/${id}`, dto)
        return data
    }

    async delete(id: number): Promise<void> {
        await $host.delete<void>(`user/${id}`)
    }
}