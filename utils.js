export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export function formatViews(views) {
   if (!views) {
     return '0 просмотров'
  }
  const viewsNumber = parseInt(views, 10);
  if (isNaN(viewsNumber)) {
      return '0 просмотров'
  }
  return `${viewsNumber.toLocaleString()} просмотров`;
}


export function getSocialNetworkName(url) {
  if (!url) return null;

try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;

      if (hostname.includes('vk.com')) {
          return 'Вконтакте';
      } else if (hostname.includes('facebook.com')) {
          return 'Facebook';
      }
      else if (hostname.includes('instagram.com')) {
          return 'Instagram';
      }
        else if (hostname.includes('youtube.com')) {
          return 'Youtube';
      }
     else if (hostname.includes('t.me')) {
          return 'Telegram';
      }
  } catch (e) {
      console.error("Error parsing URL:", e);
       return null;
  }

  return null;
}
export function findAddresses(text) {
 if (!text) {
     return [];
 }
const addressRegex = /(?:[ул\.\s]*[а-яА-ЯёЁ\d\-\s]+)(?:[,\s]*д\.\s*\d+[а-я]?)(?:[,\s]*кв\.\s*\d+)?/g;
 const addresses = text.match(addressRegex) || [];
return addresses.map(addr => addr.trim());
}
export function removeEmoji(text) {
    if (!text) return "";
const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F191}-\u{1F1AA}\u{00A9}\u{00AE}\u{203C}\u{2049}\u{2122}\u{2139}\u{2194}-\u{2199}\u{21A9}-\u{21AA}\u{231A}-\u{231B}\u{2328}\u{23CF}\u{23E9}-\u{23F3}\u{23F8}-\u{23FA}\u{24C2}\u{25AA}-\u{25AB}\u{25B6}\u{25C0}\u{25FB}-\u{25FE}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F171}\u{1F17E}-\u{1F17F}\u{1F18E}\u{3030}\u{303D}\u{3297}\u{3299}\u{1F201}-\u{1F202}\u{1F21A}\u{1F22F}\u{1F232}-\u{1F23A}\u{1F250}-\u{1F251}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F171}\u{1F17E}-\u{1F17F}\u{1F18E}]/ug;

 return text.replace(emojiRegex, '');
}