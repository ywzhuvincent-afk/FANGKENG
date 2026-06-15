/**
 * 推荐算法测试
 * 这些测试 lock 住 spec §7.3 的关键行为
 * 如果失败,要么代码错了,要么 spec 改了 - 不要直接改测试通过
 */

import { describe, it, expect } from 'vitest';
import { computeScore } from './recommendation';

const baseContent = {
  id: 1n,
  geoScope: 'province' as const,
  geoIds: ['ca-bc'],
  identityRelevance: [],
  publishedAt: new Date(),
  isPaid: false,
  metrics: { views: 100, likes: 10, shares: 2 },
  author: { trustScore: 50 },
};

const baseUser = {
  identityTags: [],
  regionConfig: {
    primaryRegion: 'ca-bc',
    primaryCityId: undefined,
    followedRegions: [],
  },
};

describe('推荐算法 · geo_match_weight', () => {
  it('本省内容应该得到高分', () => {
    const score = computeScore(baseContent, baseUser);
    expect(score).toBeGreaterThan(0.5);
  });

  it('关注省权重(0.70)高于他国本国(0.30)', () => {
    const followedContent = {
      ...baseContent,
      geoIds: ['ca-on'],
    };
    const userFollowingON = {
      ...baseUser,
      regionConfig: {
        ...baseUser.regionConfig,
        followedRegions: [{ regionCode: 'ca-on' }],
      },
    };
    const otherCountryContent = {
      ...baseContent,
      geoIds: ['ca-ab'],
    };

    const followedScore = computeScore(followedContent, userFollowingON);
    const unfollowed = computeScore(otherCountryContent, baseUser);

    expect(followedScore).toBeGreaterThan(unfollowed);
  });

  it('非匹配 city scope 内容得 0 分(不显示)', () => {
    const cityContent = {
      ...baseContent,
      geoScope: 'city' as const,
      geoIds: ['ca-bc-some-other-city'],
    };
    const user = {
      ...baseUser,
      regionConfig: {
        ...baseUser.regionConfig,
        primaryCityId: 'ca-bc-richmond',
      },
    };
    const score = computeScore(cityContent, user);
    expect(score).toBeLessThan(0.4);
  });
});

describe('推荐算法 · recency', () => {
  it('新内容比旧内容得分高', () => {
    const old = { ...baseContent, publishedAt: new Date(Date.now() - 7 * 24 * 3600 * 1000) };
    const recent = { ...baseContent, publishedAt: new Date() };

    expect(computeScore(recent, baseUser)).toBeGreaterThan(computeScore(old, baseUser));
  });

  it('36 小时半衰期生效', () => {
    const now = new Date('2026-06-15T12:00:00Z');
    const t0 = { ...baseContent, publishedAt: now };
    const t36 = { ...baseContent, publishedAt: new Date(now.getTime() - 36 * 3600 * 1000) };

    const s0 = computeScore(t0, baseUser, now);
    const s36 = computeScore(t36, baseUser, now);

    const recencyContrib0 = 0.25 * 1.0;
    const recencyContrib36 = 0.25 * 0.5;
    expect(s0 - s36).toBeCloseTo(recencyContrib0 - recencyContrib36, 1);
  });
});

describe('推荐算法 · paid_boost', () => {
  it('付费内容比免费内容微弱加权', () => {
    const free = { ...baseContent, isPaid: false };
    const paid = { ...baseContent, isPaid: true };

    expect(computeScore(paid, baseUser) - computeScore(free, baseUser)).toBeCloseTo(0.02, 2);
  });
});
