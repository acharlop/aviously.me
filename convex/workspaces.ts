import {getAuthUserId} from '@convex-dev/auth/server'
import {ConvexError, v} from 'convex/values'
import type {QueryCtx} from './_generated/server'
import {mutation, query} from './_generated/server'
import {lessonStatus} from './schema'

// Every function in the learning area is private. This throws unless the caller
// is the signed-in user; Convex enforces it server-side, so the public HTML
// shell at /app can never read learning data without a valid session.
async function requireUser(ctx: QueryCtx) {
  const userId = await getAuthUserId(ctx)
  if (userId === null) {
    throw new ConvexError('Not signed in.')
  }
  return userId
}

export const listWorkspaces = query({
  args: {},
  handler: async (ctx) => {
    await requireUser(ctx)
    const workspaces = await ctx.db.query('workspaces').collect()
    workspaces.sort((a, b) => b.updatedAt - a.updatedAt)

    return Promise.all(
      workspaces.map(async (ws) => {
        const lessons = await ctx.db
          .query('lessons')
          .withIndex('by_workspace', (q) => q.eq('workspaceId', ws._id))
          .collect()
        return {
          _id: ws._id,
          slug: ws.slug,
          title: ws.title,
          mission: ws.mission,
          updatedAt: ws.updatedAt,
          lessonCount: lessons.length,
          doneCount: lessons.filter((l) => l.status === 'done').length,
        }
      }),
    )
  },
})

export const getWorkspace = query({
  args: {slug: v.string()},
  handler: async (ctx, {slug}) => {
    await requireUser(ctx)
    const workspace = await ctx.db
      .query('workspaces')
      .withIndex('by_slug', (q) => q.eq('slug', slug))
      .unique()
    if (!workspace) return null

    const [lessons, referenceDocs, learningRecords] = await Promise.all([
      ctx.db
        .query('lessons')
        .withIndex('by_workspace', (q) => q.eq('workspaceId', workspace._id))
        .collect(),
      ctx.db
        .query('referenceDocs')
        .withIndex('by_workspace', (q) => q.eq('workspaceId', workspace._id))
        .collect(),
      ctx.db
        .query('learningRecords')
        .withIndex('by_workspace', (q) => q.eq('workspaceId', workspace._id))
        .collect(),
    ])

    lessons.sort((a, b) => a.order - b.order)
    learningRecords.sort((a, b) => a.order - b.order)
    referenceDocs.sort((a, b) => a.title.localeCompare(b.title))

    return {workspace, lessons, referenceDocs, learningRecords}
  },
})

export const setLessonStatus = mutation({
  args: {lessonId: v.id('lessons'), status: lessonStatus},
  handler: async (ctx, {lessonId, status}) => {
    await requireUser(ctx)
    const lesson = await ctx.db.get(lessonId)
    if (!lesson) throw new ConvexError('Lesson not found.')

    const now = Date.now()
    await ctx.db.patch(lessonId, {
      status,
      startedAt:
        status !== 'todo' && !lesson.startedAt ? now : lesson.startedAt,
      completedAt: status === 'done' ? now : undefined,
    })
  },
})
