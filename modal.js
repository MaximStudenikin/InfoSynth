import { addArticle, clearText, updateArticle } from "./articles.js";
import { findAddresses, removeEmoji } from "./utils.js";
import { updateMostViewed } from "./main.js";
export function createAddArticleModal() {
    const modalOverlay = document.getElementById("modal-overlay");
    const modalContent = document.getElementById("modal-content");

    const today = new Date().toISOString().split('T')[0];

     modalContent.innerHTML = `
        <div class="modal-header">
            <h2>Добавить статью</h2>
            <span class="close-modal">&times;</span>
        </div>
        <div class="modal-body">
          <div class="checkbox-container">
                <input type="checkbox" id="is-most-viewed">
                 <label for="is-most-viewed">Самый охватываемый пост</label>
            </div>
             <div class="checkbox-container">
                  <input type="checkbox" id="is-inspection-video">
                 <label for="is-inspection-video">Сюжет с участием инспекции</label>
            </div>
            <label for="article-sentiment">Тональность:</label>
            <select id="article-sentiment">
                <option value="positive">Позитив</option>
                <option value="negative">Негатив</option>
            </select>
            <label for="article-social-network">Социальная сеть:</label>
            <select id="article-social-network">
                 <option value="" disabled selected>Выберите соцсеть</option>
                <option value="vk">Вконтакте</option>
                <option value="ok">Одноклассники</option>
                <option value="telegram">Telegram</option>
            </select>
            <label for="article-type">Тип источника:</label>
            <select id="article-type">
                 <option value="news">Новость</option>
                <option value="post">Пост</option>
                <option value="video">Видео</option>
            </select>
             <label for="article-url">URL:</label>
            <input type="url" id="article-url" placeholder="Ссылка на материал">
            <label for="article-source">Источник:</label>
            <input type="text" id="article-source" placeholder="Название сайта или сообщества">
            <label for="article-title">Заголовок:</label>
            <input type="text" id="article-title" placeholder="Заголовок с сайта или из поста">
             <label for="article-date">Дата публикации:</label>
             <input type="date" id="article-date" value="${today}">
             <label for="article-text">Текст:</label>
            <textarea id="article-text" placeholder="Текст статьи или поста"></textarea>
            <div class="button-group">
                <button type="button" id="clear-empty-lines">Очистить от пустых строк</button>
                <button type="button" id="clear-emoji">Очистить от эмодзи</button>
            </div>
            <label for="article-addresses">Адрес:</label>
             <textarea id="article-addresses" placeholder="Адреса (по одному на строку)"></textarea>
            <label for="article-speaker">Спикер:</label>
             <textarea id="article-speaker" placeholder="Спикеры (по одному на строку)"></textarea>
              <label for="article-start-time">Начало видео:</label>
            <input type="time" id="article-start-time" placeholder="Начало видео">
        </div>
         <div class="modal-footer">
            <button id="add-article-submit-btn">Добавить</button>
        </div>
    `;

    modalOverlay.style.display = "flex";

       const closeBtn = modalContent.querySelector('.close-modal');
        closeBtn.addEventListener('click', closeModal);

    const clearEmptyLinesBtn = document.getElementById('clear-empty-lines');
    clearEmptyLinesBtn.addEventListener('click', () => {
        const articleText = document.getElementById('article-text');
         articleText.value = articleText.value.split('\n').filter(line => line.trim() !== '').join('\n');
    });
   const clearEmojiBtn = document.getElementById('clear-emoji');
    clearEmojiBtn.addEventListener('click', () => {
         const articleText = document.getElementById('article-text');
        articleText.value = removeEmoji(articleText.value);
    });

    const addArticleSubmitBtn = document.getElementById('add-article-submit-btn');
    addArticleSubmitBtn.addEventListener('click', handleAddArticleSubmit);
}


