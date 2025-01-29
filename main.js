import {createAddArticleModal, renderArticles, renderStatistic, filterArticles, articles} from './modules.js';
import './filter.js';

const addArticleBtn = document.getElementById("add-article-btn");
const searchInput = document.getElementById('search-input');
const filterArticlesSelect = document.getElementById('filter-articles');
const documentTitle = document.getElementById('document-title');
const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');
const updateHeaderBtn = document.getElementById('update-header-btn');


function updateDocumentTitle() {
    const startDate = localStorage.getItem('startDate') || '';
    const endDate = localStorage.getItem('endDate') || '';
    let title = 'Аналитическая справка по публикациям в СМИ';
    if (startDate && endDate) {
        title += ` с ${startDate} по ${endDate}`;
    }
    documentTitle.textContent = title;
}

document.addEventListener('DOMContentLoaded', () => {
    //Загрузка данных из localStorage
    const storedStartDate = localStorage.getItem('startDate');
    const storedEndDate = localStorage.getItem('endDate');

    if (storedStartDate) {
        startDateInput.value = storedStartDate;
    }
    if (storedEndDate) {
        endDateInput.value = storedEndDate;
    }

    renderArticles();
    renderStatistic();
    updateDocumentTitle();

    addArticleBtn.addEventListener("click", createAddArticleModal);
    searchInput.addEventListener('input', filterArticles);
    filterArticlesSelect.addEventListener('change', filterArticles);

    updateHeaderBtn.addEventListener('click', () => {
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;
        localStorage.setItem('startDate', startDate);
        localStorage.setItem('endDate', endDate);
        updateDocumentTitle();
    });
});

import("./modules.js").then(modules => {
    modules.addArticle = (newArticle) => {
        modules.addArticle(newArticle)
        updateDocumentTitle();
    }
    modules.updateArticle = (updatedArticle) => {
        modules.updateArticle(updatedArticle)
        updateDocumentTitle();
    }
});