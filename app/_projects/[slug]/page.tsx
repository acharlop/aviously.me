import {Header} from './header'
import './mdx.css'
import {ReportView} from './view'
import {Mdx} from '@/app/components/mdx'
import {Redis} from '@upstash/redis'
import {allProjects} from 'contentlayer/generated'
import {notFound} from 'next/navigation'

export const revalidate = 60

type Props = {
  params: {
    slug: string
  }
}

const redis = Redis.fromEnv()

export async function generateStaticParams(): Promise<Props['params'][]> {
  return allProjects
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }))
}

export default async function PostPage({params}: Props) {
  const slug = params?.slug
  const project = allProjects.find((project) => project.slug === slug)

  if (!project) {
    notFound()
  }

  const views = (await redis.get<number>(['pageviews', 'projects', slug].join(':'))) ?? 0

  return (
    <div className='min-h-screen bg-zinc-50'>
      <Header project={project} views={views} />
      <ReportView slug={project.slug} />

      <article className='prose prose-zinc prose-quoteless mx-auto px-4 py-12'>
        <Mdx code={project.body.code} />
      </article>
    </div>
  )
}