export function createAddMostViewedPostModal() {
  const modalOverlay = document.getElementById("modal-overlay");
    const modalContent = document.getElementById("modal-content");

    modalContent.innerHTML = `
    <div class="modal-header">
         <h2>Добавить самый просматриваемый пост</h2>
        <span class="close-modal">&times;</span>
     </div>
        <div class="modal-body">
           <label for="most-viewed-type">Тип источника:</label>
            <select id="most-viewed-type">
               <option value="social">Соцсеть</option>
            </select>

             <label for="most-viewed-source">Источник:</label>
            <input type="text" id="most-viewed-source" placeholder="Название источника">
            <label for="most-viewed-title">Заголовок:</label>
            <input type="text" id="most-viewed-title" placeholder="Заголовок статьи">
            <label for="most-viewed-text">Текст:</label>
             <textarea id="most-viewed-text" placeholder="Текст статьи"></textarea>
               <label for="most-viewed-url">Ссылка:</label>
            <input type="url" id="most-viewed-url" placeholder="Ссылка на статью (если есть)">
            <label for="most-viewed-views">Количество просмотров:</label>
            <input type="number" id="most-viewed-views" placeholder="Количество просмотров">
              <label for="most-viewed-date">Дата публикации:</label>
            <input type="date" id="most-viewed-date">
        </div>
          <div class="modal-footer">
             <button id="add-most-viewed-submit-btn">Добавить</button>
        </div>
    `;

    modalOverlay.style.display = "flex";
      const closeBtn = modalContent.querySelector('.close-modal');
        closeBtn.addEventListener('click', closeModal);

    const addMostViewedSubmitBtn = document.getElementById('add-most-viewed-submit-btn');
    addMostViewedSubmitBtn.addEventListener('click', handleAddMostViewedSubmit);
}

export function createEditArticleModal(article) {
       const modalOverlay = document.getElementById("modal-overlay");
    const modalContent = document.getElementById("modal-content");

    modalContent.innerHTML = `
        <div class="modal-header">
             <h2>Редактировать статью</h2>
            <span class="close-modal">&times;</span>
        </div>
        <div class="modal-body">
          <div class="checkbox-container">
                <input type="checkbox" id="edit-is-most-viewed" ${article.isMostViewed ? 'checked' : ''}>
                 <label for="edit-is-most-viewed">Самый охватываемый пост</label>
            </div>
             <div class="checkbox-container">
                  <input type="checkbox" id="edit-is-inspection-video"  ${article.isInspectionVideo ? 'checked' : ''}>
                 <label for="edit-is-inspection-video">Сюжет с участием инспекции</label>
            </div>
             <label for="edit-article-sentiment">Тональность:</label>
            <select id="edit-article-sentiment">
                <option value="positive" ${article.sentiment === 'positive' ? 'selected' : ''}>Позитив</option>
                <option value="negative" ${article.sentiment === 'negative' ? 'selected' : ''}>Негатив</option>
            </select>
            <label for="edit-article-social-network">Социальная сеть:</label>
            <select id="edit-article-social-network">
                 <option value="" disabled ${!article.socialNetwork ? 'selected' : ''}>Выберите соцсеть</option>
                 <option value="vk" ${article.socialNetwork === 'vk' ? 'selected' : ''}>Вконтакте</option>
                <option value="ok" ${article.socialNetwork === 'ok' ? 'selected' : ''}>Одноклассники</option>
                <option value="telegram" ${article.socialNetwork === 'telegram' ? 'selected' : ''}>Telegram</option>
            </select>
            <label for="edit-article-type">Тип источника:</label>
            <select id="edit-article-type">
                 <option value="news" ${article.type === 'news' ? 'selected' : ''}>Новость</option>
                <option value="post" ${article.type === 'post' ? 'selected' : ''}>Пост</option>
                 <option value="video" ${article.type === 'video' ? 'selected' : ''}>Видео</option>
            </select>
             <label for="edit-article-url">URL:</label>
            <input type="url" id="edit-article-url" placeholder="Ссылка на материал" value="${article.url || ''}">
            <label for="edit-article-source">Источник:</label>
            <input type="text" id="edit-article-source" placeholder="Название сайта или сообщества" value="${article.source || ''}">
             <label for="edit-article-title">Заголовок:</label>
             <input type="text" id="edit-article-title" placeholder="Заголовок с сайта или из поста" value="${article.title || ''}">
               <label for="edit-article-date">Дата публикации:</label>
             <input type="date" id="edit-article-date" value="${article.date || ''}">
            <label for="edit-article-text">Текст:</label>
            <textarea id="edit-article-text" placeholder="Текст статьи или поста">${article.text || ''}</textarea>
               <div class="button-group">
                <button type="button" id="edit-clear-empty-lines">Очистить от пустых строк</button>
                <button type="button" id="edit-clear-emoji">Очистить от эмодзи</button>
            </div>
              <label for="edit-article-addresses">Адрес:</label>
             <textarea id="edit-article-addresses" placeholder="Адреса (по одному на строку)">${article.addresses ? article.addresses.join('\n') : ''}</textarea>
            <label for="edit-article-speaker">Спикер:</label>
             <textarea id="edit-article-speaker" placeholder="Спикеры (по одному на строку)">${article.speaker ? article.speaker.join('\n') : ''}</textarea>
              <label for="edit-article-start-time">Начало видео:</label>
            <input type="time" id="edit-article-start-time" placeholder="Начало видео" value="${article.startTime || ''}">
        </div>
          <div class="modal-footer">
            <button id="edit-article-submit-btn" data-id="${article.id}">Сохранить</button>
        </div>
    `;

    modalOverlay.style.display = "flex";
      const closeBtn = modalContent.querySelector('.close-modal');
        closeBtn.addEventListener('click', closeModal);
         const clearEmptyLinesBtn = document.getElementById('edit-clear-empty-lines');
         clearEmptyLinesBtn.addEventListener('click', () => {
             const articleText = document.getElementById('edit-article-text');
             articleText.value = articleText.value.split('\n').filter(line => line.trim() !== '').join('\n');
        });
        const clearEmojiBtn = document.getElementById('edit-clear-emoji');
        clearEmojiBtn.addEventListener('click', () => {
             const articleText = document.getElementById('edit-article-text');
            articleText.value = removeEmoji(articleText.value);
        });
    const editArticleSubmitBtn = document.getElementById('edit-article-submit-btn');
    editArticleSubmitBtn.addEventListener('click', handleEditArticleSubmit);
}

