'use client';

import Link from 'next/link';
import {
  IconArchive,
  IconBellRinging,
  IconBookmark,
  IconChevronRight,
  IconClock,
  IconCompass,
  IconFlame,
  IconHeart,
  IconHome,
  IconLayoutGrid,
  IconLock,
  IconMapPin,
  IconMessageCircle,
  IconPlayerPlay,
  IconPlus,
  IconSearch,
  IconShieldCheck,
  IconUser,
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

const allCategory = '全部';
const emergencySteps = ['暂停转账或提供验证码', '截图保存聊天和链接', '从官网或公开电话重新核验'];

function ATPLogoMark({ size = 32 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center bg-atp-accent text-white font-serif font-medium"
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.3,
        fontSize: size * 0.56,
      }}
      aria-hidden="true"
    >
      坑
    </span>
  );
}

export function MvpHome() {
  const [regionCode, setRegionCode] = useState(getDefaultRegion().code);
  const [category, setCategory] = useState(allCategory);
  const [query, setQuery] = useState('');

  const selectedRegion = regions.find((region) => region.code === regionCode) ?? getDefaultRegion();
  const filteredItems = useMemo(
    () =>
      filterContent({
        regionCode,
        category: category === allCategory ? undefined : category,
        query,
      }),
    [category, query, regionCode]
  );
  const featuredItem = filteredItems[0];
  const feedItems = featuredItem ? filteredItems.slice(1) : filteredItems;
  const hotItems = filteredItems.slice(0, 4);

  return (
    <main className="min-h-screen bg-atp-bg-page text-atp-text-primary">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)_320px] lg:gap-6 lg:px-6">
        <DesktopNav />

        <section className="min-w-0 pb-24 lg:pb-10">
          <header className="sticky top-0 z-30 border-b border-[var(--atp-border-1)] bg-atp-bg-page/95 px-4 pb-3 pt-4 backdrop-blur lg:top-0 lg:px-0">
            <div className="flex items-center justify-between gap-3">
              <Link href="/" className="flex min-w-0 items-center gap-2.5">
                <ATPLogoMark size={36} />
                <div className="min-w-0 leading-tight">
                  <div className="text-[20px] font-medium tracking-wide">避坑指南</div>
                  <div className="text-[10.5px] uppercase tracking-[0.08em] text-atp-text-tertiary">
                    North American Chinese
                  </div>
                </div>
              </Link>
              <ATPFontSizeControl />
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {regions.slice(0, 4).map((region) => (
                <button
                  key={region.code}
                  type="button"
                  onClick={() => setRegionCode(region.code)}
                  className={`inline-flex min-h-9 shrink-0 items-center gap-1 rounded-atp-pill border px-3.5 text-sm transition ${
                    region.code === regionCode
                      ? 'border-atp-accent bg-atp-accent text-white'
                      : 'border-[var(--atp-border-1)] bg-white text-atp-text-secondary'
                  }`}
                >
                  <IconMapPin className="size-4" aria-hidden="true" stroke={1.8} />
                  {region.labelZh.split(' ')[0]}
                </button>
              ))}
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
              <label className="relative min-w-0">
                <span className="sr-only">搜索避坑内容</span>
                <IconSearch
                  className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-atp-text-tertiary"
                  aria-hidden="true"
                  stroke={1.8}
                />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="min-h-11 w-full rounded-atp-pill border border-[var(--atp-border-1)] bg-white pl-10 pr-4 text-base outline-none focus:border-atp-accent"
                  placeholder="今天想避什么坑？试试 gift card / 押金"
                />
              </label>
              <Link
                href="/scam-files"
                className="hidden min-h-11 items-center justify-center gap-2 rounded-atp-pill bg-atp-accent px-5 text-sm font-medium text-white sm:inline-flex"
              >
                档案库
                <IconChevronRight className="size-4" aria-hidden="true" stroke={1.8} />
              </Link>
            </div>
          </header>

          <div className="space-y-4 px-4 py-4 lg:px-0">
            <section className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-xs text-atp-text-tertiary">For {selectedRegion.labelZh}</div>
                <h1 className="truncate text-2xl font-medium">今天先刷这些坑</h1>
              </div>
              <div className="inline-flex items-center gap-1 rounded-atp-pill bg-white px-3 py-2 text-sm text-atp-text-secondary">
                <IconFlame className="size-4 text-atp-accent" aria-hidden="true" stroke={1.8} />
                {filteredItems.length} 条
              </div>
            </section>

            <section className="flex max-w-full gap-2 overflow-x-auto pb-1">
              {[allCategory, ...categories].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`min-h-10 shrink-0 rounded-atp-pill border px-4 text-sm transition ${
                    category === item
                      ? 'border-atp-accent bg-atp-accent text-white'
                      : 'border-[var(--atp-border-1)] bg-white text-atp-text-secondary'
                  }`}
                >
                  {item}
                </button>
              ))}
            </section>

            {featuredItem ? <FeaturedFeedCard item={featuredItem} /> : null}

            <section className="overflow-hidden rounded-atp-xl border border-[rgba(255,78,106,0.18)] bg-white">
              <ATPEmergencyBanner
                trigger="wire_transfer"
                steps={emergencySteps}
                ctaHref="/articles/rental-deposit-before-transfer"
              />
            </section>

            {feedItems.length > 0 ? (
              <section className="grid min-w-0 gap-4 md:grid-cols-2">
                {feedItems.map((item) => (
                  <FeedCard key={item.slug} item={item} />
                ))}
              </section>
            ) : null}

            {filteredItems.length === 0 ? (
              <section className="rounded-atp-xl border border-[var(--atp-border-1)] bg-white p-6 text-sm leading-6 text-atp-text-secondary">
                暂时没有匹配内容。可以换一个关键词、地区或分类。
              </section>
            ) : null}
          </div>
        </section>

        <aside className="hidden min-w-0 space-y-4 py-4 lg:block">
          <TrendPanel selectedRegion={selectedRegion.labelZh} hotItems={hotItems} />
        </aside>
      </div>

      <MobileTabs />
    </main>
  );
}

