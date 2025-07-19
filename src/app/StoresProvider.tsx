'use client'

import { StoresProviderProps } from "@/props/StoresProviderProps"
import { ArticleStore } from "@/store/ArticleStore"
import { CategoryStore } from "@/store/CategoryStore"
import { FileStore } from "@/store/FileStore"
import { UserStore } from "@/store/UserStore"
import { StoresType } from "@/types/StoresType"
import { createContext, useState } from "react"

export const Context = createContext<StoresType | null>(null)

const StoresProvider = ({ children }: StoresProviderProps) => {
    const [stores] = useState<StoresType>({
        userStore: new UserStore(),
        articleStore: new ArticleStore(),
        categoryStore: new CategoryStore(),
        fileStore: new FileStore()
    })

    return (
        <Context.Provider value={stores}>
            {children}
        </Context.Provider>
    )
}

export default StoresProvider