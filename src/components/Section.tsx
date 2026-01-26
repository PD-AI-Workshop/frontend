import { SectionPropsType } from '@/types/SectionPropsType'

const Section = ({ title, children, isDarkMode }: SectionPropsType) => {
    return (
        <section className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
            <h2 className={`text-xl md:text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {title}
            </h2>
            <div className={`space-y-4 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>{children}</div>
        </section>
    )
}

export default Section