function DesktopNav() {
  return (
    <aside className="sticky top-0 hidden h-screen min-w-0 border-r border-[var(--atp-border-1)] py-6 pr-4 lg:block">
      <Link href="/" className="flex items-center gap-2.5">
        <ATPLogoMark size={40} />
        <div className="leading-tight">
          <div className="text-[22px] font-medium tracking-wide">避坑指南</div>
          <div className="text-[10px] uppercase tracking-[0.08em] text-atp-text-tertiary">
            North American Chinese
          </div>
        </div>
      </Link>
      <nav className="mt-8 space-y-2">
        <DesktopNavItem href="/" icon={<IconHome />} label="首页" active />
        <DesktopNavItem href="/scam-files" icon={<IconArchive />} label="档案" />
        <DesktopNavItem href="/topics/租房" icon={<IconCompass />} label="发现" />
        <DesktopNavItem href="#" icon={<IconBellRinging />} label="消息" disabled />
        <DesktopNavItem href="#" icon={<IconUser />} label="我的" disabled />
      </nav>
      <div className="mt-8 rounded-atp-xl border border-atp-premium-border bg-atp-premium-bg p-4 text-sm leading-6 text-atp-text-secondary">
        <div className="mb-1 flex items-center gap-2 font-medium text-atp-text-primary">
          <IconShieldCheck className="size-5 text-atp-premium" aria-hidden="true" stroke={1.8} />
          MVP 范围
        </div>
        先开放内容流、搜索、地区筛选和详情页。发布、消息、会员下一阶段接入。
      </div>
    </aside>
  );
}

