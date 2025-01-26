import { renderArticles } from './articles.js';
import { createEditArticleModal } from './editArticleModal.js';
import { renderStatistic } from './statistic.js';
import { createAddArticleModal } from './addArticleModal.js';


export { renderArticles, createEditArticleModal, renderStatistic, createAddArticleModal};
export async function closeModal(modalOverlay) {
  console.log("closeModal called")
  modalOverlay.style.display = 'none';
}

export { addArticle, deleteArticle, updateArticle, articles } from './articles.js';
export { filterArticles } from './filter.js';