import type { Metadata } from 'next';
import Link from 'next/link';
import { IconArrowLeft, IconArchive, IconChevronRight } from '@tabler/icons-react';
import { ATPFontSizeControl } from '@/components/atp/FontSizeControl';
import { filterContent } from '@/lib/content/seed';

export const metadata: Metadata = {
  title: '避坑档案',
  description: '北美华人常见骗局档案与本地风险提醒。',
};

export default function ScamFilesPage() {
  const files = filterContent({ type: 'scam_file' });

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
            <IconArchive className="size-5 text-atp-accent" aria-hidden="true" stroke={1.8} />
            Scam files
          </div>
          <h1 className="text-3xl font-medium">避坑档案</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-atp-text-secondary">
            把高频骗局整理成可搜索、可转发、可持续更新的档案。第一版先开放核心样例,后续接入审核和 UGC。
          </p>
        </div>

        <div className="overflow-hidden rounded-atp-xl border border-[var(--atp-border-2)] bg-atp-bg-card">
          {files.map((item) => (
            <Link key={item.slug} href={`/articles/${item.slug}`} className="grid gap-2 border-b border-[var(--atp-border-1)] p-4 last:border-b-0 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <div className="mb-2 text-xs text-atp-text-tertiary">{item.category} · {item.publishedAt}</div>
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
