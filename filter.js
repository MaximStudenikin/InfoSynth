import { renderArticles } from "./modules.js";

const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("search-input");

filterButtons.forEach(button => {
    button.addEventListener("click", function() {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
        const filterType = this.dataset.filter;
      renderArticles(filterType, searchInput.value);
    });
});


searchInput.addEventListener('input', function() {
    const searchText = this.value;
    const activeFilter = document.querySelector('.filter-btn.active');
    const filterType = activeFilter ? activeFilter.dataset.filter : 'all';
    renderArticles(filterType, searchText);
})

function filterArticles() {
    const filterType = document.getElementById('filter-articles').value;
    const searchText = document.getElementById('search-input').value;
    renderArticles(filterType, searchText);
}

export { filterArticles };