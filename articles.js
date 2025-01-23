import { formatViews, formatDate, getSocialNetworkName } from "./utils.js";
import {filterArticles} from "./filter.js";
import {updateStatistic} from "./statistic.js"
import { removeEmoji } from "./utils.js";
import { createEditArticleModal } from "./modal.js";


export let articles = JSON.parse(localStorage.getItem('articles') || '[]');


export function updateArticleList() {
  const positiveList = document.getElementById("positive-list");
  const negativeList = document.getElementById("negative-list");
  positiveList.innerHTML = "";
  negativeList.innerHTML = "";


  function createArticleItem(article, index) {
    const li = document.createElement("li");
    li.classList.add('article-item');
    li.dataset.id = article.id;
    let sourceLine = "";
    if (article.type === "social") {
        const socialName = getSocialNetworkName(article.url);
        sourceLine += `${socialName ? `${socialName} - ` : ""}`;
    }
    if(article.source) {
        sourceLine += `${article.source}`;
    }
    if (article.type === "social" && article.views) {
        sourceLine += ` (${formatViews(article.views)})`;
    }
    if (sourceLine) {
        li.innerHTML += `<h1 id="edition">${index + 1}) ${sourceLine}</h1>`;
    }
    if (article.date) {
        li.innerHTML += `<p id="date">${formatDate(article.date)}</p>`;
    }
    if (article.title) {
        li.innerHTML += `<h3 id="title">${article.title}</h3>`;
    }
    if (article.text) {
        li.innerHTML += `<p id="text">${article.text.substring(0, 100)}...</p>`;
    }
    if (article.addresses && article.addresses.length > 0 && !article.addresses.every(addr => !addr || addr.trim().toLowerCase() === "нет")) {
        li.innerHTML += `<p id="adress">Адрес: ${article.addresses
            .filter((addr) => addr && addr.trim().toLowerCase() !== "нет")
            .join(", ")}</p>`;
    }
    if(article.startTime) {
      li.innerHTML += `<p id="start_time">Начало с ${article.startTime}</p>`;
    }
    if (article.speaker && article.speaker.length > 0 && !article.speaker.every(speaker => !speaker || speaker.trim().toLowerCase() === "нет")) {
        li.innerHTML += `<p id="speaker">Спикер: ${article.speaker
            .filter((speaker) => speaker && speaker.trim().toLowerCase() !== "нет")
            .join("<br>")}</p>`;
    }
    if (article.url) {
        li.innerHTML += `<p><a id="ref" href="${article.url}" target="_blank">${article.url}</a></p>`;
    }
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteBtn.addEventListener('click', () => deleteArticle(article.id));
    li.appendChild(deleteBtn);
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.addEventListener('click', () => editArticle(article.id));
    li.appendChild(editBtn);
    return li;
  }

  const positiveArticles = articles.filter(article => article.sentiment === "positive");
  const negativeArticles = articles.filter(article => article.sentiment === "negative");

  function sortArticles(articles) {
    return articles.sort((a, b) => {
        const typeOrder = ["video", "news", "social"];
        const typeA = typeOrder.indexOf(a.type);
        const typeB = typeOrder.indexOf(b.type);
        return typeA - typeB;
    });
  }

  sortArticles(positiveArticles).forEach((article, index) => positiveList.appendChild(createArticleItem(article, index)));
  sortArticles(negativeArticles).forEach((article, index) => negativeList.appendChild(createArticleItem(article, index)));

}

export function saveArticles() {
    localStorage.setItem('articles', JSON.stringify(articles));
}

export function addArticle(article) {
    articles.push(article);
    saveArticles();
    updateArticleList();
    updateStatistic();
    updateMostViewed();
    filterArticles();
}

export function deleteArticle(id) {
    articles = articles.filter(article => article.id !== id);
    saveArticles();
    updateArticleList();
    updateStatistic();
    updateMostViewed();
    filterArticles();
}

export function clearText(text) {
  if (!text) return '';

  let cleanedText = removeEmoji(text);
    cleanedText = cleanedText.replace(/\s+/g, ' ').trim();

  return cleanedText;
}

export function updateArticleSentiment(id, sentiment) {
      const articleIndex = articles.findIndex(article => article.id === id);
    if (articleIndex !== -1) {
        articles[articleIndex].sentiment = sentiment;
        saveArticles();
        updateArticleList();
    }
}
export function editArticle(id) {
    createEditArticleModal(id);
}
export function updateArticle(updatedArticle) {
    const index = articles.findIndex(article => article.id === updatedArticle.id);
    if (index !== -1) {
        articles[index] = updatedArticle;
        saveArticles();
        updateArticleList();
        updateStatistic();
        updateMostViewed();
        filterArticles();
    }
}

export function updateMostViewed() {
    const mostViewedContent = document.getElementById("most-viewed-content");
    if (articles.length === 0) {
        mostViewedContent.innerHTML = "<p>Нет данных</p>";
        return;
    }

    let mostViewed = articles.reduce((prev, current) => {
        const prevViews = prev.views ? parseInt(prev.views) : 0;
        const currentViews = current.views ? parseInt(current.views) : 0;
        if (current.type === 'social' && currentViews > prevViews) {
            return current;
        }
        return prev;
    }, articles[0]);
    const index = articles.findIndex(el => el === mostViewed)
    if (!mostViewed || (!mostViewed.views && mostViewed.type !== 'social')) {
        mostViewedContent.innerHTML = "<p>Нет данных</p>";
        return;
    }
    let mostViewedHTML = "";
    let sourceLine = "";
    if (mostViewed.type === "social") {
        const socialName = getSocialNetworkName(mostViewed.url);
        sourceLine += `${socialName ? `${socialName} - ` : ""}`;
    }
    if (mostViewed.source) {
        sourceLine += `${mostViewed.source}`;
    }
    if (mostViewed.type === "social" && mostViewed.views) {
        sourceLine += ` (${formatViews(mostViewed.views)})`;
    }
    if (sourceLine) {
        mostViewedHTML += `<h1 id="edition">${index + 1}) ${sourceLine}</h1>`;
    }
    if (mostViewed.date) {
        mostViewedHTML += `<p id="date">${formatDate(mostViewed.date)}</p>`;
    }
    if (mostViewed.title) {
        mostViewedHTML += `<h3 id="title">${mostViewed.title}</h3>`;
    }
    if (mostViewed.text) {
        mostViewedHTML += `<p id="text">${mostViewed.text.substring(0, 100)}...</p>`;
    }
    if (mostViewed.addresses && mostViewed.addresses.length > 0 && !mostViewed.addresses.every(addr => !addr || addr.trim().toLowerCase() === "нет")) {
        mostViewedHTML += `<p id="adress">Адрес: ${mostViewed.addresses
            .filter((addr) => addr && addr.trim().toLowerCase() !== "нет")
            .join(", ")}</p>`;
    }
    if (mostViewed.startTime) {
        mostViewedHTML += `<p id="start_time">Начало с ${mostViewed.startTime}</p>`;
    }
    if (mostViewed.speaker && mostViewed.speaker.length > 0 && !mostViewed.speaker.every(speaker => !speaker || speaker.trim().toLowerCase() === "нет")) {
        mostViewedHTML += `<p id="speaker">Спикер: ${mostViewed.speaker
            .filter((speaker) => speaker && speaker.trim().toLowerCase() !== "нет")
            .join("<br>")}</p>`;
    }
    if (mostViewed.url) {
        mostViewedHTML += `<p><a id="ref" href="${mostViewed.url}" target="_blank">${mostViewed.url}</a></p>`;
    }
    mostViewedContent.innerHTML = mostViewedHTML;
}