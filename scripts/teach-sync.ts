#!/usr/bin/env bun
// Push a `teach` skill workspace (on your laptop) up to the private /app
// learning area in Convex. Idempotent: re-run after generating new lessons —
// content is upserted and your per-lesson progress is preserved.
//
//   bun run teach:sync <path-to-teach-workspace> [--slug my-topic]
//
// Requires (in .env, matching the Convex deployment):
//   PUBLIC_CONVEX_URL  public deployment URL
//   SYNC_SECRET        shared secret; set on the deployment with
//                      `bunx convex env set SYNC_SECRET <random>`
import {readFile, readdir, stat} from 'node:fs/promises'
import {basename, join} from 'node:path'
import {ConvexHttpClient} from 'convex/browser'
import {api} from '../convex/_generated/api'

function fail(msg: string): never {
  console.error(`✗ ${msg}`)
  process.exit(1)
}

const args = process.argv.slice(2)
const slugFlagIdx = args.indexOf('--slug')
const slugOverride = slugFlagIdx >= 0 ? args[slugFlagIdx + 1] : undefined
const dir = args.find(
  (a, i) => !a.startsWith('--') && (slugFlagIdx < 0 || i !== slugFlagIdx + 1),
)
if (!dir) fail('Usage: bun run teach:sync <workspace-dir> [--slug my-topic]')

const url = process.env.PUBLIC_CONVEX_URL ?? process.env.CONVEX_URL
const secret = process.env.SYNC_SECRET
if (!url) fail('PUBLIC_CONVEX_URL is not set (see .env).')
if (!secret) fail('SYNC_SECRET is not set (see .env / the Convex deployment).')

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const orderFromName = (name: string) => {
  const m = name.match(/^(\d+)/)
  return m ? Number(m[1]) : 0
}

const titleize = (s: string) =>
  s.replace(/^\d+[-_]?/, '').replace(/[-_]+/g, ' ').replace(/\.[^.]+$/, '').trim() ||
  s

const stripTags = (s: string) => s.replace(/<[^>]+>/g, '').trim()

// Pull a human title out of an HTML doc: <title>, else first <h1>.
function htmlTitle(html: string, fallback: string) {
  const t = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  if (t?.[1]?.trim()) return stripTags(t[1])
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
  if (h1?.[1]?.trim()) return stripTags(h1[1])
  return fallback
}

// First markdown `# heading`, else fallback.
function mdTitle(md: string, fallback: string) {
  const m = md.match(/^#\s+(.+)$/m)
  return m?.[1]?.trim() || fallback
}

async function readOptional(path: string) {
  try {
    return await readFile(path, 'utf8')
  } catch {
    return undefined
  }
}

async function listDir(path: string, ext: string) {
  try {
    const names = await readdir(path)
    return names.filter((n) => n.toLowerCase().endsWith(ext)).sort()
  } catch {
    return []
  }
}

async function main() {
  const info = await stat(dir!).catch(() => fail(`Not a directory: ${dir}`))
  if (!info.isDirectory()) fail(`Not a directory: ${dir}`)

  const wsSlug = slugify(slugOverride ?? basename(dir!))
  const missionRaw = await readOptional(join(dir!, 'MISSION.md'))
  const notes = await readOptional(join(dir!, 'NOTES.md'))
  const resources = await readOptional(join(dir!, 'RESOURCES.md'))
  const title = missionRaw ? mdTitle(missionRaw, titleize(wsSlug)) : titleize(wsSlug)
  // The first `# heading` becomes the title, so drop it from the stored mission
  // body to avoid showing raw markdown in the UI.
  const mission = missionRaw?.replace(/^\s*#\s+.+\n+/, '').trim() || undefined

  const client = new ConvexHttpClient(url!)
  console.log(`→ ${url}`)
  console.log(`Syncing "${title}" (slug: ${wsSlug})`)

  await client.mutation(api.sync.upsertWorkspace, {
    secret: secret!,
    slug: wsSlug,
    title,
    mission,
    notes,
    resources,
  })

  const lessonFiles = await listDir(join(dir!, 'lessons'), '.html')
  for (const name of lessonFiles) {
    const html = await readFile(join(dir!, 'lessons', name), 'utf8')
    await client.mutation(api.sync.upsertLesson, {
      secret: secret!,
      workspaceSlug: wsSlug,
      order: orderFromName(name),
      slug: slugify(name),
      title: htmlTitle(html, titleize(name)),
      html,
    })
  }
  console.log(`  ${lessonFiles.length} lesson(s)`)

  const refFiles = await listDir(join(dir!, 'reference'), '.html')
  for (const name of refFiles) {
    const html = await readFile(join(dir!, 'reference', name), 'utf8')
    await client.mutation(api.sync.upsertReferenceDoc, {
      secret: secret!,
      workspaceSlug: wsSlug,
      slug: slugify(name),
      title: htmlTitle(html, titleize(name)),
      html,
    })
  }
  console.log(`  ${refFiles.length} reference doc(s)`)

  const recordFiles = await listDir(join(dir!, 'learning-records'), '.md')
  for (const name of recordFiles) {
    const markdown = await readFile(join(dir!, 'learning-records', name), 'utf8')
    await client.mutation(api.sync.upsertLearningRecord, {
      secret: secret!,
      workspaceSlug: wsSlug,
      order: orderFromName(name),
      slug: slugify(name),
      title: mdTitle(markdown, titleize(name)),
      markdown,
    })
  }
  console.log(`  ${recordFiles.length} learning record(s)`)

  console.log('✓ Done')
}

main().catch((err) => fail(err instanceof Error ? err.message : String(err)))
