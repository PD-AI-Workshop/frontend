export interface SectionProps {
    title: string; 
    children: React.ReactNode
}

const Section = ({ title, children }: SectionProps) => {
    return (
        <section className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
            <div className="text-gray-700 space-y-4">
                {children}
            </div>
        </section>
    )
}

export default Section