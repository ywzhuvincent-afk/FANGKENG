import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { IconArrowLeft, IconChevronRight, IconFolders } from '@tabler/icons-react';
import { ATPFontSizeControl } from '@/components/atp/FontSizeControl';
import { categories, filterContent } from '@/lib/content/seed';

interface TopicPageProps {
  params: { category: string };
}

export function generateStaticParams() {
  return categories.map((category) => ({ category }));
}

export function generateMetadata({ params }: TopicPageProps): Metadata {
  const category = decodeURIComponent(params.category);
  if (!categories.includes(category)) return {};
  return {
    title: `${category}专题`,
    description: `避坑指南 ${category} 专题内容。`,
  };
}

export default function TopicPage({ params }: TopicPageProps) {
  const category = decodeURIComponent(params.category);
  if (!categories.includes(category)) notFound();

  const items = filterContent({ category });

  return (
    <main className="min-h-screen bg-atp-bg-page px-4 py-4 text-atp-text-primary sm:px-6">
      <section className="mx-auto max-w-4xl">
        <header className="mb-5 flex items-center justify-between gap-3">
          <Link href="/" className="inline-flex min-h-10 items-center gap-2 rounded-atp-lg bg-atp-bg-card px-3 text-sm">
            <IconArrowLeft className="size-4" aria-hidden="true" stroke={1.8} />
            返回首页
          </Link>
          <ATPFontSizeControl />
        </header>

        <div className="mb-5 rounded-atp-xl border border-[var(--atp-border-2)] bg-atp-bg-card p-5">
          <div className="mb-2 flex items-center gap-2 text-sm text-atp-text-secondary">
            <IconFolders className="size-5 text-atp-trust" aria-hidden="true" stroke={1.8} />
            Topic
          </div>
          <h1 className="text-3xl font-medium">{category}专题</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-atp-text-secondary">
            按北美华人常见生活场景整理的本地化内容。当前为 MVP seed 版本,后续会接入编辑后台和推荐算法。
          </p>
        </div>

        <div className="overflow-hidden rounded-atp-xl border border-[var(--atp-border-2)] bg-atp-bg-card">
          {items.map((item) => (
            <Link key={item.slug} href={`/articles/${item.slug}`} className="grid gap-2 border-b border-[var(--atp-border-1)] p-4 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <div className="mb-2 text-xs text-atp-text-tertiary">{item.type === 'scam_file' ? '骗局档案' : item.type === 'topic' ? '专题' : '文章'} · {item.publishedAt}</div>
                <h2 className="font-medium">{item.title}</h2>
                <p className="mt-1 text-sm leading-6 text-atp-text-secondary">{item.summary}</p>
              </div>
              <IconChevronRight className="hidden size-5 text-atp-text-tertiary sm:block" aria-hidden="true" stroke={1.8} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
