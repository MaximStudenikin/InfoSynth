import { updateArticleList, articles, saveArticles, updateArticleSentiment } from "./articles.js";

export function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.id);
    event.target.classList.add('dragging');
}

export function handleDragOver(event) {
    event.preventDefault();
}

export function handleDrop(event) {
    event.preventDefault();
    const draggedId = event.dataTransfer.getData('text/plain');
    const dropTarget = event.target.closest('li');

    if (!dropTarget) {
        return;
    }

    const draggedItem = document.querySelector(`[data-id="${draggedId}"]`);
    if (dropTarget === draggedItem) {
        return;
    }

    const dropTargetId = dropTarget.dataset.id;
    const draggedIndex = articles.findIndex(article => article.id === draggedId);
    const dropIndex = articles.findIndex(article => article.id === dropTargetId);

    if (draggedIndex !== -1 && dropIndex !== -1) {

        const [movedItem] = articles.splice(draggedIndex, 1);
        articles.splice(dropIndex, 0, movedItem);

         if (draggedIndex < dropIndex) {
              dropTarget.parentNode.insertBefore(articleList.children[draggedIndex], dropTarget.nextElementSibling)
          } else {
               dropTarget.parentNode.insertBefore(articleList.children[draggedIndex], dropTarget)
          }
         if (dropTarget.parentNode.id === "positive-list") {
             updateArticleSentiment(draggedId, "positive")
         }else if (dropTarget.parentNode.id === "negative-list"){
             updateArticleSentiment(draggedId, "negative")
         }else{
             updateArticleSentiment(draggedId, null)
         }


        const draggingItem = document.querySelector(`[data-id="${draggedId}"]`);
        draggingItem.classList.remove('dragging');
        saveArticles();
        updateArticleList();
    }
}