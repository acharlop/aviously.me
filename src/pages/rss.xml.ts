import rss from '@astrojs/rss'
import {getCollection} from 'astro:content'
import {site} from '@/data/site'

export async function GET() {
  const posts = (await getCollection('blog'))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf())

  return rss({
    title: `${site.name} writing`,
    description: site.description,
    site: site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedDate,
      link: `/blog/${post.id.replace(/\.mdx?$/, '')}/`,
    })),
  })
}
