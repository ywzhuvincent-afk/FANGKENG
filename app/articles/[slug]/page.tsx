import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { IconArrowLeft, IconLock, IconMapPin, IconShieldCheck } from '@tabler/icons-react';
import { ATPEmergencyBanner } from '@/components/atp/EmergencyBanner';
import { ATPFontSizeControl } from '@/components/atp/FontSizeControl';
import { contentItems, getContentBySlug, getRelatedContent, regions } from '@/lib/content/seed';

interface ArticlePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return contentItems.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: ArticlePageProps): Metadata {
  const item = getContentBySlug(params.slug);
  if (!item) return {};

  return {
    title: item.title,
    description: item.summary,
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const item = getContentBySlug(params.slug);
  if (!item) notFound();

  const related = getRelatedContent(item);
  const regionLabels = item.regionCodes
    .map((code) => regions.find((region) => region.code === code)?.labelZh ?? code)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-atp-bg-page px-4 py-4 text-atp-text-primary sm:px-6">
      <article className="mx-auto max-w-3xl">
        <header className="mb-5 flex items-center justify-between gap-3">
          <Link href="/" className="inline-flex min-h-10 items-center gap-2 rounded-atp-lg bg-atp-bg-card px-3 text-sm">
            <IconArrowLeft className="size-4" aria-hidden="true" stroke={1.8} />
            返回首页
          </Link>
          <ATPFontSizeControl />
        </header>

        {item.isEmergency ? (
          <div className="mb-5 overflow-hidden rounded-atp-xl border border-[rgba(255,44,85,0.18)]">
            <ATPEmergencyBanner
              trigger={item.category === '报税' ? 'cra_call' : 'wire_transfer'}
              steps={['先暂停当前操作', '保留聊天、电话、付款和链接记录', '从官方渠道二次确认']}
            />
          </div>
        ) : null}

        <section className="rounded-atp-xl border border-[var(--atp-border-2)] bg-atp-bg-card p-5 sm:p-7">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-atp-text-tertiary">
            <span className="rounded-atp-sm bg-atp-bg-soft px-2 py-1">{item.category}</span>
            <span className="rounded-atp-sm bg-atp-accent-bg px-2 py-1 text-atp-accent-dark">{riskLabel(item.riskLevel)}</span>
            <span>{item.publishedAt}</span>
          </div>
          <h1 className="text-3xl font-medium leading-tight sm:text-4xl">{item.title}</h1>
          <p className="mt-4 text-base leading-8 text-atp-text-secondary">{item.summary}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {regionLabels.map((label) => (
              <span key={label} className="inline-flex items-center gap-1 rounded-atp-pill bg-atp-premium-bg px-3 py-1 text-xs text-atp-text-secondary">
                <IconMapPin className="size-3.5 text-atp-premium" aria-hidden="true" stroke={1.8} />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-7 space-y-5 text-base leading-8">
            {item.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {item.isPremiumPreview ? (
            <div className="mt-7 rounded-atp-lg border border-atp-premium-border bg-atp-premium-bg p-4">
              <div className="mb-1 flex items-center gap-2 font-medium">
                <IconLock className="size-5 text-atp-premium" aria-hidden="true" stroke={1.8} />
                完整清单即将开放
              </div>
              <p className="text-sm leading-6 text-atp-text-secondary">
                MVP 预览版先开放摘要和关键检查点。会员、单篇购买和家庭计划会在支付系统接入后开放。
              </p>
            </div>
          ) : null}
        </section>

        <section className="mt-5 rounded-atp-xl border border-[var(--atp-border-2)] bg-atp-bg-card p-5">
          <div className="mb-3 flex items-center gap-2 font-medium">
            <IconShieldCheck className="size-5 text-atp-success" aria-hidden="true" stroke={1.8} />
            相关内容
          </div>
          <div className="grid gap-2">
            {related.map((relatedItem) => (
              <Link key={relatedItem.slug} href={`/articles/${relatedItem.slug}`} className="rounded-atp-lg bg-atp-bg-soft p-3 text-sm">
                {relatedItem.title}
              </Link>
            ))}
            {related.length === 0 ? <p className="text-sm text-atp-text-secondary">暂无同类内容。</p> : null}
          </div>
        </section>
      </article>
    </main>
  );
}

function riskLabel(level: string) {
  if (level === 'high') return '高风险';
  if (level === 'medium') return '中风险';
  return '低风险';
}
