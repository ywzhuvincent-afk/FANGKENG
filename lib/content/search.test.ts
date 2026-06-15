import { describe, expect, it } from 'vitest';
import { contentItems, filterContent, getContentBySlug, regions } from './seed';

describe('MVP content seed filtering', () => {
  it('uses BC as the default launch region', () => {
    expect(regions.find((region) => region.defaultSelected)?.code).toBe('ca-bc');
  });

  it('filters local and continent-wide content for a selected region', () => {
    const results = filterContent({ regionCode: 'ca-bc' });
    expect(results.map((item) => item.slug)).toContain('rental-deposit-before-transfer');
    expect(results.map((item) => item.slug)).toContain('irs-cra-phone-scam-checklist');
    expect(
      results.every((item) => item.regionCodes.includes('ca-bc') || item.regionCodes.includes('north-america'))
    ).toBe(true);
  });

  it('searches title, summary, and tags', () => {
    const results = filterContent({ query: 'gift card' });
    expect(results.map((item) => item.slug)).toContain('irs-cra-phone-scam-checklist');
  });

  it('filters by category without hiding matching premium previews', () => {
    const results = filterContent({ category: '升学' });
    expect(results.map((item) => item.slug)).toContain('school-consultant-guarantee-admission');
    expect(results.some((item) => item.isPremiumPreview)).toBe(true);
  });

  it('returns article details by slug', () => {
    const item = getContentBySlug('remote-job-fake-check-warning');
    expect(item?.type).toBe('article');
    expect(item?.body.length).toBeGreaterThan(2);
  });

  it('keeps emergency items ahead of regular content', () => {
    const results = filterContent({ regionCode: 'ca-bc' });
    const firstEmergencyIndex = results.findIndex((item) => item.isEmergency);
    const firstRegularIndex = results.findIndex((item) => !item.isEmergency);
    expect(firstEmergencyIndex).toBe(0);
    expect(firstRegularIndex).toBeGreaterThan(firstEmergencyIndex);
    expect(contentItems.some((item) => item.isEmergency)).toBe(true);
  });

  it('provides display metadata for social feed cards', () => {
    expect(
      contentItems.every(
        (item) =>
          ['post', 'clip', 'file'].includes(item.displayFormat) &&
          item.hook.length > 0 &&
          item.authorName.length > 0 &&
          item.coverTone.length > 0 &&
          item.stats.likes > 0 &&
          item.stats.saves > 0 &&
          item.stats.comments > 0
      )
    ).toBe(true);
    expect(contentItems.some((item) => item.displayFormat === 'clip' && item.durationLabel)).toBe(true);
  });
});
