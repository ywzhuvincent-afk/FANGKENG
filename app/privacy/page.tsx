export const metadata = {
  title: "Privacy Policy / 隐私政策 - 避坑助手",
};

export default function PrivacyPage() {
  return (
    <main style={{maxWidth: 760, margin: "0 auto", padding: "48px 24px", fontFamily: "system-ui, sans-serif", lineHeight: 1.7, color: "#1A2E4A"}}>
      <h1>Privacy Policy / 隐私政策</h1>
      <p><em>Last updated / 最后更新: June 25, 2026</em></p>

      <h2>1. About / 关于</h2>
      <p>MyFamilyDaily (myfamilydaily.com) and its &quot;避坑助手 / Bikeng Helper&quot; SMS service are operated by Yiwen Zhu as a Sole Proprietorship based in Greater Vancouver, BC, Canada. We help Chinese-speaking families in North America identify scams.</p>

      <h2>2. SMS Service / 短信服务</h2>
      <p><strong>Service number:</strong> +1 (888) 560-3228</p>
      <p>Users opt in by texting the above number. Each inbound SMS is treated as a request for AI fraud analysis. We reply via SMS with a risk assessment.</p>
      <p><strong>Opt out:</strong> Reply STOP, UNSUBSCRIBE, 取消, or 退订 to stop messages immediately. We delete your data within 7 days of opt-out.</p>
      <p><strong>HELP:</strong> Reply HELP or 帮助 for assistance.</p>
      <p><strong>SMS data is never shared with third-party marketers or used for any purpose unrelated to anti-fraud analysis.</strong></p>

      <h2>3. Data Collected / 收集的数据</h2>
      <ul>
        <li>Phone number — to send replies</li>
        <li>SMS content (incl. images) — for AI fraud analysis only</li>
        <li>Usage frequency — for quota management</li>
      </ul>

      <h2>4. How We Use Data / 数据用途</h2>
      <ul>
        <li>Analyze your content with Anthropic Claude AI to detect scams</li>
        <li>Reply with our verdict and recommendations</li>
        <li>Aggregate anonymized fraud trends</li>
      </ul>
      <p>We do NOT store raw SMS content beyond 30 days. We do NOT sell your data. We do NOT send marketing messages.</p>

      <h2>5. Third-Party Services / 第三方服务</h2>
      <ul>
        <li><strong>Twilio</strong> — SMS provider</li>
        <li><strong>Anthropic</strong> — AI analysis</li>
        <li><strong>Supabase</strong> — encrypted database</li>
        <li><strong>Stripe</strong> — paid subscriptions (if applicable)</li>
        <li><strong>Vercel</strong> — hosting</li>
      </ul>

      <h2>6. Your Rights / 你的权利</h2>
      <p>You may request data access, deletion, or opt out at any time. Email <a href="mailto:support@myfamilydaily.com">support@myfamilydaily.com</a> — we respond within 7 days.</p>

      <h2>7. Contact / 联系</h2>
      <p>Operator: Yiwen Zhu<br/>Email: support@myfamilydaily.com<br/>Location: Greater Vancouver, BC, Canada<br/>SMS: +1 (888) 560-3228</p>

      <p style={{marginTop: 48}}><a href="/">← Back to Home / 返回首页</a></p>
    </main>
  );
}
