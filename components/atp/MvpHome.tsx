'use client';

import Link from 'next/link';
import {
  IconArchive,
  IconBook2,
  IconChevronRight,
  IconClock,
  IconLock,
  IconMapPin,
  IconSearch,
  IconShieldCheck,
} from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { ATPEmergencyBanner } from './EmergencyBanner';
import { ATPFontSizeControl } from './FontSizeControl';
import {
  categories,
  filterContent,
  getDefaultRegion,
  regions,
  type ContentSeed,
} from '@/lib/content/seed';

const emergencySteps = ['暂停转账或提供验证码', '截图保存聊天和链接', '从官网或公开电话重新核验'];

export function MvpHome() {
  const [regionCode, setRegionCode] = useState(getDefaultRegion().code);
  const [category, setCategory] = useState('全部');
  const [query, setQuery] = useState('');

  const selectedRegion = regions.find((region) => region.code === regionCode) ?? getDefaultRegion();
  const filteredItems = useMemo(
    () =>
      filterContent({
        regionCode,
        category: category === '全部' ? undefined : category,
        query,
      }),
    [category, query, regionCode]
  );
  const emergencyItems = filteredItems.filter((item) => item.isEmergency).slice(0, 2);
  const regularItems = filteredItems.filter((item) => !item.isEmergency);

  return (
    <main className="min-h-screen bg-atp-bg-page text-atp-text-primary">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-20 -mx-4 border-b border-[var(--atp-border-1)] bg-atp-bg-page/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <Link href="/" className="min-w-0">
              <div className="text-xs text-atp-text-tertiary">Avoid The Pit</div>
              <div className="truncate text-lg font-medium">避坑指南</div>
            </Link>
            <ATPFontSizeControl />
          </div>
          <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
            {regions.slice(0, 4).map((region) => (
              <button
                key={region.code}
                type="button"
                onClick={() => setRegionCode(region.code)}
                className={`inline-flex min-h-9 shrink-0 items-center gap-1 rounded-atp-pill border px-3 text-sm ${
                  region.code === regionCode
                    ? 'border-atp-text-primary bg-atp-text-primary text-white'
                    : 'border-[var(--atp-border-1)] bg-atp-bg-card text-atp-text-secondary'
                }`}
              >
                <IconMapPin className="size-4" aria-hidden="true" stroke={1.8} />
                {region.labelZh.split(' ')[0]}
              </button>
            ))}
          </div>
        </header>

        <section className="grid min-w-0 gap-6 py-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="min-w-0 space-y-5">
            <section className="min-w-0 rounded-atp-xl border border-[var(--atp-border-2)] bg-atp-bg-card p-5">
              <div className="mb-3 inline-flex items-center gap-2 rounded-atp-pill bg-atp-premium-bg px-3 py-1 text-xs text-atp-text-secondary">
                <IconMapPin className="size-4 text-atp-premium" aria-hidden="true" stroke={1.8} />
                当前雷达: {selectedRegion.labelZh}
              </div>
              <h1 className="max-w-2xl break-words text-3xl font-medium leading-tight [overflow-wrap:anywhere] sm:text-4xl">
                先看本地高频坑,再决定要不要转账、签字、付款
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-atp-text-secondary sm:text-base">
                面向北美华人的防骗与民生政策媒体站。第一版先把租房、报税、求职、买车、留学和长辈消费风险放到一个可搜索的本地雷达里。
              </p>
              <div className="mt-5 flex min-w-0 flex-col gap-3 sm:flex-row">
                <label className="relative flex-1">
                  <span className="sr-only">搜索避坑内容</span>
                  <IconSearch className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-atp-text-tertiary" aria-hidden="true" stroke={1.8} />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className="min-h-12 w-full rounded-atp-lg border border-[var(--atp-border-3)] bg-atp-bg-soft pl-10 pr-3 text-base outline-none focus:border-atp-accent"
                    placeholder="先搜一下这个坑,例如 gift card / 押金 / offer"
                  />
                </label>
                <Link
                  href="/scam-files"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-atp-lg bg-atp-accent px-4 text-sm font-medium text-white"
                >
                  查看避坑档案
                  <IconChevronRight className="size-4" aria-hidden="true" stroke={1.8} />
                </Link>
              </div>
            </section>

            <ATPEmergencyBanner trigger="wire_transfer" steps={emergencySteps} ctaHref="/articles/rental-deposit-before-transfer" />

            <section className="min-w-0">
              <div className="mb-3 flex items-end justify-between gap-3">
                <div>
                  <div className="text-xs text-atp-text-tertiary">Local risk radar</div>
                  <h2 className="text-xl font-medium">本地风险雷达</h2>
                </div>
                <span className="text-sm text-atp-text-tertiary">{filteredItems.length} 条内容</span>
              </div>
              <div className="flex max-w-full gap-2 overflow-x-auto pb-2">
                {['全部', ...categories].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={`min-h-10 shrink-0 rounded-atp-pill border px-4 text-sm ${
                      category === item
                        ? 'border-atp-accent bg-atp-accent text-white'
                        : 'border-[var(--atp-border-1)] bg-atp-bg-card text-atp-text-secondary'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="mt-3 overflow-hidden rounded-atp-xl border border-[var(--atp-border-2)] bg-atp-bg-card">
                {[...emergencyItems, ...regularItems].map((item) => (
                  <ContentRow key={item.slug} item={item} />
                ))}
                {filteredItems.length === 0 ? (
                  <div className="p-5 text-sm text-atp-text-secondary">暂时没有匹配内容。可以换一个关键词或地区。</div>
                ) : null}
              </div>
            </section>
          </div>

          <aside className="min-w-0 space-y-4 lg:sticky lg:top-28">
            <section className="rounded-atp-xl border border-atp-premium-border bg-atp-premium-bg p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-atp-text-primary">
                <IconShieldCheck className="size-5 text-atp-premium" aria-hidden="true" stroke={1.8} />
                MVP 上线范围
              </div>
              <p className="text-sm leading-6 text-atp-text-secondary">
                现在开放媒体站、搜索、地区筛选和内容详情。登录、投稿、会员和微信绑定将在下一阶段接入。
              </p>
            </section>
            <section className="rounded-atp-xl border border-[var(--atp-border-2)] bg-atp-bg-card p-4">
              <h2 className="mb-3 text-base font-medium">热门专题</h2>
              <div className="space-y-2">
                {categories.slice(0, 5).map((item) => (
                  <Link
                    key={item}
                    href={`/topics/${encodeURIComponent(item)}`}
                    className="flex min-h-11 items-center justify-between rounded-atp-lg bg-atp-bg-soft px-3 text-sm"
                  >
                    {item}
                    <IconChevronRight className="size-4 text-atp-text-tertiary" aria-hidden="true" stroke={1.8} />
                  </Link>
                ))}
              </div>
            </section>
            <section className="rounded-atp-xl border border-[var(--atp-border-2)] bg-atp-bg-card p-4">
              <h2 className="mb-3 text-base font-medium">即将开放</h2>
              <div className="grid gap-2 text-sm text-atp-text-secondary">
                <ComingSoon label="微信登录" />
                <ComingSoon label="匿名投稿" />
                <ComingSoon label="会员完整清单" />
              </div>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}

function ContentRow({ item }: { item: ContentSeed }) {
  const href = `/articles/${item.slug}`;

  return (
    <Link href={href} className="grid gap-2 border-b border-[var(--atp-border-1)] p-4 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center">
      <div>
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-atp-text-tertiary">
          <TypeBadge type={item.type} />
          <RiskBadge level={item.riskLevel} />
          <span>{item.category}</span>
          <span>{item.publishedAt}</span>
          {item.isPremiumPreview ? (
            <span className="inline-flex items-center gap-1 text-atp-premium">
              <IconLock className="size-3.5" aria-hidden="true" stroke={1.8} />
              会员预览
            </span>
          ) : null}
        </div>
        <h3 className="font-medium leading-snug">{item.title}</h3>
        <p className="mt-1 text-sm leading-6 text-atp-text-secondary">{item.summary}</p>
      </div>
      <IconChevronRight className="hidden size-5 text-atp-text-tertiary sm:block" aria-hidden="true" stroke={1.8} />
    </Link>
  );
}

function TypeBadge({ type }: { type: ContentSeed['type'] }) {
  const label = type === 'scam_file' ? '骗局档案' : type === 'topic' ? '专题' : '文章';
  const Icon = type === 'scam_file' ? IconArchive : IconBook2;

  return (
    <span className="inline-flex items-center gap-1 rounded-atp-sm bg-atp-bg-soft px-2 py-1 text-atp-text-secondary">
      <Icon className="size-3.5" aria-hidden="true" stroke={1.8} />
      {label}
    </span>
  );
}

function RiskBadge({ level }: { level: ContentSeed['riskLevel'] }) {
  const label = level === 'high' ? '高风险' : level === 'medium' ? '中风险' : '低风险';
  const className =
    level === 'high'
      ? 'bg-atp-accent-bg text-atp-accent-dark'
      : level === 'medium'
        ? 'bg-atp-warning-bg text-atp-text-primary'
        : 'bg-atp-success-bg text-atp-text-primary';

  return <span className={`rounded-atp-sm px-2 py-1 ${className}`}>{label}</span>;
}

function ComingSoon({ label }: { label: string }) {
  return (
    <div className="flex min-h-10 items-center justify-between rounded-atp-lg bg-atp-bg-soft px-3">
      <span>{label}</span>
      <span className="inline-flex items-center gap-1 text-xs text-atp-text-tertiary">
        <IconClock className="size-3.5" aria-hidden="true" stroke={1.8} />
        即将开放
      </span>
    </div>
  );
}
