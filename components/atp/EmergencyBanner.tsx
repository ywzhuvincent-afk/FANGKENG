import { IconAlertTriangle, IconChevronRight } from '@tabler/icons-react';

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
    <div className="border-y border-[rgba(255,44,85,0.18)] bg-atp-accent-bg px-4 py-3">
      <div className="flex gap-3">
        <IconAlertTriangle className="mt-0.5 size-5 shrink-0 text-atp-accent-dark" aria-hidden="true" stroke={1.8} />
        <div className="flex-1">
          <div className="font-medium text-atp-accent-dark mb-1">
            紧急提醒: {TRIGGER_TITLES[trigger]}
          </div>
          <ol className="text-sm text-atp-text-primary space-y-0.5 list-decimal list-inside leading-relaxed">
            {steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          <a
            href={ctaHref}
            className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-atp-accent underline"
          >
            {ctaLabel}
            <IconChevronRight className="size-4" aria-hidden="true" stroke={1.8} />
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
