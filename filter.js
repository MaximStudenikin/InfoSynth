import {articles, updateArticleList} from "./articles.js";

export function filterArticles() {
     const searchInput = document.getElementById('search-input');
    const filterArticlesSelect = document.getElementById('filter-articles');
    const searchTerm = searchInput.value.toLowerCase();
     const filterValue = filterArticlesSelect.value;
     const filteredArticles = articles.filter(article => {
          const titleMatch = article.title && article.title.toLowerCase().includes(searchTerm);
          const textMatch = article.text && article.text.toLowerCase().includes(searchTerm);
          const sourceMatch = article.source && article.source.toLowerCase().includes(searchTerm);
        const typeMatch = filterValue === 'all' || article.type === filterValue;

        return typeMatch && (titleMatch || textMatch || sourceMatch);
    });
     updateArticleList(filteredArticles);
}