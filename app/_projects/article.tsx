import type {Project} from '@/.contentlayer/generated'
import {Eye} from 'lucide-react'
import Link from 'next/link'

type Props = {
  project: Project
  views: number
}

export const Article: React.FC<Props> = ({project, views}) => {
  return (
    <Link href={`/projects/${project.slug}`}>
      <article className='p-4 md:p-8'>
        <div className='flex items-center justify-between gap-2'>
          <span className='text-xs duration-1000 drop-shadow-orange text-zinc-200 group-hover:border-zinc-200 group-hover:text-white'>
            {project.date ? (
              <time dateTime={new Date(project.date).toISOString()}>
                {Intl.DateTimeFormat(undefined, {dateStyle: 'medium'}).format(new Date(project.date))}
              </time>
            ) : (
              <span>SOON</span>
            )}
          </span>
          <span className='flex items-center gap-1 text-xs text-zinc-500'>
            <Eye className='w-4 h-4' /> {Intl.NumberFormat('en-US', {notation: 'compact'}).format(views)}
          </span>
        </div>
        <h2 className='z-20 text-xl font-medium duration-1000 font-display text-zinc-200 group-hover:text-white lg:text-3xl'>
          {project.title}
        </h2>
        <p className='z-20 mt-4 text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200'>{project.description}</p>
      </article>
    </Link>
  )
}
