import {articles} from "./articles.js";

export function updateStatistic() {
    const positiveCount = document.querySelector('#articles-statistic > p:first-child');
    const negativeCount = document.querySelector('#articles-statistic > p:last-child');
    const positiveArticles = articles.filter(article => article.sentiment === 'positive').length;
    const negativeArticles = articles.filter(article => article.sentiment === 'negative').length;
    positiveCount.textContent = `Позитивных публикаций – ${positiveArticles}`;
    negativeCount.textContent = `Негативных публикаций – ${negativeArticles}`;
}