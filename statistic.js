import {articles} from "./articles.js";

export function updateStatistic() {
    const positiveCount = articles.filter(article => article.sentiment === 'positive').length;
    const negativeCount = articles.filter(article => article.sentiment === 'negative').length;

    const articlesStatistic = document.getElementById('articles-statistic');
    articlesStatistic.innerHTML = `
        <p>Позитивных публикаций – ${positiveCount}</p>
        <p>Негативных публикаций – ${negativeCount}</p>
    `;
}