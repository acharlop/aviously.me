import {authTables} from '@convex-dev/auth/server'
import {defineSchema, defineTable} from 'convex/server'
import {v} from 'convex/values'

// The learning area mirrors the `teach` skill's workspace on disk:
//   MISSION.md / NOTES.md / RESOURCES.md  -> fields on `workspaces`
//   lessons/*.html                        -> `lessons`
//   reference/*.html                      -> `referenceDocs`
//   learning-records/*.md                 -> `learningRecords`
export const lessonStatus = v.union(
  v.literal('todo'),
  v.literal('in_progress'),
  v.literal('done'),
)

export default defineSchema({
  // Auth tables (users, sessions, accounts, …) required by @convex-dev/auth.
  ...authTables,

  workspaces: defineTable({
    slug: v.string(),
    title: v.string(),
    mission: v.optional(v.string()),
    notes: v.optional(v.string()),
    resources: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index('by_slug', ['slug']),

  lessons: defineTable({
    workspaceId: v.id('workspaces'),
    order: v.number(),
    slug: v.string(),
    title: v.string(),
    html: v.string(),
    status: lessonStatus,
    startedAt: v.optional(v.number()),
    completedAt: v.optional(v.number()),
  })
    .index('by_workspace', ['workspaceId'])
    .index('by_workspace_slug', ['workspaceId', 'slug']),

  referenceDocs: defineTable({
    workspaceId: v.id('workspaces'),
    slug: v.string(),
    title: v.string(),
    html: v.string(),
  })
    .index('by_workspace', ['workspaceId'])
    .index('by_workspace_slug', ['workspaceId', 'slug']),

  learningRecords: defineTable({
    workspaceId: v.id('workspaces'),
    order: v.number(),
    slug: v.string(),
    title: v.string(),
    markdown: v.string(),
  })
    .index('by_workspace', ['workspaceId'])
    .index('by_workspace_slug', ['workspaceId', 'slug']),
})
