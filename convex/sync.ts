import {ConvexError, v} from 'convex/values'
import type {Id} from './_generated/dataModel'
import type {MutationCtx} from './_generated/server'
import {mutation} from './_generated/server'

// Server-to-server sync from scripts/teach-sync.ts. These are public mutations
// (the sync script talks to the public deployment URL, not the browser auth
// flow), so they are gated by a shared SYNC_SECRET deployment env var rather
// than user auth. Set it with: bunx convex env set SYNC_SECRET <random>
function requireSecret(secret: string) {
  const expected = process.env.SYNC_SECRET
  if (!expected) {
    throw new ConvexError(
      'SYNC_SECRET is not set on the Convex deployment. Run: ' +
        'bunx convex env set SYNC_SECRET <random-string>',
    )
  }
  if (secret !== expected) {
    throw new ConvexError('Bad sync secret.')
  }
}

async function workspaceIdBySlug(ctx: MutationCtx, slug: string) {
  const ws = await ctx.db
    .query('workspaces')
    .withIndex('by_slug', (q) => q.eq('slug', slug))
    .unique()
  if (!ws) throw new ConvexError(`Unknown workspace slug: ${slug}`)
  return ws._id
}

export const upsertWorkspace = mutation({
  args: {
    secret: v.string(),
    slug: v.string(),
    title: v.string(),
    mission: v.optional(v.string()),
    notes: v.optional(v.string()),
    resources: v.optional(v.string()),
  },
  handler: async (ctx, {secret, slug, ...fields}) => {
    requireSecret(secret)
    const now = Date.now()
    const existing = await ctx.db
      .query('workspaces')
      .withIndex('by_slug', (q) => q.eq('slug', slug))
      .unique()
    if (existing) {
      await ctx.db.patch(existing._id, {...fields, updatedAt: now})
      return existing._id
    }
    return ctx.db.insert('workspaces', {
      slug,
      ...fields,
      createdAt: now,
      updatedAt: now,
    })
  },
})

export const upsertLesson = mutation({
  args: {
    secret: v.string(),
    workspaceSlug: v.string(),
    order: v.number(),
    slug: v.string(),
    title: v.string(),
    html: v.string(),
  },
  handler: async (ctx, {secret, workspaceSlug, order, slug, title, html}) => {
    requireSecret(secret)
    const workspaceId = await workspaceIdBySlug(ctx, workspaceSlug)
    const existing = await ctx.db
      .query('lessons')
      .withIndex('by_workspace_slug', (q) =>
        q.eq('workspaceId', workspaceId).eq('slug', slug),
      )
      .unique()
    if (existing) {
      // Content is re-synced; learning progress (status/timestamps) is kept.
      await ctx.db.patch(existing._id, {order, title, html})
      return existing._id
    }
    return ctx.db.insert('lessons', {
      workspaceId,
      order,
      slug,
      title,
      html,
      status: 'todo',
    })
  },
})

export const upsertReferenceDoc = mutation({
  args: {
    secret: v.string(),
    workspaceSlug: v.string(),
    slug: v.string(),
    title: v.string(),
    html: v.string(),
  },
  handler: async (ctx, {secret, workspaceSlug, slug, title, html}) => {
    requireSecret(secret)
    const workspaceId = await workspaceIdBySlug(ctx, workspaceSlug)
    await upsertReferenceChild(ctx, workspaceId, slug, {title, html})
  },
})

export const upsertLearningRecord = mutation({
  args: {
    secret: v.string(),
    workspaceSlug: v.string(),
    order: v.number(),
    slug: v.string(),
    title: v.string(),
    markdown: v.string(),
  },
  handler: async (
    ctx,
    {secret, workspaceSlug, order, slug, title, markdown},
  ) => {
    requireSecret(secret)
    const workspaceId = await workspaceIdBySlug(ctx, workspaceSlug)
    const existing = await ctx.db
      .query('learningRecords')
      .withIndex('by_workspace_slug', (q) =>
        q.eq('workspaceId', workspaceId).eq('slug', slug),
      )
      .unique()
    if (existing) {
      await ctx.db.patch(existing._id, {order, title, markdown})
      return
    }
    await ctx.db.insert('learningRecords', {
      workspaceId,
      order,
      slug,
      title,
      markdown,
    })
  },
})

// Upsert for the referenceDocs table (no order/status of its own).
async function upsertReferenceChild(
  ctx: MutationCtx,
  workspaceId: Id<'workspaces'>,
  slug: string,
  fields: {title: string; html: string},
) {
  const existing = await ctx.db
    .query('referenceDocs')
    .withIndex('by_workspace_slug', (q) =>
      q.eq('workspaceId', workspaceId).eq('slug', slug),
    )
    .unique()
  if (existing) {
    await ctx.db.patch(existing._id, fields)
    return
  }
  await ctx.db.insert('referenceDocs', {workspaceId, slug, ...fields})
}
