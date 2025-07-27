import { items } from "@/constants/items"
import { Menu } from "antd"
import Sider from "antd/es/layout/Sider"
import { useState } from "react"

export interface AdminMenuProps {
    selectedKey: string
    handleMenuSelect: ({ key }: { key: string }) => Promise<void>
}

const AdminMenu = ({ selectedKey, handleMenuSelect }: AdminMenuProps) => {
    const [collapsed, setCollapsed] = useState(false)
    const onCollapse = (value: boolean) => setCollapsed(value)

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
        >
            <Menu
                theme="dark"
                items={items}
                selectedKeys={[selectedKey]}
                onSelect={handleMenuSelect}
            />
        </Sider>
    )
}

export default AdminMenu