export default function HomePage() {
  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl mb-2">避坑指南 · Avoid The Pit</h1>
      <p className="text-atp-text-secondary mb-6">
        脚手架已就绪。这是首页占位,按 spec §5 实现真实首页。
      </p>

      <section className="space-y-4">
        <div className="rounded-atp-lg bg-atp-bg-card border border-[var(--atp-border-1)] p-4">
          <h2 className="text-lg mb-2">⚙️ 开发者首次启动检查</h2>
          <ul className="text-sm text-atp-text-secondary space-y-1 list-disc list-inside">
            <li>npm install 已跑过吗?</li>
            <li>.env.local 已填好吗?(参考 .env.example)</li>
            <li>PostgreSQL 已启动?npx prisma migrate dev</li>
            <li>读完 docs/avoidthepit_technical_spec_v1.1.md 了吗?</li>
            <li>读完 design-references/ 里的 17 个 mockup 了吗?</li>
          </ul>
        </div>

        <div className="rounded-atp-lg bg-atp-premium-bg border border-atp-premium-border p-4">
          <h2 className="text-lg mb-2">📍 第一周路径</h2>
          <ol className="text-sm text-atp-text-primary space-y-1 list-decimal list-inside">
            <li>实现地区选择器组件(参考 design-references/mobile/region-picker.html)</li>
            <li>接通 IP 地理(Cloudflare CF-IPCity header)</li>
            <li>实现 ATPCascadeFeed 基础版(spec §7.3 算法)</li>
            <li>实现微信 OAuth(spec §11.2)</li>
            <li>实现 Stripe Checkout(spec §8.3 启用 zh locale)</li>
          </ol>
        </div>

        <div className="rounded-atp-lg bg-atp-accent-bg border border-[var(--atp-accent)] p-4">
          <h2 className="text-lg mb-2 text-atp-accent-dark">⚠️ 上线前 Critical 6 项</h2>
          <ul className="text-sm text-atp-text-primary space-y-1 list-disc list-inside">
            <li>微信 OAuth + 内置浏览器适配</li>
            <li>货币本地化(CAD/USD)+ Stripe Tax</li>
            <li>Stripe Checkout zh locale + 多种支付方式</li>
            <li>UGC dispute resolution 流程</li>
            <li>匿名用户身份保护承诺(ToS + 代码)</li>
            <li>MVP 不上私信(已禁用)</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
