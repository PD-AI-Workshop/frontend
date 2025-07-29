'use client'

import { Button, ConfigProvider, Layout, theme } from "antd"
import { useContext, useEffect, useState } from "react"
import { Context } from "../StoresProvider"
import { StoresType } from "@/types/StoresType"
import AdminMenu from "@/components/Admin/AdminMenu"
import AdminRouter from "@/components/Admin/AdminRouter"
import { observer } from "mobx-react-lite"
import { useRouter } from "next/navigation"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import Sider from "antd/es/layout/Sider"

const { Content } = Layout

const AdminPage = () => {
    const { categoryStore, fileStore, userStore, articleStore } = useContext(Context) as StoresType
    const [isCheckingAuth, setIsCheckingAuth] = useState(true)
    const router = useRouter()
    const [isMobile, setIsMobile] = useState(false)
    const [collapsed, setCollapsed] = useState(isMobile)
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
        const checkIsMobile = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches)
        }

        checkIsMobile()
        window.addEventListener("resize", checkIsMobile)
        return () => window.removeEventListener("resize", checkIsMobile)
    }, [])

    useEffect(() => {
        if (isMobile) {
            setCollapsed(true)
        }
    }, [isMobile])

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
        localStorage.setItem('selectedKey', key)

        if (isMobile) {
            setCollapsed(true)
        }
    }

    return (
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
            <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "row" }}>
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={setCollapsed}
                    collapsedWidth={isMobile ? 0 : 80}
                    width={200}
                    breakpoint="md"
                    trigger={null}
                    style={{
                        overflow: "auto",
                        height: "100vh",
                        position: isMobile ? "absolute" : "relative",
                        zIndex: 100,
                        left: isMobile ? (collapsed ? "-100%" : "0") : "auto"
                    }}
                >
                    <AdminMenu
                        selectedKey={selectedKey}
                        handleMenuSelect={handleMenuSelect}
                    />
                </Sider>

                <Layout>
                    {isMobile && (
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                position: "absolute",
                                top: 16,
                                left: 16,
                                zIndex: 99,
                                color: "rgba(255, 255, 255, 0.8)"
                            }}
                        />
                    )}

                    <Content style={{
                        padding: 24,
                        margin: 0,
                        background: "#141414",
                        minHeight: "100vh"
                    }}>
                        <AdminRouter selectedKey={selectedKey} />
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    )
}

export default observer(AdminPage)