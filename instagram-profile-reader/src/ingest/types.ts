export interface ProfilePost {
  id: string;
  caption: string;
  likeCount: number;
  commentCount: number;
  publishedAt: string;
  imageUrls: string[];
  dominantColors?: string[];
  keywords?: string[];
}

export interface RawInstagramProfile {
  username: string;
  fullName: string;
  bio: string;
  followers: number;
  following: number;
  externalUrl?: string;
  posts: ProfilePost[];
  categories?: string[];
  recentHighlights?: string[];
}

export interface FixtureMetadata {
  source: "fixture";
  loadedFrom: string;
}

export interface ApiMetadata {
  source: "api";
  fetchedAt: string;
  requestId: string;
}

export type IngestMetadata = FixtureMetadata | ApiMetadata;

export interface IngestResult {
  profile: RawInstagramProfile;
  metadata: IngestMetadata;
}


