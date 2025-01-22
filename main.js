import { updateArticleList, articles, saveArticles, addArticle, deleteArticle, clearText, updateArticleSentiment, editArticle } from "./articles.js";
import { createAddArticleModal, createAddMostViewedPostModal, createEditArticleModal } from "./modal.js";
import { handleDragOver, handleDrop, handleDragStart } from "./drag-and-drop.js";
import { formatDate, formatViews, getSocialNetworkName, findAddresses } from "./utils.js";
// импорт docx - правильная ссылка на НЕМИНИФИЦИРОВАННУЮ версию!
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, AlignmentType } from 'https://cdn.jsdelivr.net/npm/docx@8.1.0/build/index.min.js';
import {filterArticles} from "./filter.js";
import {updateStatistic} from "./statistic.js"


const articleList = document.getElementById("article-list");
 const positiveList = document.getElementById("positive-list");
    const negativeList = document.getElementById("negative-list");
const addArticleBtn = document.getElementById("add-article-btn");
const addMostViewedPostBtn = document.getElementById("add-most-viewed-post-btn");
const clearDataBtn = document.getElementById("clear-data-btn");
const generateWordBtn = document.getElementById("generate-word-btn");
const updateHeaderBtn = document.getElementById("update-header-btn");
const documentTitle = document.getElementById("document-title");
const mostViewedContent = document.getElementById("most-viewed-content");
const articlesStatistic = document.getElementById('articles-statistic');
const searchInput = document.getElementById('search-input');
const filterArticlesSelect = document.getElementById('filter-articles');


articleList.addEventListener("dragover", handleDragOver);
articleList.addEventListener("drop", handleDrop);
positiveList.addEventListener("dragover", handleDragOver);
positiveList.addEventListener("drop", handleDrop);
negativeList.addEventListener("dragover", handleDragOver);
negativeList.addEventListener("drop", handleDrop);
searchInput.addEventListener('input', filterArticles);
filterArticlesSelect.addEventListener('change', filterArticles);

addArticleBtn.addEventListener("click", createAddArticleModal);
addMostViewedPostBtn.addEventListener("click", createAddMostViewedPostModal);
clearDataBtn.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});

updateHeaderBtn.addEventListener("click", () => {
    const startDateInput = document.getElementById("start-date");
    const endDateInput = document.getElementById("end-date");

    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    if (startDate && endDate) {
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);
        documentTitle.textContent = `Аналитическая справка по публикациям в СМИ за период с ${formattedStartDate} по ${formattedEndDate}`;
    } else {
        documentTitle.textContent = "Аналитическая справка по публикациям в СМИ";
    }
});

export function updateMostViewed() {
    if (articles.length === 0) {
        mostViewedContent.innerHTML = "<p>Нет данных</p>";
        return;
    }

    let mostViewed = articles.reduce((prev, current) => {
        const prevViews = prev.views ? parseInt(prev.views) : 0;
        const currentViews = current.views ? parseInt(current.views) : 0;
        if (current.type === 'social' && currentViews > prevViews) {
            return current;
        }
        return prev;
    }, articles[0]);
      const index = articles.findIndex(el => el === mostViewed)
      if (!mostViewed || (!mostViewed.views && mostViewed.type !== 'social')) {
        mostViewedContent.innerHTML = "<p>Нет данных</p>";
        return;
    }
    let mostViewedHTML = "";
    let sourceLine = "";
    if (mostViewed.type === "social") {
        const socialName = getSocialNetworkName(mostViewed.url);
        sourceLine += `${socialName ? `${socialName} - ` : ""}`;
    }
    if (mostViewed.source) {
        sourceLine += `${mostViewed.source}`;
    }
    if (mostViewed.type === "social" && mostViewed.views) {
        sourceLine += ` (${formatViews(mostViewed.views)})`;
    }
    if (sourceLine) {
        mostViewedHTML += `<h1 id="edition">${index + 1}) ${sourceLine}</h1>`;
    }
    if (mostViewed.date) {
        mostViewedHTML += `<p id="date">${formatDate(mostViewed.date)}</p>`;
    }
    if (mostViewed.title) {
        mostViewedHTML += `<h3 id="title">${mostViewed.title}</h3>`;
    }
    if (mostViewed.text) {
        mostViewedHTML += `<p id="text">${mostViewed.text.substring(0, 100)}...</p>`;
    }
    if (mostViewed.addresses && mostViewed.addresses.length > 0 && !mostViewed.addresses.every(addr => !addr || addr.trim().toLowerCase() === "нет")) {
        mostViewedHTML += `<p id="adress">Адрес: ${mostViewed.addresses
            .filter((addr) => addr && addr.trim().toLowerCase() !== "нет")
            .join(", ")}</p>`;
    }
    if (mostViewed.startTime) {
        mostViewedHTML += `<p id="start_time">Начало с ${mostViewed.startTime}</p>`;
    }
    if (mostViewed.speaker && mostViewed.speaker.length > 0 && !mostViewed.speaker.every(speaker => !speaker || speaker.trim().toLowerCase() === "нет")) {
        mostViewedHTML += `<p id="speaker">Спикер: ${mostViewed.speaker
            .filter((speaker) => speaker && speaker.trim().toLowerCase() !== "нет")
            .join("<br>")}</p>`;
    }
    if (mostViewed.url) {
        mostViewedHTML += `<p><a id="ref" href="${mostViewed.url}" target="_blank">${mostViewed.url}</a></p>`;
    }
    mostViewedContent.innerHTML = mostViewedHTML;
}

