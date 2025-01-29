import { articles } from "./modules.js";

export function renderStatistic() {
    const statisticContainer = document.getElementById("articles-statistic");
    const mostViewedContainer = document.getElementById("most-viewed");
     if (!mostViewedContainer) return;
    if (!statisticContainer) return;

    const positiveArticles = articles.filter(article => article.sentiment === 'positive').length;
    const negativeArticles = articles.filter(article => article.sentiment === 'negative').length;

    document.getElementById('positive-count').textContent = positiveArticles;
    document.getElementById('negative-count').textContent = negativeArticles;

    const mostViewed = articles.reduce((max, article) => {
        if (article.type === 'social' && (!max || parseInt(article.views) > parseInt(max.views))) {
            return article;
        }
        return max;
    }, null);

   if (mostViewed) {
     mostViewedContainer.innerHTML = `
        <h3>Самый просматриваемый пост:</h3>
         <p><strong>Заголовок:</strong> ${mostViewed.title}</p>
       <p><strong>Источник:</strong> ${mostViewed.source}</p>
       ${mostViewed.social !== 'none' ? `<p><strong>Социальная сеть:</strong> ${mostViewed.social}</p>` : ''}
       ${mostViewed.views ? `<p><strong>Просмотры:</strong> ${mostViewed.views}</p>` : ''}
         `;
       } else {
       mostViewedContainer.innerHTML = `<p>Нет постов из социальных сетей</p>`
   }
}