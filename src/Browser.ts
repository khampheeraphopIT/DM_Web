export const isInAppBrowser = () => {
  const ua = navigator.userAgent.toLowerCase();
  return /fb|line|twitter|tiktok|wv/i.test(ua) && !/chrome|safari/i.test(ua);
};
