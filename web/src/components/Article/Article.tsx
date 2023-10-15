import type { Post } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

interface Props {
  article: Post
}

const Article = ({ article }: Props) => {
  return (
    <article className="p-2 border border-gray-500 w-1/2">
      <header>
        <h2 className="font-bold text-2xl">
          <Link to={routes.article({ id: article.id })}>{article.title}</Link>
        </h2>
      </header>
      <div>Body: {article.body}</div>
      <div>Posted at: {article.createdAt}</div>
    </article>
  )
}

export default Article
