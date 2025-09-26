export type DateRangePreset = '7d' | '28d' | '90d' | 'custom';

export interface AnalyticsSummary {
  views: number;
  users: number;
  sessions: number;
  engagementRate?: number;
  avgSessionDurationSec?: number;
}

export interface AnalyticsTimePoint {
  date: string;
  views: number;
  users: number;
  sessions: number;
}

export interface AnalyticsChannel {
  channel: string;
  sessions: number;
}

export interface AnalyticsEvent {
  eventName: string;
  eventCount: number;
}

export interface HomepageAnalyticsResponse {
  summary: AnalyticsSummary;
  timeSeries: AnalyticsTimePoint[];
  topChannels: AnalyticsChannel[];
  topEvents?: AnalyticsEvent[];
}



