import { SectionPropsType } from '@/types/SectionPropsType'
import clsx from 'clsx'

const Section = ({ title, children, isDarkMode }: SectionPropsType) => {
    return (
        <section className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
            <h2 className={clsx('text-xl md:text-2xl font-semibold mb-4',
                {
                    'text-white': isDarkMode,
                    'text-gray-800': !isDarkMode
                }
            )}>
                {title}
            </h2>
            <div className={clsx('space-y-4',
                {
                    'text-white': isDarkMode,
                    'text-gray-700': !isDarkMode
                }
            )}>{children}</div>
        </section>
    )
}

export default Section
