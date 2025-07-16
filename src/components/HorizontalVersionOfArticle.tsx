import { HorizontalVersionOfArticleProps } from '@/props/HorizontalVersionOfArticleProps'
import Tag from './Tag'

const HorizontalVersionOfArticle = ({ article, categories }: HorizontalVersionOfArticleProps) => (
    <div className='flex w-7xl border border-gray-300/50 rounded-[12px] overflow-hidden'>
        <img
            src={article.mainImage}
            alt="article"
            className="w-xl object-cover " />

        <div className="p-3 flex flex-col">
            <p className="text-3xl font-semibold line-clamp-3">
                {article.title}
            </p>
            <div className="mt-30 flex justify-start gap-[5px]">
                {categories.map(category => <Tag name={category.name} key={category.id} />)}
            </div>
            <p className="mt-auto text-sm font-normal text-gray-600 font-inter">Советы</p>
        </div>
    </div>
)

export default HorizontalVersionOfArticle