export interface AdminMenuProps {
    selectedKey: string
    handleMenuSelect: ({ key }: { key: string }) => Promise<void>
}
