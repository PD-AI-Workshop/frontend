'use client'

import HorizontalVersionOfArticle from "@/components/HorizontalVersionOfArticle"
import OnTrendArticlesItem from "@/components/OnTrendArticlesItem"
import Link from "next/link"
import { useContext, useEffect } from "react"
import { Context } from "./StoresProvider"
import { StoresType } from "@/types/StoresType"
import { observer } from "mobx-react-lite"

function Home() {
  const { articleStore, categoryStore, fileStore } = useContext(Context) as StoresType

  useEffect(() => {
    articleStore.fetch()
    categoryStore.fetch()
    fileStore.fetch()
  }, [])

  const categories = categoryStore.getCategories()
  const onTrendArticles = articleStore.onTrendArticles
  const neuralNetworkArticles = articleStore.getNeuralNetworkArticles(categories)
  const lastArticles = articleStore.lastArticles
  const files = fileStore.getFiles()

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
                files={files}
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
                files={files}
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
                files={files}
              />
            </Link>)}
        </div>
      </div>

    </main>
  )
}

export default observer(Home)