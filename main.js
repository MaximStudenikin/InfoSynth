import { updateArticleList as updateArticleListFromArticles, articles, saveArticles, addArticle, deleteArticle, clearText, updateArticleSentiment, editArticle, updateMostViewed } from "./articles.js";
import { createAddArticleModal, createAddMostViewedPostModal, createEditArticleModal } from "./modal.js";
import { handleDragOver, handleDrop, handleDragStart } from "./drag-and-drop.js";
import { formatDate, formatViews, getSocialNetworkName, findAddresses } from "./utils.js";
import {filterArticles} from "./filter.js";


const articleList = document.getElementById("article-list");
 const positiveList = document.getElementById("positive-list");
    const negativeList = document.getElementById("negative-list");
const addArticleBtn = document.getElementById("add-article-btn");
const addMostViewedPostBtn = document.getElementById("add-most-viewed-post-btn");
const clearDataBtn = document.getElementById("clear-data-btn");
const generateWordBtn = document.getElementById("generate-word-btn");
const updateHeaderBtn = document.getElementById("update-header-btn");
const documentTitle = document.getElementById("document-title");
const mostViewedContent = document.getElementById("most-viewed-content");
const articlesStatistic = document.getElementById('articles-statistic');
const searchInput = document.getElementById('search-input');
const filterArticlesSelect = document.getElementById('filter-articles');


articleList.addEventListener("dragover", handleDragOver);
articleList.addEventListener("drop", handleDrop);
positiveList.addEventListener("dragover", handleDragOver);
positiveList.addEventListener("drop", handleDrop);
negativeList.addEventListener("dragover", handleDragOver);
negativeList.addEventListener("drop", handleDrop);
searchInput.addEventListener('input', filterArticles);
filterArticlesSelect.addEventListener('change', filterArticles);

addArticleBtn.addEventListener("click", createAddArticleModal);
addMostViewedPostBtn.addEventListener("click", createAddMostViewedPostModal);
clearDataBtn.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});

function updateHeader() {
    const startDateInput = document.getElementById("start-date");
    const endDateInput = document.getElementById("end-date");
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    let title = localStorage.getItem('documentTitle') || `Аналитическая справка по публикациям в СМИ`;
    if (startDate && endDate) {
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);
        title = `Аналитическая справка по публикациям в СМИ за период с ${formattedStartDate} по ${formattedEndDate}`;
    }
    documentTitle.textContent = title;
    localStorage.setItem('documentTitle', title);
}

document.addEventListener('DOMContentLoaded', () => {
    updateHeader();
});

updateHeaderBtn.addEventListener("click", updateHeader);

function updateStatisticDisplay() {
    const positiveCount = articles.filter(article => article.sentiment === 'positive').length;
    const negativeCount = articles.filter(article => article.sentiment === 'negative').length;
    articlesStatistic.innerHTML = `
        <p>Позитивных публикаций – ${positiveCount}</p>
        <p>Негативных публикаций – ${negativeCount}</p>
    `;
    localStorage.setItem('positiveCount', positiveCount);
    localStorage.setItem('negativeCount', negativeCount);
}

document.addEventListener('DOMContentLoaded', () => {
  const positiveCount = parseInt(localStorage.getItem('positiveCount')) || 0;
  const negativeCount = parseInt(localStorage.getItem('negativeCount')) || 0;
  articlesStatistic.innerHTML = `
        <p>Позитивных публикаций – ${positiveCount}</p>
        <p>Негативных публикаций – ${negativeCount}</p>
    `;
});


function updateArticleList() {
    updateArticleListFromArticles();
    updateStatisticDisplay();
}

generateWordBtn.style.display = "none";

updateArticleList();
//  Убираем вызов updateMostViewed()