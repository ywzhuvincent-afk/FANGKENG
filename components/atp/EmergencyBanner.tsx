/**
 * ATPEmergencyBanner - 应急横条
 * spec v1.1 §3.2 + §8.5
 *
 * 出现位置:搜索结果顶部、文章正文顶部
 * 触发关键词按年龄段差异化(v1.1 §8.5)
 */

interface EmergencyBannerProps {
  trigger:
    | 'wire_transfer'
    | 'irs_call'
    | 'cra_call'
    | 'court_summons'
    | 'lawyer_email'
    | 'health_product_scam'
    | 'fake_relative_call';
  steps: string[];
  ctaLabel?: string;
  ctaHref?: string;
}

export function ATPEmergencyBanner({
  trigger,
  steps,
  ctaLabel = '打开应急指南',
  ctaHref = '#',
}: EmergencyBannerProps) {
  return (
    <div className="bg-atp-accent-bg border-y border-[var(--atp-accent)]/15 px-4 py-3">
      <div className="flex gap-3">
        <i className="ti ti-alert-triangle-filled text-xl text-atp-accent-dark mt-0.5" aria-hidden="true" />
        <div className="flex-1">
          <div className="font-medium text-atp-accent-dark mb-1">
            ⚡ 紧急?{TRIGGER_TITLES[trigger]}
          </div>
          <ol className="text-sm text-atp-text-primary space-y-0.5 list-decimal list-inside leading-relaxed">
            {steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          <a
            href={ctaHref}
            className="inline-block mt-2 text-sm font-medium text-atp-accent underline"
          >
            ⏵ {ctaLabel}
          </a>
        </div>
      </div>
    </div>
  );
}

const TRIGGER_TITLES: Record<EmergencyBannerProps['trigger'], string> = {
  wire_transfer: '正准备汇款,先看 3 件事',
  irs_call: '假冒 IRS 电话?5 秒识别',
  cra_call: '假冒 CRA 电话?5 秒识别',
  court_summons: '收到法院传票?先做这些',
  lawyer_email: '律师邮件真假判断',
  health_product_scam: '保健品骗局识别',
  fake_relative_call: '假冒亲属求救?3 步验证',
};
