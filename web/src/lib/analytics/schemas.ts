import { z } from 'zod';

export const RangeSchema = z.union([
  z.literal('7d'),
  z.literal('28d'),
  z.literal('90d'),
  z.literal('custom'),
]);

export const QuerySchema = z.object({
  range: RangeSchema.default('28d'),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

export const AnalyticsSummarySchema = z.object({
  views: z.number(),
  users: z.number(),
  sessions: z.number(),
  engagementRate: z.number().optional(),
  avgSessionDurationSec: z.number().optional(),
});

export const TimePointSchema = z.object({
  date: z.string(),
  views: z.number(),
  users: z.number(),
  sessions: z.number(),
});

export const ChannelSchema = z.object({
  channel: z.string(),
  sessions: z.number(),
});

export const EventSchema = z.object({
  eventName: z.string(),
  eventCount: z.number(),
});

export const HomepageAnalyticsResponseSchema = z.object({
  summary: AnalyticsSummarySchema,
  timeSeries: z.array(TimePointSchema),
  topChannels: z.array(ChannelSchema),
  topEvents: z.array(EventSchema).optional(),
});

export type HomepageAnalyticsResponse = z.infer<typeof HomepageAnalyticsResponseSchema>;



