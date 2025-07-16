import HorizontalVersionOfArticle from "@/components/HorizontalVersionOfArticle"
import OnTrendArticlesItem from "@/components/OnTrendArticlesItem"
import Link from "next/link"

export default function Home() {
  const articles = [
    {
      'id': 1,
      'title': 'Test',
      'mainImage': '/image0.png'
    },
    {
      'id': 2,
      'title': 'Test',
      'mainImage': '/image0.png'
    },
    {
      'id': 3,
      'title': 'Test',
      'mainImage': '/image0.png'
    },
    {
      'id': 4,
      'title': 'Test',
      'mainImage': '/image0.png'
    }]
  const onTrendArticles = articles.slice(0, 3)
  const neuralNetworkArticles = articles.slice(0, 2)
  const lastArticles = articles
  const categories = [{
    'id': 1,
    'name': 'string'
  }]

  return (
    <main className="flex flex-col items-center py-5 px-2.5 gap-5 grow shrink basis-0">

      <div className="w-full max-w-7xl">
        <h2 className="text-4xl font-semibold text-left w-full">В тренде</h2>
        <div className="flex justify-between mt-6 h-[351px]">
          {onTrendArticles.map(article =>
            <Link href={`/article/${article.id}`} key={article.id}>
              <OnTrendArticlesItem
                className="narrowVersion rounded-xl h-[350px] w-[415px]"
                article={article}
                categories={categories}
              />
            </Link>)}
        </div>
      </div>

      <div className="w-full max-w-7xl">
        <h2 className="text-4xl font-semibold text-left w-full">Нейросети</h2>
        <div className="flex justify-between mt-6">
          {neuralNetworkArticles.map(article =>
            <Link href={`/article/${article.id}`} key={article.id}>
              <OnTrendArticlesItem
                className="wideVersion rounded-xl w-[631px]"
                article={article}
                categories={categories}
              />
            </Link>)}
        </div>
      </div>

      <div className="w-full max-w-7xl">
        <h2 className="text-4xl font-semibold text-left w-full">Последнии статьи</h2>
        <div className="flex flex-col gap-5 mt-6">
          {lastArticles.map(article =>
            <Link href={`/article/${article.id}`} key={article.id}>
              <HorizontalVersionOfArticle
                article={article}
                categories={categories}
              />
            </Link>)}
        </div>
      </div>

    </main>
  )
}
