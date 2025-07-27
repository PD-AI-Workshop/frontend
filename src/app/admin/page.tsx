'use client'

import { ConfigProvider, Layout, theme } from "antd"
import { useContext, useEffect, useState } from "react"
import { Context } from "../StoresProvider"
import { StoresType } from "@/types/StoresType"
import AdminMenu from "@/components/Admin/AdminMenu"
import AdminRouter from "@/components/Admin/AdminRouter"
import { observer } from "mobx-react-lite"
import { useRouter } from "next/navigation"

const { Content } = Layout

const AdminPage = () => {
    const { categoryStore, fileStore, userStore, articleStore } = useContext(Context) as StoresType
    const [isCheckingAuth, setIsCheckingAuth] = useState(true)
    const router = useRouter()
    const [selectedKey, setSelectedKey] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('selectedKey') ?? '1'
        }

        return '1'
    })

    useEffect(() => {
        const checkAuth = async () => {
            await userStore.checkAuth()
            setIsCheckingAuth(false)

            if (!userStore.isAuth) {
                router.push('/')
            }
        }
        checkAuth()
    }, [])

    useEffect(() => {
        if (isCheckingAuth) return

        const fetchData = async () => {
            try {
                await categoryStore.fetch()
                await fileStore.fetch()
                await articleStore.fetch()
                await userStore.fetch()
            } catch (error: any) {
                if (error.response?.status === 401) {
                    await userStore.logout()
                    router.push('/')
                }
            }
        }

        fetchData()
    }, [selectedKey, isCheckingAuth])

    const handleMenuSelect = async ({ key }: { key: string }) => {
        setSelectedKey(key)

        if (typeof window !== 'undefined') {
            localStorage.setItem('selectedKey', key)
        }
    }

    return (
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
            <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "row" }}>
                <AdminMenu selectedKey={selectedKey} handleMenuSelect={handleMenuSelect} />

                <Layout>
                    <Content style={{
                        padding: 24,
                        margin: 0,
                        background: "#141414"
                    }}>
                        <AdminRouter selectedKey={selectedKey} />
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    )
}

export default observer(AdminPage)