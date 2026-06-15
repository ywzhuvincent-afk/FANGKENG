# Mockup 完整清单

本目录已包含 **1 个完整 HTML mockup** 作为格式示范(`region-picker.html`)。

其余 16 个 mockup 的源码在产品负责人的 chat 历史里(Anthropic Claude conversation),需要导出到本目录。每个对应一次 `visualize:show_widget` tool call,源码在该 call 的 `widget_code` parameter 里。

## 待补齐(按优先级)

### Critical(优先复制)
- [ ] `mobile/home-cascade.html` — 首页省级级联版(widget: `mobile_home_province_cascade_v2_avoidthepit`)
- [ ] `mobile/article-detail.html` — 文章详情地区版(widget: `mobile_article_detail_region_aware_avoidthepit`)
- [ ] `mobile/ugc-scam-report.html` — UGC 上报(widget: `mobile_ugc_scam_report_avoidthepit`)

### High
- [ ] `mobile/paywall.html` — 付费墙
- [ ] `mobile/seo-topic.html` — SEO 专题
- [ ] `mobile/me-profile.html` — 我的+主页
- [ ] `mobile/creator-center.html` — 创作者中心(widget: `mobile_creator_center_avoidthepit`)
- [ ] `mobile/messages.html` — 消息中心(widget: `mobile_message_center_avoidthepit`)
- [ ] `mobile/search-results.html` — 搜索结果(widget: `mobile_search_results_avoidthepit`)
- [ ] `mobile/onboarding-3screens.html` — Onboarding 流程(widget: `mobile_onboarding_flow_avoidthepit`)

### Desktop
- [ ] `desktop/home.html` — 桌面首页
- [ ] `desktop/article-detail.html` — 桌面文章详情
- [ ] `desktop/seo-topic.html` — 桌面 SEO 专题
- [ ] `desktop/creator-analytics.html` — 创作者中心数据视图(widget: `desktop_creator_center_analytics_avoidthepit`)

## 导出步骤

每个 mockup 是 Claude chat 里的一个 widget。导出方式:

1. 在 chat 里找到对应的 widget
2. 右键 → 检查元素 / View Page Source
3. 复制 `<div>` 根元素的完整 outerHTML
4. 包一个 `<!DOCTYPE html><html><head><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.0.0/tabler-icons.min.css"></head><body>` 外层
5. 命名按本清单存到对应位置

或者:**让产品负责人 / 设计师把 mockup 用 Figma 重做一遍**,这是更专业的做法。本目录只是开发参照,不是最终设计资产。
