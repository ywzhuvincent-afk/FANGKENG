/**
 * IP 地理识别 - 按 spec §7.1 实现
 *
 * 主路径:Cloudflare CF-IPCity / CF-IPCountry 请求头
 * 备用:MaxMind GeoIP2(留接口,不在 MVP 实现)
 *
 * 重要:不存原始 IP,只存解析后的 region_code + city_id
 * 30 天后只保留 city_id(隐私合规,spec §10.1)
 */

import { headers } from 'next/headers';

export interface DetectedLocation {
  country: string;
  region?: string;
  city?: string;
  regionCode: string;
  cityId?: string;
}

const COUNTRY_DEFAULT_REGION: Record<string, string> = {
  CA: 'ca-bc',
  US: 'us-ca',
};

export async function detectLocationFromIP(): Promise<DetectedLocation | null> {
  const h = headers();
  const country = h.get('cf-ipcountry');
  const region = h.get('cf-region-code');
  const city = h.get('cf-ipcity');

  if (!country || !['CA', 'US'].includes(country)) {
    return null;
  }

  const regionCode = inferRegionCode(country, region);
  const cityId = city ? toCityId(country, region, city) : undefined;

  return {
    country,
    region: region || undefined,
    city: city || undefined,
    regionCode,
    cityId,
  };
}

function inferRegionCode(country: string, region: string | null): string {
  if (!region) {
    return COUNTRY_DEFAULT_REGION[country] || 'ca-bc';
  }
  return `${country.toLowerCase()}-${region.toLowerCase()}`;
}

function toCityId(
  country: string,
  region: string | null,
  cityName: string
): string {
  const parts = [country, region, cityName]
    .filter(Boolean)
    .map((s) => s!.toLowerCase().replace(/\s+/g, '-'));
  return parts.join('-');
}
