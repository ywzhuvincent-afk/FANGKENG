/**
 * 微信 OAuth - 按 spec v1.1 §11.2 实现
 *
 * 重要:这是 Critical 6 项之一,MVP 必做
 * 微信内置浏览器和外部浏览器走不同流程
 */

export const WECHAT_OAUTH_BASE = 'https://open.weixin.qq.com/connect';

export function isInsideWeChatBrowser(userAgent: string): boolean {
  return /MicroMessenger/i.test(userAgent);
}

export function buildWeChatAuthUrl(opts: {
  redirectUri: string;
  state: string;
  source: 'wechat_browser' | 'external';
}): string {
  const appId = process.env.WECHAT_APP_ID;
  if (!appId) {
    throw new Error('WECHAT_APP_ID not configured');
  }

  const isInternal = opts.source === 'wechat_browser';

  const params = new URLSearchParams({
    appid: appId,
    redirect_uri: opts.redirectUri,
    response_type: 'code',
    scope: isInternal ? 'snsapi_userinfo' : 'snsapi_login',
    state: opts.state,
  });

  const path = isInternal ? '/oauth2/authorize' : '/qrconnect';
  return `${WECHAT_OAUTH_BASE}${path}?${params.toString()}#wechat_redirect`;
}

export interface WeChatTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  openid: string;
  scope: string;
  unionid?: string;
}

export async function exchangeWeChatCode(
  code: string
): Promise<WeChatTokenResponse> {
  const appId = process.env.WECHAT_APP_ID;
  const appSecret = process.env.WECHAT_APP_SECRET;

  if (!appId || !appSecret) {
    throw new Error('WeChat credentials not configured');
  }

  const url = new URL('https://api.weixin.qq.com/sns/oauth2/access_token');
  url.searchParams.set('appid', appId);
  url.searchParams.set('secret', appSecret);
  url.searchParams.set('code', code);
  url.searchParams.set('grant_type', 'authorization_code');

  const res = await fetch(url, { method: 'GET' });
  const data = await res.json();

  if (data.errcode) {
    throw new Error(`WeChat OAuth error: ${data.errmsg}`);
  }

  return data;
}

export interface WeChatUserInfo {
  openid: string;
  nickname: string;
  sex: number;
  province: string;
  city: string;
  country: string;
  headimgurl: string;
  unionid?: string;
}

export async function fetchWeChatUserInfo(
  accessToken: string,
  openid: string
): Promise<WeChatUserInfo> {
  const url = new URL('https://api.weixin.qq.com/sns/userinfo');
  url.searchParams.set('access_token', accessToken);
  url.searchParams.set('openid', openid);
  url.searchParams.set('lang', 'zh_CN');

  const res = await fetch(url);
  const data = await res.json();

  if (data.errcode) {
    throw new Error(`WeChat user info error: ${data.errmsg}`);
  }

  return data;
}
