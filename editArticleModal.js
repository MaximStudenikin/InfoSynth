import { updateArticle, editArticle, articles } from "./articles.js";
import { clearText } from "./utils.js";
import { closeModal, handleTypeButtons, handleSentimentButtons } from "./modalUtils.js";

export async function createEditArticleModal(articleId) {
    console.log("createEditArticleModal called with id:", articleId);
    const modalOverlay = document.getElementById("modal-overlay");
    const modalContent = document.getElementById("modal-content");

    try {
        const response = await fetch("editArticleModal.html");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        modalContent.innerHTML = await response.text();
    } catch (e) {
        console.error("Failed to fetch modal HTML:", e);
         modalContent.innerHTML = `<p>Failed to load modal content.</p>`;
         return;
    }
    const article = articles.find(article => article.id === articleId);

    if (!article) {
        console.error("Article not found with id:", articleId);
        modalContent.innerHTML = `<div class="modal-header"><h2>Ошибка</h2><span class="close-modal">&times;</span></div><div class="modal-body"><p>Статья с указанным ID не найдена.</p></div>`;
         modalOverlay.style.display = "flex";
         const closeBtn = modalContent.querySelector('.close-modal');
         closeModal(modalOverlay,closeBtn)
        return;
    }

      modalOverlay.style.display = "flex";
      const closeBtn = modalContent.querySelector('.close-modal');
     const saveBtn = modalContent.querySelector('#save-edit-article-btn');
     const typeButtons = modalContent.querySelectorAll('[id^="edit-article-type-"]');
      const sentimentButtons = modalContent.querySelectorAll('[id^="edit-article-sentiment-"]');

      let editArticleType = article.type;
    let editArticleSentiment = article.sentiment;
    closeModal(modalOverlay, closeBtn);
    handleTypeButtons(typeButtons, (type) => {
        editArticleType = type;
    });
    handleSentimentButtons(sentimentButtons, (sentiment) => {
        editArticleSentiment = sentiment;
    });
      const sourceInput = modalContent.querySelector('#edit-article-source');
     const dateInput = modalContent.querySelector('#edit-article-date');
     const titleInput = modalContent.querySelector('#edit-article-title');
     const textInput = modalContent.querySelector('#edit-article-text');
     const viewsInput = modalContent.querySelector('#edit-article-views');
     const urlInput = modalContent.querySelector('#edit-article-url');
     const addressesInput = modalContent.querySelector('#edit-article-addresses');
     const speakerInput = modalContent.querySelector('#edit-article-speaker');
    const startTimeInput = modalContent.querySelector('#edit-article-start-time');
    const isInspectionInput = modalContent.querySelector('#edit-article-inspection');
    const isMostViewedInput = modalContent.querySelector('#edit-article-most-viewed');
     const socialInput = modalContent.querySelector('#edit-article-social');

    sourceInput.value = article.source || '';
    dateInput.value = article.date || '';
    titleInput.value = article.title || '';
    textInput.value = article.text || '';
     viewsInput.value = article.views || '';
    urlInput.value = article.url || '';
     addressesInput.value = article.addresses ? article.addresses.join('\n') : '';
    speakerInput.value = article.speaker ? article.speaker.join('\n') : '';
     startTimeInput.value = article.startTime || '';
      isInspectionInput.checked = article.isInspection || false;
    isMostViewedInput.checked = article.isMostViewed || false;
     socialInput.value = article.social || 'none';

    saveBtn.addEventListener('click', saveEditedArticle);

    function saveEditedArticle() {
        const source = sourceInput.value;
        const date = dateInput.value;
        const title = titleInput.value;
         const text = textInput.value;
        const views = viewsInput.value;
         const url = urlInput.value;
          const addressesInputValue = addressesInput.value;
         const speakerInputValue = speakerInput.value;
          const startTime = startTimeInput.value;
        const isInspection = isInspectionInput.checked;
         const isMostViewed = isMostViewedInput.checked;
       const social = socialInput.value;

         const addresses = addressesInputValue.split('\n').map(addr => addr.trim()).filter(addr => addr);
         const speaker = speakerInputValue.split('\n').map(sp => sp.trim()).filter(sp => sp);

        const updatedArticle = {
            id: articleId,
            source: clearText(source),
             date: date,
            title: clearText(title),
            text: clearText(text),
            views: views,
            url: url,
            addresses: addresses,
            speaker: speaker,
            startTime: startTime,
             isInspection: isInspection,
            isMostViewed: isMostViewed,
            type: editArticleType,
            sentiment: editArticleSentiment,
            social: social
        };
         updateArticle(updatedArticle);
        modalOverlay.style.display = 'none';
    }
}