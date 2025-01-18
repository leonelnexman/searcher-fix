function createBreadcrumbs() {
  const breadcrumbsContainer = document.getElementById("breadcrumbs");
  const path = window.location.pathname.split("/").filter((item) => item);

  const pageNames = {
    "": "Главная",
    about: "О компании",
    news: "Новости",
    "about.html": "О компании",
    "history.html": "История",
    "partners.html": "Контакты",
    "activity.html": "Деятельность",
    "equipment.html": "Оборудование",
    "news.html": "Новости",
    "team.html": "Команда",
    "ground.html": "Суша",
    "vacancy.html": "Вакансии",
    "news-more.html":
      "01.09.24 - в России запустят приложение для обнаружения взрывных устройств",
    projects: "Проекты",
    "projects.html": "Проекты",
    "archeology-main.html": "Археология",
    "infrastructure-main.html": "Инфраструктура",
    "water-main.html": "Акватория",
    "water-research-main.html": "Акватория изыскания",
    archeology: "Археология",
    "neptune.html": "Археология",
    design: "Проектирование",
    "design.html": "Проектирование",
    infrastructure: "Инфраструктура",
    "dnr.html": "Инфраструктура",
    water: "Акватория",
    "kamchatka.html": "Камчатка",
    "murmansk.html": "Мурманск",
    "saint-petersburg.html": "Санкт-Питербугр",
    "seg.html": "СЭГ",
    "water-research": "Акватория изыскания",
    "grinding.html": "Приразмольное",
    "stockman.html": "Штокман",
    services: "Услуги",
    "services.html": "Услуги",
    "services-more.html": "Страница услуги",
    "activity.html": "Виды деятельности",
    activity: "Виды деятельности",
    "gruond.html": "Суши",
    "water.html": "Акватория",
    "policy.html": "Политика",
    "work-process.html": "Как мы работаем",
    "media.html": "Медиа",
    "faq.html": "Вопросы и ответы",
    "reviews.html": "Отзывы",
    "donetsk.html": "Донетск",
    "demining.html": "Разминирование",
    "documentation.html": "Страница услуги",
    "hydrocarbons.html": "Страница услуги",
    "military-burials.html": "Страница услуги",
    "survey.html": "Страница услуги",
    "tnpa.html": "Страница услуги",
    "water-area.html": "Страница услуги",
    "water-survey.html": "Страница услуги",
  };

  const excludeFolders = ["page", "searcher"]; // Список папок для исключения

  // Если находимся на главной странице
  if (path.length === 0) {
    breadcrumbsContainer.innerHTML = '<a href="/" class="active">Главная</a>';
    return;
  }

  // Начинаем с главной страницы
  let breadcrumbsHTML = '<a href="/">Главная</a>';

  // Перебираем каждую часть пути
  path.forEach((folder, index) => {
    if (excludeFolders.includes(folder)) return; // Пропускаем папки из списка исключений

    const isLast = index === path.length - 1;
    const url =
      "/" +
      path
        .filter((item) => !excludeFolders.includes(item))
        .slice(0, index + 1)
        .join("/");

    // Получаем имя для папки или файла из pageNames
    const pageName = pageNames[folder] || folder;

    // Если это последний элемент, делаем его активным
    if (isLast) {
      breadcrumbsHTML += ` <span>></span> <a href="${url}" class="active">${pageName}</a>`;
    } else {
      breadcrumbsHTML += ` <span>></span> <a href="${url}">${pageName}</a>`;
    }
  });

  // Вставляем хлебные крошки в контейнер
  breadcrumbsContainer.innerHTML = breadcrumbsHTML;
}

// Вызов функции при загрузке страницы
document.addEventListener("DOMContentLoaded", createBreadcrumbs);
