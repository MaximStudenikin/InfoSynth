import { updateArticleList, articles, saveArticles, addArticle, deleteArticle, clearText, updateArticleSentiment, editArticle, updateMostViewed } from "./articles.js";
import { createAddArticleModal, createAddMostViewedPostModal, createEditArticleModal } from "./modal.js";
import { filterArticles } from "./filter.js";
import { updateStatistic } from "./statistic.js"; // Import from statistic.js


// Получаем элементы DOM
const addArticleBtn = document.getElementById("add-article-btn");
const addMostViewedPostBtn = document.getElementById("add-most-viewed-post-btn");
const clearDataBtn = document.getElementById("clear-data-btn");
const updateHeaderBtn = document.getElementById('update-header-btn');
const generateWordBtn = document.getElementById('generate-word-btn');
const start = document.getElementById('start-date');
const end = document.getElementById('end-date');
const searchInput = document.getElementById('search-input');
const filterArticlesSelect = document.getElementById('filter-articles');

// Добавление обработчиков событий к кнопкам
addArticleBtn.addEventListener("click", createAddArticleModal);
addMostViewedPostBtn.addEventListener("click", createAddMostViewedPostModal);
clearDataBtn.addEventListener("click", () => {
    localStorage.clear();
    articles = [];
    updateArticleList();
    updateStatistic();
    updateMostViewed();
});
updateHeaderBtn.addEventListener("click", updateHeader);
generateWordBtn.addEventListener("click", generateWord);
start.addEventListener('change', () => {
    updateHeader();
});
end.addEventListener('change', () => {
    updateHeader();
});
searchInput.addEventListener('input', filterArticles);
filterArticlesSelect.addEventListener('change', filterArticles);


// Инициализация
updateArticleList();
updateStatistic();
updateMostViewed();
filterArticles();

// Функция обновления заголовка документа
function updateHeader(){
     const startDate = start.value;
    const endDate = end.value;
    const documentTitle = document.getElementById("document-title");
    if (startDate && endDate){
        documentTitle.textContent = `Аналитическая справка по публикациям в СМИ c ${startDate} по ${endDate}`;
    }
}

// Функция генерации документа Word (нужно реализовать отправку на сервер)
async function generateWord() {
    const startDate = start.value;
    const endDate = end.value;
     if (!startDate || !endDate){
        alert('Выберите даты');
        return;
     }
    const response = await fetch(`/generate?start=${startDate}&end=${endDate}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "analytics.docx";
    a.click();
}