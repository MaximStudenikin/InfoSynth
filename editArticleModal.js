import { updateArticle, closeModal, renderArticles, renderStatistic, articles } from "./modules.js";

export async function createEditArticleModal(articleId) {
    console.log("createEditArticleModal called for:", articleId);
    const modalOverlay = document.getElementById("modal-overlay");
    const modalContent = document.getElementById("modal-content");
      try {
        const response = await fetch("editArticleModal.html");
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        modalContent.innerHTML = await response.text();
          console.log("edit modal content fetch");
    } catch (e) {
        console.error("Failed to fetch modal HTML:", e);
        modalContent.innerHTML = `<p>Failed to load modal content.</p>`;
        return;
    }
       modalOverlay.style.display = "flex";

       //closeModal(modalOverlay); // Убрали вызов closeModal

    const saveBtn = modalContent.querySelector("#save-edit-article-btn");
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
    const typeSelect = modalContent.querySelector('#edit-article-type');
      const sentimentSelect = modalContent.querySelector('#edit-article-sentiment');
        const socialInput = modalContent.querySelector('#edit-article-social');


      const article = articles.find(article => article.id === articleId);
    if (!article) {
        console.error(`Article with id ${articleId} not found in articles`);
        modalOverlay.style.display = 'none';
        return;
    }

    sourceInput.value = article.source;
    dateInput.value = article.date;
    titleInput.value = article.title;
    textInput.value = article.text;
     viewsInput.value = article.views;
      urlInput.value = article.url;
     addressesInput.value = article.addresses ? article.addresses.join('\n') : '';
    speakerInput.value = article.speaker ? article.speaker.join('\n') : '';
      startTimeInput.value = article.startTime;
    isInspectionInput.checked = article.isInspection;
    isMostViewedInput.checked = article.isMostViewed;
    typeSelect.value = article.type;
    sentimentSelect.value = article.sentiment;
    socialInput.value = article.social;


    function saveEditedArticle(event) {
        event.preventDefault();


        const updatedArticle = {
            id: articleId,
            source: sourceInput.value,
            date: dateInput.value,
            title: titleInput.value,
            text: textInput.value,
             views: viewsInput.value,
            url: urlInput.value,
             addresses: addressesInput.value.split('\n').map(addr => addr.trim()).filter(addr => addr),
            speaker: speakerInput.value.split('\n').map(sp => sp.trim()).filter(sp => sp),
             startTime: startTimeInput.value,
            isInspection: isInspectionInput.checked,
           isMostViewed: isMostViewedInput.checked,
           type: typeSelect.value,
           sentiment: sentimentSelect.value,
            social: socialInput.value,

        };
       updateArticle(updatedArticle);
         modalOverlay.style.display = 'none';
        renderArticles();
        renderStatistic();
        saveBtn.removeEventListener("click", saveEditedArticle);
    };

     saveBtn.addEventListener("click", saveEditedArticle);
}