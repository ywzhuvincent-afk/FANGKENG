/**
 * Privacy Policy / 隐私政策
 * 路径: /privacy
 *
 * 关键设计:
 *   - Twilio toll-free verification 必看的几条都明确写出:
 *     · 我们通过 SMS 提供服务(避坑助手)
 *     · 用户如何 opt-in(主动发短信到 +1 888-560-3228)
 *     · 用户如何 opt-out(回复 STOP / 取消)
 *     · 数据如何使用(仅用于反诈分析,不存储原内容)
 *     · 第三方分享:与谁分享、为什么
 *     · 联系方式
 *   - 中英双语,放在同一页面(华人用户和审核员都能看)
 */

export const metadata = {
  title: "隐私政策 Privacy Policy - 避坑助手 | MyFamilyDaily",
  description: "MyFamilyDaily / 避坑助手的隐私政策。我们如何处理你的 SMS、个人信息和服务数据。",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F5F1EA] text-[#1A2E4A] px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">隐私政策 / Privacy Policy</h1>
        <p className="text-sm text-[#1A2E4A]/60 mb-8">
          最后更新 / Last updated: June 25, 2026
        </p>

        {/* ────────── 中文版 ────────── */}
        <section className="bg-[#FFFEFB] rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">🇨🇳 中文版</h2>

          <h3 className="text-xl font-semibold mt-6 mb-2">1. 关于本网站和服务</h3>
          <p className="mb-4">
            MyFamilyDaily(myfamilydaily.com)及其旗下"避坑助手"短信服务,由 Yiwen Zhu 以个人独资形式(Sole Proprietorship)运营,服务对象为北美华人家庭。我们提供反诈骗 AI 助手服务,帮助用户识别可疑短信、电话、邮件、链接和微信消息。
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">2. 我们的 SMS 短信服务</h3>
          <p className="mb-2">
            <strong>服务号码:</strong>+1 (888) 560-3228
          </p>
          <p className="mb-4">
            用户通过发送短信到上述号码主动启用我们的服务(Opt-in)。每次用户发来短信即视为请求 AI 反诈分析,我们使用 AI 模型分析内容并以短信回复风险判断和建议。
          </p>
          <p className="mb-2"><strong>退订方式(Opt-out):</strong></p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>回复 <code className="bg-[#F5F1EA] px-2 py-0.5 rounded">STOP</code>、<code className="bg-[#F5F1EA] px-2 py-0.5 rounded">取消</code>、<code className="bg-[#F5F1EA] px-2 py-0.5 rounded">退订</code> 或 <code className="bg-[#F5F1EA] px-2 py-0.5 rounded">UNSUBSCRIBE</code> 中任一即立即停止接收</li>
            <li>退订后,我们 7 天内永久删除你的相关数据</li>
            <li>可随时回复 <code className="bg-[#F5F1EA] px-2 py-0.5 rounded">HELP</code> 或 <code className="bg-[#F5F1EA] px-2 py-0.5 rounded">帮助</code> 获取协助</li>
          </ul>
          <p className="mb-4">
            <strong>SMS 数据不会分享给任何第三方营销机构</strong>,也不会用于任何与反诈服务无关的目的。
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">3. 我们收集什么信息</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>电话号码</strong>:用于回复你的咨询</li>

