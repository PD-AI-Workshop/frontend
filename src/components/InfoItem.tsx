import { InfoItemProps } from '@/props/InfoItemProps'

const InfoItem = ({ value }: InfoItemProps) => {
    return (
        <div className="flex flex-col">
            <span className="text-lg font-medium text-center py-2 px-4 bg-gray-100 rounded-lg text-black">
                {value || '—'}
            </span>
        </div>
    )
}

export default InfoItem
