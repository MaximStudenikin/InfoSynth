import { addArticle, editArticle, updateArticleSentiment, articles, updateArticle } from "./articles.js";
import { updateArticleList, updateMostViewed} from "./articles.js";
import { clearText, findAddresses } from "./utils.js";

export function createAddArticleModal() {
    const modalOverlay = document.getElementById("modal-overlay");
    const modalContent = document.getElementById("modal-content");
    modalContent.innerHTML = `
        <div class="modal-header">
            <h2>Добавить статью</h2>
             <span class="close-modal">&times;</span>
        </div>
         <div class="modal-body">
            <label for="article-source">Издание:</label>
            <input type="text" id="article-source">
            <label for="article-date">Дата:</label>
            <input type="date" id="article-date">
            <label for="article-title">Заголовок:</label>
            <input type="text" id="article-title">
            <label for="article-text">Текст:</label>
            <textarea id="article-text"></textarea>
            <label for="article-views">Количество просмотров:</label>
            <input type="number" id="article-views" >
              <label for="article-social">Социальная сеть:</label>
             <select id="article-social">
                 <option value="none">Нет</option>
                <option value="vk">Вконтакте</option>
                <option value="ok">Одноклассники</option>
                  <option value="tg">Telegram</option>
                  <option value="yt">Youtube</option>
            </select>
            <label for="article-url">Ссылка:</label>
            <input type="url" id="article-url">
            <label for="article-addresses">Адрес:</label>
              <textarea id="article-addresses"></textarea>
            <label for="article-speaker">Спикер:</label>
            <textarea id="article-speaker"></textarea>
            <label for="article-start-time">Начало видео:</label>
            <input type="text" id="article-start-time" >
             <div class="checkbox-container">
                <input type="checkbox" id="article-inspection">
                 <label for="article-inspection">Сюжет с участием инспекции</label>
             </div>
             <div class="checkbox-container">
                 <input type="checkbox" id="article-most-viewed">
                 <label for="article-most-viewed">Самый охватываемый пост</label>
            </div>
              <div class="button-group">
             <button id="article-type-news">Новость</button>
             <button id="article-type-social">Социальная сеть</button>
               <button id="article-type-video">Видео</button>
          </div>
          <div class="button-group">
               <button id="article-sentiment-positive">Позитив</button>
                <button id="article-sentiment-negative">Негатив</button>
        </div>
        </div>
        <div class="modal-footer">
            <button id="save-article-btn">Сохранить</button>
        </div>
    `;
    modalOverlay.style.display = "flex";
     const closeModal = document.querySelector('.close-modal');
     const saveArticleBtn = document.getElementById('save-article-btn');
     const articleTypeNewsBtn = document.getElementById('article-type-news');
     const articleTypeSocialBtn = document.getElementById('article-type-social');
    const articleTypeVideoBtn = document.getElementById('article-type-video');
     const articleSentimentPositiveBtn = document.getElementById('article-sentiment-positive');
     const articleSentimentNegativeBtn = document.getElementById('article-sentiment-negative');
    let articleType = null;
     let articleSentiment = null;


     closeModal.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
     });

      saveArticleBtn.addEventListener('click', saveArticle);


      articleTypeNewsBtn.addEventListener('click', () => {
          articleType = 'news';
        articleTypeNewsBtn.style.backgroundColor = '#ddd';
         articleTypeSocialBtn.style.backgroundColor = '#f0f0f0';
        articleTypeVideoBtn.style.backgroundColor = '#f0f0f0';
     });
     articleTypeSocialBtn.addEventListener('click', () => {
         articleType = 'social';
          articleTypeNewsBtn.style.backgroundColor = '#f0f0f0';
         articleTypeSocialBtn.style.backgroundColor = '#ddd';
           articleTypeVideoBtn.style.backgroundColor = '#f0f0f0';
     });
     articleTypeVideoBtn.addEventListener('click', () => {
         articleType = 'video';
         articleTypeNewsBtn.style.backgroundColor = '#f0f0f0';
          articleTypeSocialBtn.style.backgroundColor = '#f0f0f0';
        articleTypeVideoBtn.style.backgroundColor = '#ddd';
     });
     articleSentimentPositiveBtn.addEventListener('click', () => {
         articleSentiment = 'positive';
        articleSentimentPositiveBtn.style.backgroundColor = '#ddd';
         articleSentimentNegativeBtn.style.backgroundColor = '#f0f0f0';
      });
       articleSentimentNegativeBtn.addEventListener('click', () => {
           articleSentiment = 'negative';
          articleSentimentPositiveBtn.style.backgroundColor = '#f0f0f0';
         articleSentimentNegativeBtn.style.backgroundColor = '#ddd';
      });


    function saveArticle() {
        const source = document.getElementById('article-source').value;
        const date = document.getElementById('article-date').value;
        const title = document.getElementById('article-title').value;
        const text = document.getElementById('article-text').value;
        const views = document.getElementById('article-views').value;
         const url = document.getElementById('article-url').value;
        const addressesInput = document.getElementById('article-addresses').value;
         const speakerInput = document.getElementById('article-speaker').value;
         const startTime = document.getElementById('article-start-time').value;
         const isInspection = document.getElementById('article-inspection').checked;
        const isMostViewed = document.getElementById('article-most-viewed').checked;
         const social = document.getElementById('article-social').value;

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
        updateMostViewed();
         updateArticleList();
    }
}

