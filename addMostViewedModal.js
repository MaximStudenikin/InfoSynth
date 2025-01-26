import { addArticle } from "./articles.js";
import { closeModal, handleTypeButtons, handleSentimentButtons } from "./modalUtils.js";

export async function createAddMostViewedPostModal() {
    const modalOverlay = document.getElementById("modal-overlay");
    const modalContent = document.getElementById("modal-content");

    try {
      const response = await fetch("addMostViewedModal.html");
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
     const saveBtn = modalContent.querySelector('#save-most-viewed-btn');
      const typeButtons = modalContent.querySelectorAll('[id^="most-viewed-type-"]');
     const sentimentButtons = modalContent.querySelectorAll('[id^="most-viewed-sentiment-"]');
    let mostViewedType = null;
     let mostViewedSentiment = null;

     closeModal(modalOverlay, closeBtn);

    handleTypeButtons(typeButtons, (type) => {
         mostViewedType = type;
     });

      handleSentimentButtons(sentimentButtons, (sentiment) => {
        mostViewedSentiment = sentiment;
     });

    saveBtn.addEventListener('click', saveMostViewed);

    function saveMostViewed() {
        const source = modalContent.querySelector('#most-viewed-source').value;
        const date = modalContent.querySelector('#most-viewed-date').value;
        const title = modalContent.querySelector('#most-viewed-title').value;
        const text = modalContent.querySelector('#most-viewed-text').value;
        const views = modalContent.querySelector('#most-viewed-views').value;
         const url = modalContent.querySelector('#most-viewed-url').value;
           const addressesInput = modalContent.querySelector('#most-viewed-addresses').value;
          const speakerInput = modalContent.querySelector('#most-viewed-speaker').value;
           const startTime = modalContent.querySelector('#most-viewed-start-time').value;
         const social = modalContent.querySelector('#most-viewed-social').value;
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
             isMostViewed: true,
             type: mostViewedType,
              sentiment: mostViewedSentiment,
              social: social,
        };
       addArticle(newArticle);
         modalOverlay.style.display = 'none';
    }
}