import { UserStore } from "@/store/UserStore"
import { useEffect } from "react"
import { useStores } from "./useStores"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export const useAdminData = ({
    userStore,
    router,
    selectedKey
}: {
    userStore: UserStore,
    router: AppRouterInstance,
    selectedKey: string
}) => {
    const { categoryStore, fileStore, articleStore } = useStores()

    useEffect(() => {
        const fetchData = async () => {
            const results = await Promise.allSettled([
                categoryStore.fetch(),
                fileStore.fetch(),
                articleStore.fetch(),
                userStore.fetch()
            ])

            const hasUnauthorized = results.filter(r => r.status === 'rejected').some(r => r.reason?.response?.status === 401)

            if (hasUnauthorized) {
                router.push('/');
            }
        }

        fetchData()
    }, [selectedKey])
}