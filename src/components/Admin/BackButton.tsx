import { Button, Space } from 'antd'
import { useRouter } from 'next/navigation'

const BackButton = () => {
    const router = useRouter()
    const handleBackClick = () => router.push('/')

    return (
        <Space>
            <Button type="primary" onClick={handleBackClick}>
                Назад
            </Button>
        </Space>
    )
}

export default BackButton