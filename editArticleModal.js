import { updateArticle, articles} from "./articles.js";
import { closeModal } from "./modalUtils.js";
import { clearText } from "./utils.js";


export async function createEditArticleModal(articleId) {
  const modalOverlay = document.getElementById("modal-overlay");
  const modalContent = document.getElementById("modal-content");
    const article = articles.find(article => article.id === articleId);
    if (!article) {
        console.error(`Article with id ${articleId} not found`);
        return;
    }
    try {
        const response = await fetch('editArticleModal.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        modalContent.innerHTML = await response.text();
    } catch(e){
        console.error("Failed to fetch modal HTML:", e);
        modalContent.innerHTML = `<p>Failed to load modal content.</p>`;
         return;
    }

    modalOverlay.style.display = "flex";

  const closeBtn = modalContent.querySelector(".close-modal");
  const saveBtn = modalContent.querySelector("#save-edit-article-btn");

  const sourceInput = modalContent.querySelector('#edit-article-source');
  console.log("sourceInput:", sourceInput);
  const dateInput = modalContent.querySelector('#edit-article-date');
   console.log("dateInput:", dateInput);
  const titleInput = modalContent.querySelector('#edit-article-title');
  console.log("titleInput:", titleInput);
  const textInput = modalContent.querySelector('#edit-article-text');
    console.log("textInput:", textInput);
   const viewsInput = modalContent.querySelector('#edit-article-views');
    console.log("viewsInput:", viewsInput);
   const urlInput = modalContent.querySelector('#edit-article-url');
    console.log("urlInput:", urlInput);
  const addressesInput = modalContent.querySelector('#edit-article-addresses');
    console.log("addressesInput:", addressesInput);
  const speakerInput = modalContent.querySelector('#edit-article-speaker');
   console.log("speakerInput:", speakerInput);
  const startTimeInput = modalContent.querySelector('#edit-article-start-time');
    console.log("startTimeInput:", startTimeInput);
   const isInspectionInput = modalContent.querySelector('#edit-article-inspection');
    console.log("isInspectionInput:", isInspectionInput);
    const isMostViewedInput = modalContent.querySelector('#edit-article-most-viewed');
      console.log("isMostViewedInput:", isMostViewedInput);
   const typeSelect = modalContent.querySelector('#edit-article-type');
      console.log("typeSelect:", typeSelect);
    const sentimentSelect = modalContent.querySelector('#edit-article-sentiment');
     console.log("sentimentSelect:", sentimentSelect);
      const socialInput = modalContent.querySelector('#edit-article-social');
        console.log("socialInput:", socialInput);


  console.log("dateInput:", dateInput);

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
    typeSelect.value = article.type;
    sentimentSelect.value = article.sentiment;
    socialInput.value = article.social;


  closeModal(modalOverlay, closeBtn);


  saveBtn.addEventListener("click", function saveEditedArticle(event) {
    event.preventDefault();
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

      const updatedArticle = {
        id: article.id,
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
    updateArticle(updatedArticle);
    modalOverlay.style.display = 'none';

  });

}