function closeModal() {
    const modalOverlay = document.getElementById("modal-overlay");
    modalOverlay.style.display = "none";
}

function handleAddArticleSubmit() {
    const isMostViewed = document.getElementById('is-most-viewed').checked;
     const isInspectionVideo = document.getElementById('is-inspection-video').checked;
    const sentiment = document.getElementById('article-sentiment').value;
    const socialNetwork = document.getElementById('article-social-network').value;
    const type = document.getElementById('article-type').value;
    const url = document.getElementById('article-url').value;
    const source = document.getElementById('article-source').value;
    const title = document.getElementById('article-title').value;
    const text = document.getElementById('article-text').value;
    const date = document.getElementById('article-date').value;
    const addressesText = document.getElementById('article-addresses').value;
    const speakerText = document.getElementById('article-speaker').value;
     const startTime = document.getElementById('article-start-time').value;

   const cleanedText = clearText(text);
      const addresses = findAddresses(addressesText);
      const speaker = speakerText.split('\n').map(s => s.trim()).filter(s => s);
    const newArticle = {
           id: Date.now().toString(),
           isMostViewed,
           isInspectionVideo,
           sentiment,
           socialNetwork,
           type,
           url,
            source,
            title,
            text: cleanedText,
             date,
            addresses: addresses,
            speaker,
            startTime

       };
   addArticle(newArticle);
    closeModal();
}

function handleAddMostViewedSubmit() {
    const type = document.getElementById('most-viewed-type').value;
    const source = document.getElementById('most-viewed-source').value;
    const title = document.getElementById('most-viewed-title').value;
    const text = document.getElementById('most-viewed-text').value;
     const url = document.getElementById('most-viewed-url').value;
    const views = document.getElementById('most-viewed-views').value;
    const date = document.getElementById('most-viewed-date').value;
    const cleanedText = clearText(text);
    const addresses = findAddresses(cleanedText);

    const newArticle = {
        id: Date.now().toString(),
        type,
        source,
        title,
        text: cleanedText,
        addresses: addresses,
         url,
        date,
        views,
        sentiment: "positive",
         isMostViewed: true
    };

    addArticle(newArticle);
    closeModal();
}
function handleEditArticleSubmit(event) {
      const id = event.target.dataset.id;
     const isMostViewed = document.getElementById('edit-is-most-viewed').checked;
     const isInspectionVideo = document.getElementById('edit-is-inspection-video').checked;
      const sentiment = document.getElementById('edit-article-sentiment').value;
     const socialNetwork = document.getElementById('edit-article-social-network').value;
    const type = document.getElementById('edit-article-type').value;
     const url = document.getElementById('edit-article-url').value;
    const source = document.getElementById('edit-article-source').value;
    const title = document.getElementById('edit-article-title').value;
     const text = document.getElementById('edit-article-text').value;
      const date = document.getElementById('edit-article-date').value;
      const addressesText = document.getElementById('edit-article-addresses').value;
    const speakerText = document.getElementById('edit-article-speaker').value;
    const startTime = document.getElementById('edit-article-start-time').value;


      const cleanedText = clearText(text);
    const addresses = findAddresses(addressesText);
    const speaker = speakerText.split('\n').map(s => s.trim()).filter(s => s);


    const updatedArticle = {
        id,
         isMostViewed,
         isInspectionVideo,
         sentiment,
          socialNetwork,
        type,
        url,
        source,
        title,
        text: cleanedText,
          date,
          addresses: addresses,
        speaker,
        startTime
    };
    updateArticle(updatedArticle);
    closeModal();
}