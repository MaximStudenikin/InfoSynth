export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export function formatViews(views) {
  const num = parseInt(views, 10);
  if (isNaN(num)) {
    return "0";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  } else {
    return String(num);
  }
}
export function getSocialNetworkName(url) {
  if (url.includes('vk.com')) {
      return 'Вконтакте';
  } else if (url.includes('ok.ru')) {
      return 'Одноклассники';
  } else if (url.includes('t.me')) {
      return 'Telegram';
   } else if (url.includes('youtube.com')) {
      return 'Youtube';
  }
  return null;
}
export function findAddresses(text) {
  const addressRegex = /(?:г\.|город|ул\.|улица)\s[а-яА-ЯёЁ\d\s.,-]+/g;
const addresses = text.match(addressRegex);
return addresses ? addresses.map(addr => addr.trim()) : [];
}

export function clearText(text) {
  if (!text) return '';
  return text.replace(/[\p{Emoji}\s]+/gu, ' ').trim().replace(/\n+/g, '\n');
}

export function removeEmoji(text) {
    if (!text) return '';
    return text.replace(/[\p{Emoji}]/gu, '');
}