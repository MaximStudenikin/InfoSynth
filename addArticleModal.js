import { addArticle } from "./articles.js";
import { closeModal } from "./modalUtils.js";
import { clearText } from "./utils.js";

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
   closeModal(modalOverlay);

  const saveBtn = modalContent.querySelector("#save-add-article-btn");

  const dateInput = modalContent.querySelector('#add-article-date');
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    dateInput.value = formattedToday;

  saveBtn.addEventListener("click", function saveNewArticle(event) {
    event.preventDefault();

    const sourceInput = modalContent.querySelector('#add-article-source');
    const dateInput = modalContent.querySelector('#add-article-date');
    const titleInput = modalContent.querySelector('#add-article-title');
    const textInput = modalContent.querySelector('#add-article-text');
    const viewsInput = modalContent.querySelector('#add-article-views');
    const urlInput = modalContent.querySelector('#add-article-url');
    const addressesInput = modalContent.querySelector('#add-article-addresses');
     const speakerInput = modalContent.querySelector('#add-article-speaker');
    const startTimeInput = modalContent.querySelector('#add-article-start-time');
    const isInspectionInput = modalContent.querySelector('#add-article-inspection');
    const isMostViewedInput = modalContent.querySelector('#add-article-most-viewed');
     const typeSelect = modalContent.querySelector('#add-article-type');
    const sentimentSelect = modalContent.querySelector('#add-article-sentiment');
     const socialInput = modalContent.querySelector('#add-article-social');


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
    const type = typeSelect.value;
   const sentiment = sentimentSelect.value;
    const social = socialInput.value;
    const addresses = addressesInputValue.split('\n').map(addr => addr.trim()).filter(addr => addr);
    const speaker = speakerInputValue.split('\n').map(sp => sp.trim()).filter(sp => sp);


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
      type: type,
       sentiment: sentiment,
      social: social
    };

    addArticle(newArticle);
    modalOverlay.style.display = 'none';
  });
}