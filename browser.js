export function checkBrowser() {
  const isChrome = navigator.userAgent.toLowerCase().includes('chrome');
  const chromeVersion = isChrome ? parseInt(navigator.userAgent.toLowerCase().split('chrome/')[1].split('.')[0]) : 0;
  const minChromeVersion = 100;
  if (!isChrome || chromeVersion < minChromeVersion) {
      alert(`Пожалуйста, используйте OpenAI Chrome версии ${minChromeVersion} или выше.`);
      return;
  }
}