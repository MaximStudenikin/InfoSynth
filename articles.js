import { closeModal, createEditArticleModal } from "./modules.js";

export let articles = JSON.parse(localStorage.getItem('articles')) || [];

function saveArticles() {
    localStorage.setItem('articles', JSON.stringify(articles));
}

export function addArticle(newArticle) {
    articles.push(newArticle);
    saveArticles();
    renderArticles();
     import("./modules.js").then(modules => {
        modules.renderStatistic();
    });
}

export function deleteArticle(articleId) {
    articles = articles.filter(article => article.id !== articleId);
    saveArticles();
    renderArticles();
     import("./modules.js").then(modules => {
        modules.renderStatistic();
    });
}

export function updateArticle(updatedArticle) {
    articles = articles.map(article =>
        article.id === updatedArticle.id ? updatedArticle : article
    );
    saveArticles();
    renderArticles();
    import("./modules.js").then(modules => {
        modules.renderStatistic();
    });
}

export function renderArticles(filterType = 'all', searchText = '') {
    console.log("renderArticles called with:", articles, filterType, searchText);
    const positiveList = document.getElementById('positive-list');
    const negativeList = document.getElementById('negative-list');
    if (!positiveList || !negativeList) {
        console.error("positiveList or negativeList element not found");
        return;
    }

    positiveList.innerHTML = '';
    negativeList.innerHTML = '';


    let filteredArticles = [...articles];

    if (searchText) {
        const lowerSearchText = searchText.toLowerCase();
        filteredArticles = filteredArticles.filter(article =>
            article.title.toLowerCase().includes(lowerSearchText) ||
            article.text.toLowerCase().includes(lowerSearchText) ||
            article.source.toLowerCase().includes(lowerSearchText)
        );
    }

    if (filterType !== 'all') {
        filteredArticles = filteredArticles.filter(article => article.sentiment === filterType);
    }
    if (filterType === 'inspection') {
       filteredArticles = filteredArticles.filter(article => article.isInspection);
    }

    if (filteredArticles.length === 0) {
      positiveList.innerHTML = '<p>Статьи не найдены.</p>';
      negativeList.innerHTML = '<p>Статьи не найдены.</p>';
        return;
    }


    filteredArticles.forEach(article => {
        const articleElement = renderArticle(article);
        if (article.sentiment === 'positive') {
             positiveList.appendChild(articleElement);
        } else if (article.sentiment === 'negative') {
            negativeList.appendChild(articleElement);
        } else {
            positiveList.appendChild(articleElement);
        }
    });
    positiveList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-article-btn')) {
            const articleId = parseInt(event.target.dataset.id, 10);
            deleteArticle(articleId);
        }
        if (event.target.classList.contains('edit-article-btn')) {
            const articleId = parseInt(event.target.dataset.id, 10);
            createEditArticleModal(articleId);
        }
        if (event.target.classList.contains('copy-article-btn')) {
             const articleId = parseInt(event.target.dataset.id, 10);
            copyArticleToClipboard(articleId);
        }
    });
       negativeList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-article-btn')) {
            const articleId = parseInt(event.target.dataset.id, 10);
            deleteArticle(articleId);
        }
        if (event.target.classList.contains('edit-article-btn')) {
            const articleId = parseInt(event.target.dataset.id, 10);
            createEditArticleModal(articleId);
        }
           if (event.target.classList.contains('copy-article-btn')) {
            const articleId = parseInt(event.target.dataset.id, 10);
               copyArticleToClipboard(articleId);
           }
    });
}

function renderArticle(article) {
    console.log("renderArticle called for:", article);

    const articleElement = document.createElement('div');
    articleElement.classList.add('article-preview');

   const isMostViewedClass = article.isMostViewed ? 'most-viewed' : '';
   const isInspectionClass = article.isInspection ? 'inspection-post' : '';
   if (isMostViewedClass) {
       articleElement.classList.add(isMostViewedClass);
    }
    if (isInspectionClass) {
       articleElement.classList.add(isInspectionClass);
    }
    articleElement.draggable = true;
    articleElement.dataset.id = article.id;


    let socialHTML = '';
    if (article.type === 'social' && article.social !== 'none') {
        socialHTML = `<span>Соц.сеть - ${article.social}</span>`;
    }


     let viewsHTML = '';
    if(article.type === 'social' && article.views) {
        viewsHTML = `<span>(${article.views})</span>`;
    }


    let addressesHTML = '';
    if (article.addresses && article.addresses.length > 0) {
        addressesHTML = `<p><strong>Адреса:</strong> ${article.addresses.join(', ')}</p>`;
    }

    let speakerHTML = '';
    if (article.speaker && article.speaker.length > 0) {
        speakerHTML = `<p><strong>Спикеры:</strong> ${article.speaker.join(', ')}</p>`;
    }

    const startTimeHTML = article.startTime ? `<p><strong>Начало с:</strong> ${article.startTime}</p>` : '';



   const urlHTML = article.url ? `<p>Ссылка: <a href="${article.url}" target="_blank">${article.url}</a></p>` : '';


    articleElement.innerHTML = `
        ${socialHTML} <span>Источник: ${article.source}</span> ${viewsHTML}
        <p>Дата: ${article.date}</p>
        <h3>${article.title}</h3>
        <p>${article.text.length > 500 ? article.text.substring(0, 500) + '...' : article.text}</p>
       ${addressesHTML}
       ${speakerHTML}
        ${startTimeHTML}
       ${urlHTML}
        <div class="article-actions">
        <button class="copy-article-btn" data-id="${article.id}">Копировать</button>
            <button class="edit-article-btn" data-id="${article.id}">Редактировать</button>
            <button class="delete-article-btn" data-id="${article.id}">Удалить</button>
        </div>
    `;

    return articleElement;
}

function copyArticleToClipboard(articleId) {
    const article = articles.find(article => article.id === articleId);
    if (!article) {
        console.error(`Article with id ${articleId} not found`);
        return;
    }
    const textToCopy = `
Заголовок: ${article.title}
Источник: ${article.source}
Дата: ${article.date}
Тональность: ${article.sentiment}
${article.type === 'social' && article.social !== 'none' ? `Социальная сеть: ${article.social}` : ''}
${article.views ? `Просмотры: ${article.views}` : ''}
Текст: ${article.text}
${article.addresses && article.addresses.length > 0 ? `Адреса: ${article.addresses.join(', ')}` : ''}
${article.speaker && article.speaker.length > 0 ? `Спикеры: ${article.speaker.join(', ')}` : ''}
${article.startTime ? `Начало видео: ${article.startTime}` : ''}
${article.url ? `Ссылка: ${article.url}` : ''}
    `;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Статья скопирована в буфер обмена!');
    }).catch(err => {
        console.error('Failed to copy article: ', err);
        alert('Не удалось скопировать статью в буфер обмена.');
    });
}