function DesktopNavItem({
  href,
  icon,
  label,
  active,
  disabled,
}: {
  href: string;
  icon: React.ReactElement;
  label: string;
  active?: boolean;
  disabled?: boolean;
}) {
  const content = (
    <>
      <span
        className={`flex size-9 items-center justify-center rounded-atp-md ${
          active ? 'bg-white/15' : 'bg-white text-atp-text-secondary'
        }`}
      >
        {cloneIcon(icon)}
      </span>
      <span>{label}</span>
      {disabled ? <span className="ml-auto text-xs text-atp-text-tertiary">即将开放</span> : null}
    </>
  );

  if (disabled) {
    return (
      <div className="flex min-h-12 items-center gap-3 rounded-atp-lg px-2 text-sm text-atp-text-tertiary">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={`flex min-h-12 items-center gap-3 rounded-atp-lg px-2 text-sm ${
        active
          ? 'bg-atp-accent text-white'
          : 'text-atp-text-secondary hover:bg-white'
      }`}
    >
      {content}
    </Link>
  );
}

function FeaturedFeedCard({ item }: { item: ContentSeed }) {
  return (
    <Link
      href={`/articles/${item.slug}`}
      className="block overflow-hidden rounded-atp-2xl bg-atp-text-primary text-white"
    >
      <div className={`relative min-h-[360px] p-5 ${coverToneClass(item.coverTone)}`}>
        <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-atp-pill bg-black/30 px-3 py-1 text-xs text-white">
          {item.displayFormat === 'clip' ? (
            <IconPlayerPlay className="size-4" aria-hidden="true" stroke={1.8} />
          ) : (
            <IconLayoutGrid className="size-4" aria-hidden="true" stroke={1.8} />
          )}
          {item.durationLabel ?? formatLabel(item.displayFormat)}
        </div>
        <div className="flex h-full min-h-[320px] flex-col justify-between">
          <div className="max-w-[240px] rounded-atp-lg bg-white/15 p-3 backdrop-blur">
            <div className="text-xs opacity-80">
              {item.category} · {riskLabel(item.riskLevel)}
            </div>
            <div className="mt-1 text-lg font-medium leading-tight">{item.hook}</div>
          </div>
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm opacity-90">
              <span className="flex size-8 items-center justify-center rounded-full bg-white/22">
                {item.authorName.slice(0, 1)}
              </span>
              <span>{item.authorName}</span>
            </div>
            <h2 className="text-2xl font-medium leading-tight">{item.title}</h2>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/82">{item.summary}</p>
            <StatsBar item={item} light />
          </div>
        </div>
      </div>
    </Link>
  );
}

function FeedCard({ item }: { item: ContentSeed }) {
  return (
    <Link
      href={`/articles/${item.slug}`}
      className="block min-w-0 overflow-hidden rounded-atp-xl border border-[var(--atp-border-1)] bg-white"
    >
      <div className={`relative min-h-[190px] p-4 text-white ${coverToneClass(item.coverTone)}`}>
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-atp-pill bg-white/22 px-3 py-1 text-xs">
            {formatLabel(item.displayFormat)}
          </span>
          {item.durationLabel ? (
            <span className="inline-flex items-center gap-1 rounded-atp-pill bg-black/30 px-2.5 py-1 text-xs">
              <IconPlayerPlay className="size-3.5" aria-hidden="true" stroke={1.8} />
              {item.durationLabel}
            </span>
          ) : null}
        </div>
        <div className="mt-10 max-w-[230px]">
          <div className="text-sm opacity-82">{item.authorName}</div>
          <div className="mt-2 text-xl font-medium leading-tight">{item.hook}</div>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-atp-text-tertiary">
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
        <p className="mt-1 line-clamp-2 text-sm leading-6 text-atp-text-secondary">{item.summary}</p>
        <StatsBar item={item} />
      </div>
    </Link>
  );
}

function StatsBar({ item, light }: { item: ContentSeed; light?: boolean }) {
  const className = light ? 'text-white/86' : 'text-atp-text-tertiary';

  return (
    <div className={`mt-4 flex items-center gap-4 text-xs ${className}`}>
      <span className="inline-flex items-center gap-1">
        <IconHeart
          className={`size-4 ${light ? '' : 'text-atp-accent'}`}
          aria-hidden="true"
          stroke={1.8}
        />
        {compactNumber(item.stats.likes)}
      </span>
      <span className="inline-flex items-center gap-1">
        <IconBookmark className="size-4" aria-hidden="true" stroke={1.8} />
        {compactNumber(item.stats.saves)}
      </span>
      <span className="inline-flex items-center gap-1">
        <IconMessageCircle className="size-4" aria-hidden="true" stroke={1.8} />
        {compactNumber(item.stats.comments)}
      </span>
    </div>
  );
}

function TrendPanel({
  selectedRegion,
  hotItems,
}: {
  selectedRegion: string;
  hotItems: ContentSeed[];
}) {
  return (
    <>
      <section className="rounded-atp-xl border border-[var(--atp-border-1)] bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-medium">本地热榜</h2>
          <span className="text-xs text-atp-text-tertiary">{selectedRegion}</span>
        </div>
        <div className="space-y-3">
          {hotItems.map((item, index) => (
            <Link
              key={item.slug}
              href={`/articles/${item.slug}`}
              className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-atp-lg bg-atp-bg-soft p-3"
            >
              <span className="flex size-7 items-center justify-center rounded-atp-md bg-white text-sm font-medium text-atp-accent">
                {index + 1}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">{item.hook}</span>
                <span className="mt-1 block text-xs text-atp-text-tertiary">
                  {compactNumber(item.stats.saves)} 人收藏
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-atp-xl border border-[var(--atp-border-1)] bg-white p-4">
        <h2 className="mb-3 font-medium">热门专题</h2>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((item) => (
            <Link
              key={item}
              href={`/topics/${encodeURIComponent(item)}`}
              className="flex min-h-11 items-center justify-between rounded-atp-lg bg-atp-bg-soft px-3 text-sm"
            >
              {item}
              <IconChevronRight
                className="size-4 text-atp-text-tertiary"
                aria-hidden="true"
                stroke={1.8}
              />
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-atp-xl border border-atp-premium-border bg-atp-premium-bg p-4">
        <h2 className="mb-3 font-medium">即将开放</h2>
        <div className="space-y-2 text-sm text-atp-text-secondary">
          {['发布避坑笔记', '消息提醒', '我的收藏'].map((label) => (
            <div
              key={label}
              className="flex min-h-10 items-center justify-between rounded-atp-lg bg-white/60 px-3"
            >
              <span>{label}</span>
              <span className="inline-flex items-center gap-1 text-xs text-atp-text-tertiary">
                <IconClock className="size-3.5" aria-hidden="true" stroke={1.8} />
                即将开放
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function MobileTabs() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--atp-border-1)] bg-white/95 px-3 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 backdrop-blur lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5 items-end gap-1">
        <MobileTab href="/" icon={<IconHome />} label="首页" active />
        <MobileTab href="/topics/租房" icon={<IconCompass />} label="发现" />
        <MobileTab href="#" icon={<IconPlus />} label="发布" primary disabled />
        <MobileTab href="#" icon={<IconMessageCircle />} label="消息" disabled />
        <MobileTab href="#" icon={<IconUser />} label="我的" disabled />
      </div>
    </nav>
  );
}

function MobileTab({
  href,
  icon,
  label,
  active,
  primary,
  disabled,
}: {
  href: string;
  icon: React.ReactElement;
  label: string;
  active?: boolean;
  primary?: boolean;
  disabled?: boolean;
}) {
  const inner = (
    <>
      <span
        className={`flex items-center justify-center ${
          primary
            ? 'mx-auto -mt-3 size-11 rounded-atp-lg bg-atp-accent text-white'
            : `mx-auto size-6 ${active ? 'text-atp-accent' : ''}`
        }`}
      >
        {cloneIcon(icon, primary ? 'size-6' : 'size-5')}
      </span>
      {!primary ? (
        <span
          className={`mt-1 block text-center text-[11px] ${
            active ? 'font-medium text-atp-accent' : 'text-atp-text-tertiary'
          }`}
        >
          {label}
        </span>
      ) : (
        <span className="mt-1 block h-[11px]" aria-hidden="true" />
      )}
    </>
  );

  if (disabled) {
    return (
      <div className="min-w-0" aria-disabled="true">
        {inner}
      </div>
    );
  }

  return (
    <Link href={href} className="min-w-0">
      {inner}
    </Link>
  );
}

function RiskBadge({ level }: { level: ContentSeed['riskLevel'] }) {
  const label = riskLabel(level);
  const className =
    level === 'high'
      ? 'bg-atp-accent-bg text-atp-accent-dark'
      : level === 'medium'
        ? 'bg-atp-warning-bg text-atp-text-primary'
        : 'bg-atp-success-bg text-atp-success';

  return <span className={`rounded-atp-pill px-2.5 py-0.5 font-medium ${className}`}>{label}</span>;
}

function riskLabel(level: ContentSeed['riskLevel']) {
  if (level === 'high') return '高风险';
  if (level === 'medium') return '中风险';
  return '低风险';
}

function formatLabel(format: ContentSeed['displayFormat']) {
  if (format === 'clip') return '短避坑';
  if (format === 'file') return '档案';
  return '笔记';
}

function compactNumber(value: number) {
  if (value >= 10000) return `${(value / 10000).toFixed(1)}万`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return String(value);
}

// 改：从纯色块换成同色系渐变，跟设计稿对齐
function coverToneClass(tone: ContentSeed['coverTone']) {
  const classes: Record<ContentSeed['coverTone'], string> = {
    rose: 'bg-gradient-to-br from-[#FF6E83] to-[#C8392F]',
    navy: 'bg-gradient-to-br from-[#1A2B4A] to-[#0C1A2E]',
    gold: 'bg-gradient-to-br from-[#C9882A] to-[#854F0B]',
    green: 'bg-gradient-to-br from-[#0F6E56] to-[#04342C]',
    ink: 'bg-gradient-to-br from-[#2A2A2A] to-[#0A0A0A]',
    sky: 'bg-gradient-to-br from-[#2F6F9F] to-[#0C447C]',
  };

  return classes[tone];
}

function cloneIcon(icon: React.ReactElement, className = 'size-5') {
  return (
    <span className={className} aria-hidden="true">
      {icon}
    </span>
  );
}