// Функция для скачивания Word-документа
async function generateWordDocument() {
    const docTitleText = documentTitle.textContent;
    const doc = new Document({
        styles: {
            paragraphStyles: [
                {
                    id: "Heading1",
                    name: "Heading 1",
                    basedOn: "Normal",
                    next: "Normal",
                    run: {
                        font: "Times New Roman",
                        size: 20,
                        bold: true,
                        color: "#000000",
                    },
                    paragraph: {
                        spacing: {
                            line: 0,
                        },
                         indent: {
                             left: 30,
                             right: 15,
                             top: 20,
                            bottom: 20,
                        }
                    }

                },
                {
                    id: "Heading2",
                    name: "Heading 2",
                    basedOn: "Normal",
                    next: "Normal",
                    run: {
                        font: "Times New Roman",
                        size: 20,
                        bold: true,
                        color: "#000000",
                    },
                      paragraph: {
                        spacing: {
                            line: 0,
                        },
                         indent: {
                             left: 30,
                             right: 15,
                            top: 20,
                           bottom: 20,
                        }
                    }
                },
                {
                    id: "Heading3",
                    name: "Heading 3",
                    basedOn: "Normal",
                    next: "Normal",
                    run: {
                        font: "Times New Roman",
                        size: 16,
                        bold: true,
                        color: "#000000",
                    },
                      paragraph: {
                        spacing: {
                            line: 0,
                        },
                         indent: {
                             left: 30,
                             right: 15,
                            top: 20,
                            bottom: 20,
                        }
                    }
                },
                {
                    id: "Normal",
                    name: "Normal",
                    basedOn: "Normal",
                    next: "Normal",
                    run: {
                        font: "Times New Roman",
                        size: 14,
                        color: "#000000",
                    },
                    paragraph: {
                        spacing: {
                            line: 0,
                        },
                         indent: {
                             left: 30,
                             right: 15,
                             top: 20,
                            bottom: 20,
                        }
                    }
                },
            ],
        },
        sections: [{
            children: [
               new Paragraph({
                    text: docTitleText,
                    style: "Heading1",
                }),
                new Paragraph({
                    text: articlesStatistic.textContent,
                    style: "Normal",
                }),
                new Paragraph({
                    text: 'Самая охватываемая запись:',
                    style: "Heading2",
                }),
                   new Paragraph({
                    children: [
                        new TextRun({
                            text: mostViewedContent.textContent,
                        }),
                    ],
                     style: "Normal",
                }),
                 new Paragraph({
                    text: 'Сюжеты с участием инспекции:',
                       style: "Heading2",
                 }),
                  ...(Array.from(document.getElementById('inspection-video-list').children).map(li => new Paragraph({
                    text: li.textContent,
                      style: "Normal",
                }))),
                  new Paragraph({
                    text: 'Список статей:',
                      style: "Heading2",
                 }),
                // Table to articles
                new Table({
                    rows: [
                         new TableRow({
                            children: [
                                new TableCell({
                                    children: [new Paragraph({ text: '№', style: "Heading3" })],
                                }),
                                new TableCell({
                                    children: [new Paragraph({ text: 'Издание',style: "Heading3" })],
                                }),
                                new TableCell({
                                    children: [new Paragraph({ text: 'Заголовок',style: "Heading3" })],
                                }),
                                 new TableCell({
                                    children: [new Paragraph({ text: 'Текст',style: "Heading3" })],
                                }),
                                   new TableCell({
                                    children: [new Paragraph({ text: 'Адрес',style: "Heading3" })],
                                }),
                                new TableCell({
                                    children: [new Paragraph({ text: 'Дата',style: "Heading3" })],
                                }),
                            ]
                        }),
                        ...articles.map((article, index) => new TableRow({
                            children: [
                                new TableCell({
                                    children: [new Paragraph({ text: String(index + 1), style: "Normal" })],
                                }),
                                new TableCell({
                                    children: [new Paragraph({ text: article.source, style: "Normal" })],
                                }),
                                new TableCell({
                                    children: [new Paragraph({ text: article.title, style: "Normal" })],
                                }),
                                 new TableCell({
                                    children: [new Paragraph({ text: article.text, style: "Normal" })],
                                }),
                                  new TableCell({
                                    children: [new Paragraph({ text: article.addresses.join(', '), style: "Normal" })],
                                }),
                                new TableCell({
                                    children: [new Paragraph({ text: formatDate(article.date), style: "Normal" })],
                                }),
                            ]
                        })),
                    ]
                })
            ],
        }],
    });

    const buffer = await Packer.toBuffer(doc);

    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${docTitleText}.docx`;
    a.click();
    window.URL.revokeObjectURL(url);
}

generateWordBtn.addEventListener("click", generateWordDocument);

updateArticleList();
updateMostViewed();