import { z } from 'zod';

export const ProfileInsightsSchema = z.object({
  username: z.string(),
  fullName: z.string(),
  biography: z.string(),
  followersCount: z.number().int().positive(),
  followingCount: z.number().int().positive(),
  postsCount: z.number().int().positive(),
  profilePictureUrl: z.string().url(),
  isPrivate: z.boolean(),
  isVerified: z.boolean(),
  recentPosts: z.array(
    z.object({
      id: z.string(),
      caption: z.string(),
      imageUrl: z.string().url(),
      likes: z.number().int().positive(),
      comments: z.number().int().positive(),
      timestamp: z.date(),
    })
  ),
});

export type ProfileInsights = z.infer<typeof ProfileInsightsSchema>;
