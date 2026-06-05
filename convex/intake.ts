import {mutation} from './_generated/server'
import {v} from 'convex/values'

export const createSignal = mutation({
  args: {
    businessType: v.string(),
    originalMessage: v.string(),
    shapedMessage: v.string(),
    persona: v.string(),
    warmth: v.number(),
    directness: v.number(),
    aiAssist: v.number(),
    source: v.union(v.literal('typed'), v.literal('voice'), v.literal('imported')),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('intakeSignals', {
      ...args,
      createdAt: Date.now(),
    })
  },
})
