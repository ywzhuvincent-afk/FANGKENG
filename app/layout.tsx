import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '避坑指南 · Avoid The Pit',
    template: '%s · 避坑指南',
  },
  description: '北美华人最懂你身边事 · 防骗 · 民生政策 · 本地警报',
  metadataBase: new URL('https://avoidthepit.com'),
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: '避坑指南',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" data-font-size="standard" data-ui-mode="default">
      <body>{children}</body>
    </html>
  );
}
