import $host from ".";

export class BaseApi<T, CreateT, UpdateT> {
    constructor(protected endpoint: string) { }

    async getAll(): Promise<T[]> {
        const { data } = await $host.get<T[]>(this.endpoint);
        return data;
    }

    async getById(id: number): Promise<T> {
        const { data } = await $host.get<T>(`${this.endpoint}/${id}`);
        return data;
    }

    async create(dto: CreateT): Promise<T> {
        const { data } = await $host.post<T>(this.endpoint, dto);
        return data;
    }

    async update(id: number, dto: UpdateT): Promise<void> {
        await $host.put<void>(`${this.endpoint}/${id}`, dto);
    }

    async delete(id: number): Promise<void> {
        await $host.delete<void>(`${this.endpoint}/${id}`);
    }
}