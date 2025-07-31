import { AuthorInfoProps } from '@/props/AuthorInfoProps'
import { formatDate } from '@/utils/formatTime'
import { UserRound } from 'lucide-react'

const AuthorInfo = ({ username, created_date, time_reading }: AuthorInfoProps) => {
    return (
        <div className="flex gap-4">
            <div className="w-12 h-12 bg-[#ccc] rounded-[50%] flex items-center justify-center">
                <UserRound className="w-10 h-10" />
            </div>

            <div className="flex flex-col">
                <p>{username}</p>
                <p className="m-0 text-sm font-normal text-[#929292] flex gap-1.5">
                    <span>{formatDate(created_date)}</span>
                    <span className="font-semibold">•</span>
                    <span>{time_reading} мин. читать</span>
                </p>
            </div>
        </div>
    )
}

export default AuthorInfo
