import {defineSchema, defineTable} from 'convex/server'
import {v} from 'convex/values'

export default defineSchema({
  intakeSignals: defineTable({
    businessType: v.string(),
    originalMessage: v.string(),
    shapedMessage: v.string(),
    persona: v.string(),
    warmth: v.number(),
    directness: v.number(),
    aiAssist: v.number(),
    source: v.union(v.literal('typed'), v.literal('voice'), v.literal('imported')),
    createdAt: v.number(),
  }).index('by_createdAt', ['createdAt']),
})
