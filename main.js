import {createAddArticleModal, renderArticles, renderStatistic, filterArticles} from './modules.js';
import './filter.js';


const addArticleBtn = document.getElementById("add-article-btn");
const searchInput = document.getElementById('search-input');
const filterArticlesSelect = document.getElementById('filter-articles');

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    console.log("addArticleBtn:", addArticleBtn); //проверка селектора
    renderArticles();
    renderStatistic();

    addArticleBtn.addEventListener("click", function() {
        console.log("addArticleBtn click");
        createAddArticleModal();
    });

    searchInput.addEventListener('input', filterArticles);
    filterArticlesSelect.addEventListener('change', filterArticles);
});