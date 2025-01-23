import { addArticle } from "./articles.js";
import { clearText } from "./utils.js";
import { closeModal, handleTypeButtons, handleSentimentButtons } from "./modalUtils.js";

export async function createAddArticleModal() {
    const modalOverlay = document.getElementById("modal-overlay");
    const modalContent = document.getElementById("modal-content");

    try {
      const response = await fetch("addArticleModal.html");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      modalContent.innerHTML = await response.text();
    } catch (e) {
      console.error("Failed to fetch modal HTML:", e);
      modalContent.innerHTML = `<p>Failed to load modal content.</p>`;
      return;
    }


    modalOverlay.style.display = "flex";

      const closeBtn = modalContent.querySelector('.close-modal');
      const saveBtn = modalContent.querySelector('#save-article-btn');
       const typeButtons = modalContent.querySelectorAll('[id^="article-type-"]');
        const sentimentButtons = modalContent.querySelectorAll('[id^="article-sentiment-"]');

    let articleType = null;
    let articleSentiment = null;
     closeModal(modalOverlay, closeBtn);

    handleTypeButtons(typeButtons, (type) => {
        articleType = type;
    });

     handleSentimentButtons(sentimentButtons, (sentiment) => {
        articleSentiment = sentiment;
    });



     saveBtn.addEventListener('click', saveArticle);

    function saveArticle() {
        const source = modalContent.querySelector('#article-source').value;
        const date = modalContent.querySelector('#article-date').value;
        const title = modalContent.querySelector('#article-title').value;
        const text = modalContent.querySelector('#article-text').value;
        const views = modalContent.querySelector('#article-views').value;
         const url = modalContent.querySelector('#article-url').value;
        const addressesInput = modalContent.querySelector('#article-addresses').value;
         const speakerInput = modalContent.querySelector('#article-speaker').value;
         const startTime = modalContent.querySelector('#article-start-time').value;
         const isInspection = modalContent.querySelector('#article-inspection').checked;
        const isMostViewed = modalContent.querySelector('#article-most-viewed').checked;
         const social = modalContent.querySelector('#article-social').value;

        const addresses = addressesInput.split('\n').map(addr => addr.trim()).filter(addr => addr);
        const speaker = speakerInput.split('\n').map(sp => sp.trim()).filter(sp => sp);

      const newArticle = {
          id: Date.now(),
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
              type: articleType,
              sentiment: articleSentiment,
               social: social
        };
       addArticle(newArticle);
       modalOverlay.style.display = 'none';
    }
}
