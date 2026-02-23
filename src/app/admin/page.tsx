'use client'

import { Button, ConfigProvider, Layout, theme } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import AdminMenu from '@/components/Admin/AdminMenu'
import AdminRouter from '@/components/Admin/AdminRouter'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useMobileDetect } from '@/hooks/useMobileDetect'
import { useAuthCheck } from '@/hooks/useAuthCheck'
import { useLocalStorageState } from '@/hooks/useLocalStorageState'
import { useStores } from '@/hooks/useStores'
import { SquareChevronLeft, SquareChevronRight } from 'lucide-react'
import { useAdminData } from '@/hooks/useAdminData'
import clsx from 'clsx'

const AdminPage = () => {
    const { userStore } = useStores()
    const router = useRouter()
    const isCheckingAuth = useAuthCheck(userStore, router)
    const isMobile = useMobileDetect()
    const [collapsed, setCollapsed] = useState(isMobile)
    const [selectedKey, setSelectedKey] = useLocalStorageState<string>('selectedKey', '1')

    useEffect(() => {
        setCollapsed(isMobile)
    }, [isMobile])

    useAdminData({ userStore, router, selectedKey })

    const handleMenuSelect = ({ key }: { key: string }) => {
        setSelectedKey(key)
        if (isMobile) setCollapsed(true)
    }

    const toggleMenu = useCallback(() => {
        setCollapsed(prev => !prev)
    }, [])

    if (isCheckingAuth) {
        return <div className='flex items-center justify-center min-h-screen'>Checking authorization...</div>
    }

    return (
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
            <Layout className="flex min-h-screen">
                <Layout.Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={setCollapsed}
                    collapsedWidth={isMobile ? 0 : 80}
                    width={200}
                    breakpoint="md"
                    trigger={null}
                    className={clsx(
                        'h-screen fixed lg:relative z-50',
                        isMobile && !collapsed && 'inset-0'
                    )}
                >
                    <AdminMenu selectedKey={selectedKey} handleMenuSelect={handleMenuSelect} />
                </Layout.Sider>

                <Layout>
                    {isMobile && (
                        <Button
                            type="text"
                            icon={collapsed ? <SquareChevronRight /> : <SquareChevronLeft />}
                            onClick={toggleMenu}
                            className="fixed top-4 left-4 z-40 text-white/80"
                        />
                    )}

                    <Layout.Content className="p-6 bg-[#141414] min-h-screen">
                        <AdminRouter selectedKey={selectedKey} />
                    </Layout.Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    )
}

export default observer(AdminPage)