export function createAddMostViewedPostModal() {
    const modalOverlay = document.getElementById("modal-overlay");
    const modalContent = document.getElementById("modal-content");
    modalContent.innerHTML = `
        <div class="modal-header">
            <h2>Добавить самый охватываемый пост</h2>
             <span class="close-modal">&times;</span>
        </div>
         <div class="modal-body">
            <label for="most-viewed-source">Издание:</label>
            <input type="text" id="most-viewed-source">
              <label for="most-viewed-date">Дата:</label>
            <input type="date" id="most-viewed-date">
            <label for="most-viewed-title">Заголовок:</label>
            <input type="text" id="most-viewed-title">
            <label for="most-viewed-text">Текст:</label>
             <textarea id="most-viewed-text"></textarea>
             <label for="most-viewed-views">Количество просмотров:</label>
            <input type="number" id="most-viewed-views">
              <label for="most-viewed-social">Социальная сеть:</label>
             <select id="most-viewed-social">
                 <option value="none">Нет</option>
                <option value="vk">Вконтакте</option>
                <option value="ok">Одноклассники</option>
                  <option value="tg">Telegram</option>
                  <option value="yt">Youtube</option>
            </select>
             <label for="most-viewed-url">Ссылка:</label>
            <input type="url" id="most-viewed-url">
             <label for="most-viewed-addresses">Адрес:</label>
              <textarea id="most-viewed-addresses"></textarea>
               <label for="most-viewed-speaker">Спикер:</label>
            <textarea id="most-viewed-speaker"></textarea>
            <label for="most-viewed-start-time">Начало видео:</label>
             <input type="text" id="most-viewed-start-time">
             <div class="button-group">
                 <button id="most-viewed-type-news">Новость</button>
                 <button id="most-viewed-type-social">Социальная сеть</button>
               <button id="most-viewed-type-video">Видео</button>
          </div>
          <div class="button-group">
               <button id="most-viewed-sentiment-positive">Позитив</button>
                <button id="most-viewed-sentiment-negative">Негатив</button>
        </div>
        </div>
        <div class="modal-footer">
            <button id="save-most-viewed-btn">Сохранить</button>
        </div>
    `;
    modalOverlay.style.display = "flex";

    const closeModal = document.querySelector('.close-modal');
     const saveMostViewedBtn = document.getElementById('save-most-viewed-btn');
     const mostViewedTypeNewsBtn = document.getElementById('most-viewed-type-news');
      const mostViewedTypeSocialBtn = document.getElementById('most-viewed-type-social');
      const mostViewedTypeVideoBtn = document.getElementById('most-viewed-type-video');
    const mostViewedSentimentPositiveBtn = document.getElementById('most-viewed-sentiment-positive');
     const mostViewedSentimentNegativeBtn = document.getElementById('most-viewed-sentiment-negative');
      let mostViewedType = null;
      let mostViewedSentiment = null;

    closeModal.addEventListener('click', () => {
         modalOverlay.style.display = 'none';
     });

     saveMostViewedBtn.addEventListener('click', saveMostViewed);
     mostViewedTypeNewsBtn.addEventListener('click', () => {
        mostViewedType = 'news';
        mostViewedTypeNewsBtn.style.backgroundColor = '#ddd';
        mostViewedTypeSocialBtn.style.backgroundColor = '#f0f0f0';
          mostViewedTypeVideoBtn.style.backgroundColor = '#f0f0f0';
     });
     mostViewedTypeSocialBtn.addEventListener('click', () => {
       mostViewedType = 'social';
          mostViewedTypeNewsBtn.style.backgroundColor = '#f0f0f0';
        mostViewedTypeSocialBtn.style.backgroundColor = '#ddd';
         mostViewedTypeVideoBtn.style.backgroundColor = '#f0f0f0';
     });
       mostViewedTypeVideoBtn.addEventListener('click', () => {
       mostViewedType = 'video';
         mostViewedTypeNewsBtn.style.backgroundColor = '#f0f0f0';
         mostViewedTypeSocialBtn.style.backgroundColor = '#f0f0f0';
           mostViewedTypeVideoBtn.style.backgroundColor = '#ddd';
     });
    mostViewedSentimentPositiveBtn.addEventListener('click', () => {
        mostViewedSentiment = 'positive';
       mostViewedSentimentPositiveBtn.style.backgroundColor = '#ddd';
      mostViewedSentimentNegativeBtn.style.backgroundColor = '#f0f0f0';
     });
      mostViewedSentimentNegativeBtn.addEventListener('click', () => {
          mostViewedSentiment = 'negative';
          mostViewedSentimentPositiveBtn.style.backgroundColor = '#f0f0f0';
         mostViewedSentimentNegativeBtn.style.backgroundColor = '#ddd';
     });

    function saveMostViewed() {
        const source = document.getElementById('most-viewed-source').value;
        const date = document.getElementById('most-viewed-date').value;
        const title = document.getElementById('most-viewed-title').value;
        const text = document.getElementById('most-viewed-text').value;
        const views = document.getElementById('most-viewed-views').value;
         const url = document.getElementById('most-viewed-url').value;
           const addressesInput = document.getElementById('most-viewed-addresses').value;
          const speakerInput = document.getElementById('most-viewed-speaker').value;
           const startTime = document.getElementById('most-viewed-start-time').value;
         const social = document.getElementById('most-viewed-social').value;
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
       updateMostViewed();
      updateArticleList();

    }
}

