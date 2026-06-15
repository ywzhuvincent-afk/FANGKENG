/**
 * 推荐算法核心 - 按 spec v1.1 §7.3 实现
 *
 * 修改任何系数前请先看 spec,这些不是随便定的:
 * - geo_weight = 0.45 (主权重,不可低于 0.35)
 * - followed_region_weight = 0.70 (高于本国其他省 0.30,设计意图见 spec)
 * - recency_half_life = 36h
 * - distance_floor = 0.30 (50km 外不归零)
 */

export interface UserRegionConfig {
  primaryRegion: string;
  primaryCityId?: string;
  followedRegions: Array<{
    regionCode: string;
    note?: string;
    relationTag?: string;
  }>;
}

export interface ContentForScoring {
  id: bigint;
  geoScope: 'city' | 'metro' | 'province' | 'country' | 'continent';
  geoIds: string[];
  identityRelevance: string[];
  publishedAt: Date;
  isPaid: boolean;
  metrics: {
    views: number;
    likes: number;
    shares: number;
  };
  author: {
    trustScore: number;
  };
  incidentCenter?: { lat: number; lng: number };
}

export interface UserForScoring {
  identityTags: string[];
  regionConfig: UserRegionConfig;
  cityCentroid?: { lat: number; lng: number };
}

const WEIGHTS = {
  geo: 0.45,
  recency: 0.25,
  socialProof: 0.15,
  identity: 0.10,
  creatorTrust: 0.05,
  paidBoost: 0.02,
} as const;

const RECENCY_HALF_LIFE_HOURS = 36;
const DISTANCE_FLOOR = 0.30;
const DISTANCE_LINEAR_KM = 50;

export function computeScore(
  content: ContentForScoring,
  user: UserForScoring,
  now: Date = new Date()
): number {
  const geo = geoMatchWeight(content, user);
  const recency = recencyDecay(content.publishedAt, now);
  const socialProof = Math.min(
    1,
    Math.log1p(content.metrics.likes + 2 * content.metrics.shares) / 8
  );
  const identity = jaccard(content.identityRelevance, user.identityTags);
  const creatorTrust = Math.pow(content.author.trustScore / 100, 0.6);
  const paidBoost = content.isPaid ? WEIGHTS.paidBoost : 0;

  const score =
    geo * WEIGHTS.geo +
    recency * WEIGHTS.recency +
    socialProof * WEIGHTS.socialProof +
    identity * WEIGHTS.identity +
    creatorTrust * WEIGHTS.creatorTrust +
    paidBoost;

  return clamp(score, 0, 1);
}

function geoMatchWeight(
  content: ContentForScoring,
  user: UserForScoring
): number {
  const { primaryRegion, primaryCityId, followedRegions } = user.regionConfig;

  if (content.geoScope === 'city') {
    if (primaryCityId && content.geoIds.includes(primaryCityId)) {
      return 1.0 * distanceDecay(content, user);
    }
    return 0;
  }

  if (content.geoScope === 'metro' || content.geoScope === 'province') {
    if (content.geoIds.includes(primaryRegion)) {
      return 0.95;
    }
    if (followedRegions.some((r) => content.geoIds.includes(r.regionCode))) {
      return 0.70;
    }
    return 0;
  }

  if (content.geoScope === 'country') {
    if (sameCountry(primaryRegion, content.geoIds)) {
      return 0.45;
    }
    return 0.20;
  }

  return 0.15;
}

function distanceDecay(
  content: ContentForScoring,
  user: UserForScoring
): number {
  if (!content.incidentCenter || !user.cityCentroid) return 1.0;
  const dKm = haversine(user.cityCentroid, content.incidentCenter);
  return Math.max(DISTANCE_FLOOR, 1.0 - dKm / DISTANCE_LINEAR_KM);
}

function recencyDecay(publishedAt: Date, now: Date): number {
  const hoursAgo = (now.getTime() - publishedAt.getTime()) / (1000 * 60 * 60);
  return Math.pow(0.5, hoursAgo / RECENCY_HALF_LIFE_HOURS);
}

function jaccard(a: string[], b: string[]): number {
  if (a.length === 0 && b.length === 0) return 0;
  const setA = new Set(a);
  const setB = new Set(b);
  const intersection = [...setA].filter((x) => setB.has(x)).length;
  const union = new Set([...a, ...b]).size;
  return intersection / union;
}

function sameCountry(userRegion: string, contentGeoIds: string[]): boolean {
  const userCountry = userRegion.split('-')[0];
  return contentGeoIds.some((g) => g.startsWith(userCountry));
}

function haversine(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}
