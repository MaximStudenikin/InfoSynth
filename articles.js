import { formatViews, formatDate, getSocialNetworkName } from "./utils.js";
import {updateMostViewed} from "./main.js";
import {filterArticles} from "./filter.js";
import {updateStatistic} from "./statistic.js"
import { removeEmoji } from "./utils.js";
import { createEditArticleModal } from "./modal.js";


export let articles = JSON.parse(localStorage.getItem('articles') || '[]');


export function updateArticleList() {
    const articleList = document.getElementById("article-list");
     const positiveList = document.getElementById("positive-list");
     const negativeList = document.getElementById("negative-list");
    articleList.innerHTML = "";
    positiveList.innerHTML = "";
    negativeList.innerHTML = "";
     const inspectionVideoList = document.getElementById('inspection-video-list');
    inspectionVideoList.innerHTML = '';

      articles.forEach((article, index) => {
        if (article.type === "video" || article.isInspectionVideo) {
           const li = document.createElement('li');
             li.dataset.id = article.id;
           li.textContent = `${index + 1}) ${article.source} - ${article.title} (начало с ${article.startTime})`;
               const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
             deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
            deleteBtn.addEventListener('click', () => deleteArticle(article.id));
            li.appendChild(deleteBtn);
             const editBtn = document.createElement('button');
            editBtn.classList.add('edit-btn');
            editBtn.innerHTML = '<i class="fas fa-edit"></i>';
            editBtn.addEventListener('click', () => editArticle(article.id));
            li.appendChild(editBtn);
           if(article.isInspectionVideo) {
            li.classList.add('inspection-video-item')
              inspectionVideoList.appendChild(li)
              return;
           }else if (article.type === "video") {
               inspectionVideoList.appendChild(li)
               return;
           }
        }
        const li = document.createElement("li");
         li.classList.add('article-item');
        if (article.isMostViewed){
            li.classList.add('most-viewed-item')
         }
         li.draggable = true;
        li.dataset.id = article.id;
        let sourceLine = "";
        if (article.type === "social") {
            const socialName = getSocialNetworkName(article.url);
            sourceLine += `${socialName ? `${socialName} - ` : ""}`;
        }
         if(article.source) {
             sourceLine += `${article.source}`;
         }
        if (article.type === "social" && article.views) {
            sourceLine += ` (${formatViews(article.views)})`;
         }
        if (sourceLine) {
             li.innerHTML += `<h1 id="edition">${index + 1}) ${sourceLine}</h1>`;
        }
         if (article.date) {
             li.innerHTML += `<p id="date">${formatDate(article.date)}</p>`;
        }
        if (article.title) {
              li.innerHTML += `<h3 id="title">${article.title}</h3>`;
        }
        if (article.text) {
            li.innerHTML += `<p id="text">${article.text.substring(0, 100)}...</p>`;
        }
         if (article.addresses && article.addresses.length > 0 && !article.addresses.every(addr => !addr || addr.trim().toLowerCase() === "нет")) {
            li.innerHTML += `<p id="adress">Адрес: ${article.addresses
               .filter((addr) => addr && addr.trim().toLowerCase() !== "нет")
               .join(", ")}</p>`;
        }
          if(article.startTime) {
            li.innerHTML += `<p id="start_time">Начало с ${article.startTime}</p>`;
        }
        if (article.speaker && article.speaker.length > 0 && !article.speaker.every(speaker => !speaker || speaker.trim().toLowerCase() === "нет")) {
            li.innerHTML += `<p id="speaker">Спикер: ${article.speaker
                .filter((speaker) => speaker && speaker.trim().toLowerCase() !== "нет")
                .join("<br>")}</p>`;
        }
         if (article.url) {
             li.innerHTML += `<p><a id="ref" href="${article.url}" target="_blank">${article.url}</a></p>`;
        }
        const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
             deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
             deleteBtn.addEventListener('click', () => deleteArticle(article.id));
            li.appendChild(deleteBtn);
              const editBtn = document.createElement('button');
            editBtn.classList.add('edit-btn');
            editBtn.innerHTML = '<i class="fas fa-edit"></i>';
            editBtn.addEventListener('click', () => editArticle(article.id));
            li.appendChild(editBtn);


         if (article.sentiment === "positive") {
            positiveList.appendChild(li);
         } else if (article.sentiment === "negative") {
           negativeList.appendChild(li);
         }else{
          articleList.appendChild(li)
         }
         li.addEventListener('dragstart', (event) => {
             event.dataTransfer.setData('text/plain', event.target.dataset.id);
             event.target.classList.add('dragging');
         });
           li.addEventListener('dragend', (event) => {
             event.target.classList.remove('dragging');
        });
    });

}

export function saveArticles() {
    localStorage.setItem('articles', JSON.stringify(articles));
}

export function addArticle(article) {
    articles.push(article);
    saveArticles();
     updateArticleList();
       updateStatistic();
     updateMostViewed();
     filterArticles();
}

export function deleteArticle(id) {
    articles = articles.filter(article => article.id !== id);
    saveArticles();
     updateArticleList();
       updateStatistic();
     updateMostViewed();
     filterArticles();
}

export function clearText(text) {
  if (!text) return '';

  let cleanedText = removeEmoji(text);
    cleanedText = cleanedText.replace(/\s+/g, ' ').trim();

  return cleanedText;
}

export function updateArticleSentiment(id, sentiment) {
      const articleIndex = articles.findIndex(article => article.id === id);
    if (articleIndex !== -1) {
        articles[articleIndex].sentiment = sentiment;
        saveArticles();
        updateArticleList();
    }
}
 export function editArticle(id) {
    const article = articles.find(article => article.id === id);
    if (article) {
       createEditArticleModal(article);
    }
}
 export function updateArticle(updatedArticle) {
    const index = articles.findIndex(article => article.id === updatedArticle.id);
    if (index !== -1) {
        articles[index] = updatedArticle;
        saveArticles();
         updateArticleList();
           updateStatistic();
         updateMostViewed();
         filterArticles();
    }
}