export function createEditArticleModal(articleId) {
    console.log("createEditArticleModal called with id:", articleId);
     const modalOverlay = document.getElementById("modal-overlay");
      const modalContent = document.getElementById("modal-content");
       console.log("Modal overlay element:", modalOverlay);
       console.log("Modal content element:", modalContent);
    const article = articles.find(article => article.id === articleId);

    if (!article) {
        console.error("Article not found with id:", articleId);
         modalContent.innerHTML = `<div class="modal-header"><h2>Ошибка</h2><span class="close-modal">&times;</span></div><div class="modal-body"><p>Статья с указанным ID не найдена.</p></div>`;
         modalOverlay.style.display = "flex";
          const closeModal = document.querySelector('.close-modal');
         closeModal.addEventListener('click', () => {
             modalOverlay.style.display = 'none';
         });
        return;
    }
  modalContent.innerHTML = `
        <div class="modal-header">
            <h2>Редактировать статью</h2>
             <span class="close-modal">&times;</span>
        </div>
         <div class="modal-body">
            <label for="edit-article-source">Издание:</label>
            <input type="text" id="edit-article-source" value="${article.source || ''}">
            <label for="edit-article-date">Дата:</label>
            <input type="date" id="edit-article-date" value="${article.date || ''}">
            <label for="edit-article-title">Заголовок:</label>
            <input type="text" id="edit-article-title" value="${article.title || ''}">
             <label for="edit-article-text">Текст:</label>
            <textarea id="edit-article-text">${article.text || ''}</textarea>
              <label for="edit-article-views">Количество просмотров:</label>
            <input type="number" id="edit-article-views" value="${article.views || ''}">
             <label for="edit-article-social">Социальная сеть:</label>
             <select id="edit-article-social">
                 <option value="none" ${article.social === 'none' ? 'selected' : ''}>Нет</option>
                <option value="vk" ${article.social === 'vk' ? 'selected' : ''}>Вконтакте</option>
                <option value="ok" ${article.social === 'ok' ? 'selected' : ''}>Одноклассники</option>
                  <option value="tg" ${article.social === 'tg' ? 'selected' : ''}>Telegram</option>
                  <option value="yt" ${article.social === 'yt' ? 'selected' : ''}>Youtube</option>
            </select>
             <label for="edit-article-url">Ссылка:</label>
            <input type="url" id="edit-article-url" value="${article.url || ''}">
             <label for="edit-article-addresses">Адрес:</label>
              <textarea id="edit-article-addresses">${article.addresses ? article.addresses.join('\n') : ''}</textarea>
               <label for="edit-article-speaker">Спикер:</label>
            <textarea id="edit-article-speaker">${article.speaker ? article.speaker.join('\n') : ''}</textarea>
              <label for="edit-article-start-time">Начало видео:</label>
            <input type="text" id="edit-article-start-time" value="${article.startTime || ''}">
               <div class="checkbox-container">
                <input type="checkbox" id="edit-article-inspection" ${article.isInspection ? 'checked' : ''}>
                 <label for="edit-article-inspection">Сюжет с участием инспекции</label>
             </div>
             <div class="checkbox-container">
                 <input type="checkbox" id="edit-article-most-viewed" ${article.isMostViewed ? 'checked' : ''}>
                 <label for="edit-article-most-viewed">Самый охватываемый пост</label>
            </div>
             <div class="button-group">
                 <button id="edit-article-type-news" >Новость</button>
                  <button id="edit-article-type-social">Социальная сеть</button>
                   <button id="edit-article-type-video">Видео</button>
          </div>
             <div class="button-group">
                 <button id="edit-article-sentiment-positive">Позитив</button>
                  <button id="edit-article-sentiment-negative">Негатив</button>
          </div>
        </div>
        <div class="modal-footer">
            <button id="save-edit-article-btn" data-id="${articleId}">Сохранить</button>
        </div>
    `;
    modalOverlay.style.display = "flex";
     console.log("Modal overlay display style:", modalOverlay.style.display);
      const closeModal = document.querySelector('.close-modal');
    const saveEditArticleBtn = document.getElementById('save-edit-article-btn');
       const editArticleTypeNewsBtn = document.getElementById('edit-article-type-news');
       const editArticleTypeSocialBtn = document.getElementById('edit-article-type-social');
        const editArticleTypeVideoBtn = document.getElementById('edit-article-type-video');
        const editArticleSentimentPositiveBtn = document.getElementById('edit-article-sentiment-positive');
       const editArticleSentimentNegativeBtn = document.getElementById('edit-article-sentiment-negative');
      let editArticleType = article.type;
       let editArticleSentiment = article.sentiment;

    closeModal.addEventListener('click', () => {
         modalOverlay.style.display = 'none';
     });
     saveEditArticleBtn.addEventListener('click', saveEditedArticle);
      editArticleTypeNewsBtn.addEventListener('click', () => {
        editArticleType = 'news';
        editArticleTypeNewsBtn.style.backgroundColor = '#ddd';
         editArticleTypeSocialBtn.style.backgroundColor = '#f0f0f0';
         editArticleTypeVideoBtn.style.backgroundColor = '#f0f0f0';
     });
      editArticleTypeSocialBtn.addEventListener('click', () => {
        editArticleType = 'social';
          editArticleTypeNewsBtn.style.backgroundColor = '#f0f0f0';
         editArticleTypeSocialBtn.style.backgroundColor = '#ddd';
        editArticleTypeVideoBtn.style.backgroundColor = '#f0f0f0';
     });
       editArticleTypeVideoBtn.addEventListener('click', () => {
          editArticleType = 'video';
            editArticleTypeNewsBtn.style.backgroundColor = '#f0f0f0';
        editArticleTypeSocialBtn.style.backgroundColor = '#f0f0f0';
        editArticleTypeVideoBtn.style.backgroundColor = '#ddd';
     });
     editArticleSentimentPositiveBtn.addEventListener('click', () => {
        editArticleSentiment = 'positive';
        editArticleSentimentPositiveBtn.style.backgroundColor = '#ddd';
        editArticleSentimentNegativeBtn.style.backgroundColor = '#f0f0f0';
     });
    editArticleSentimentNegativeBtn.addEventListener('click', () => {
        editArticleSentiment = 'negative';
        editArticleSentimentPositiveBtn.style.backgroundColor = '#f0f0f0';
       editArticleSentimentNegativeBtn.style.backgroundColor = '#ddd';
    });


    function saveEditedArticle() {
        const source = document.getElementById('edit-article-source').value;
         const date = document.getElementById('edit-article-date').value;
        const title = document.getElementById('edit-article-title').value;
        const text = document.getElementById('edit-article-text').value;
        const views = document.getElementById('edit-article-views').value;
        const url = document.getElementById('edit-article-url').value;
          const addressesInput = document.getElementById('edit-article-addresses').value;
           const speakerInput = document.getElementById('edit-article-speaker').value;
           const startTime = document.getElementById('edit-article-start-time').value;
         const isInspection = document.getElementById('edit-article-inspection').checked;
        const isMostViewed = document.getElementById('edit-article-most-viewed').checked;
         const social = document.getElementById('edit-article-social').value;
        const addresses = addressesInput.split('\n').map(addr => addr.trim()).filter(addr => addr);
         const speaker = speakerInput.split('\n').map(sp => sp.trim()).filter(sp => sp);
        console.log("Data before update:", {
            source,
             date,
            title,
            text,
            views,
            url,
            addresses,
            speaker,
            startTime,
             isInspection,
            isMostViewed,
            social
         });

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
         console.log("Updated article:", updatedArticle)
        updateArticle(updatedArticle); // Исправленный вызов
         console.log("editArticle called with:", updatedArticle);
         modalOverlay.style.display = 'none';
        updateMostViewed();
        updateArticleList();
    }
}