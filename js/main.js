const handleIntersectionWhite = (entries, observerWhite) => {
  entries.forEach((entry) => {
    // Проверяем, что элемент виден на экране
    if (entry.isIntersecting) {
      const rectangleWhite = entry.target.querySelector(
        ".animated-rectangle-white"
      );
      const rectangleParentWhite = entry.target.querySelector(
        ".rectangle-parent-white"
      );

      // Добавляем классы для анимации на оба элемента
      if (rectangleWhite && rectangleParentWhite) {
        rectangleWhite.classList.add("active");
        rectangleParentWhite.classList.add("active");
      }

      // Прекращаем отслеживание данного элемента
      observerWhite.unobserve(entry.target);
    }
  });
};

const observerWhite = new IntersectionObserver(handleIntersectionWhite, {
  threshold: 0.5,
});




//preloader
if (document.getElementById("preloader")) {
  document.addEventListener("DOMContentLoaded", function () {
    let progress = 0;
    const progressText = document.querySelector(".progress-text");
    const progressFill = document.querySelector(".progress-fill");
    const content = document.querySelector(".wrapper");
    const preloader = document.getElementById("preloader");
    const mainTitle = document.querySelector(".main-title");

    // Имитируем загрузку
    const interval = setInterval(function () {
      progress += 1;
      progressText.textContent = progress + "%";
      progressFill.style.width = progress + "%";
      mainTitle.style.opacity = "0";

      if (progress >= 100) {
        clearInterval(interval);

        preloader.classList.add("slide-up");

        setTimeout(() => {
          content.style.display = "block";
          content.style.opacity = 1;
          preloader.style.display = "none";
          mainTitle.style.opacity = "1";

          titleLadders();
          initIntersectionObserver();
          AOS.init({
            once: true,
          });
          ScrollTrigger.refresh();
          if (document.querySelector(".map")) {
            const mapBlock = document.querySelector(".map");
            observer.observe(mapBlock);
          }
          document.querySelectorAll(".main-subtitle-box").forEach((element) => {
            observerWhite.observe(element);
          });
        }, 1000);
      }
    }, 10);
  });
} else {
  titleLadders();
  initIntersectionObserver();
  AOS.init({
    once: true,
    offset: 100,
  });
}

// Функция анимации заголовков
function titleLadders() {
  const observerOptions = {
    root: null,
    threshold: 0.1, // Элементы становятся видимыми, когда 10% пересекают область видимости
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view"); // Добавляем класс in-view к <p>
        animateText(entry.target); // Запускаем анимацию текста
        observer.unobserve(entry.target); // Убираем наблюдение после анимации
      } else {
        entry.target.classList.remove("in-view"); // Убираем класс при скрытии
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  const titles = document.querySelectorAll(
    ".title p div, .title p, .title div, .title div p, .title .about-title-items p, .title h1"
  );

  titles.forEach((title) => observer.observe(title));

  const allTitles = document.querySelectorAll(
    ".title p div, .title p, .title div, .title div p, .title .about-title-items p, .title h1"
  );

  allTitles.forEach((p) => {
    const text = p.textContent;

    // Обрабатываем текст: разделяем на слова
    p.innerHTML = text
      .split(" ") // Разбиваем текст на слова
      .map((word) => {
        // Для каждого слова оборачиваем буквы в .letter
        const wordHTML = word
          .split("")
          .map((letter) => `<span class="letter">${letter}</span>`)
          .join("");

        // Оборачиваем слово в .word
        return `<span class="word">${wordHTML}</span>`;
      })
      .join(" "); // Соединяем слова пробелами
  });

  const animateText = (element) => {
    anime({
      targets: element.querySelectorAll(".letter"),
      opacity: [0, 1], // Начальная непрозрачность 0
      translateY: ["100%", "0%"], // Начальная позиция ниже
      duration: 1500,
      easing: "easeOutExpo",
      delay: anime.stagger(50, { start: 200 }),
    });
  };

  // Теперь добавляем наблюдение для всех заголовков
  allTitles.forEach((title) => observer.observe(title));
}

//
function initIntersectionObserver() {
  const animationBoxes = document.querySelectorAll(".animation-lines");
  const objectLines = document.querySelectorAll(".objects-additional hr");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 } // Настройка порога для срабатывания
  );

  animationBoxes.forEach((box) => observer.observe(box));
  objectLines.forEach((line) => observer.observe(line));
}

// main-video
const links = document.querySelectorAll(".hover-link");
const video = document.querySelector(".background-video");
const image = document.querySelector(".background-image");
const logo = document.querySelector(".logo-icon img");

links.forEach((link) => {
  link.addEventListener("mouseenter", function () {
    const videoSrc = this.getAttribute("data-video");
    video.src = videoSrc;
    video.style.opacity = "1";
    logo.src = "./assets/icons/video-logo.svg";
    video.play();
    image.style.opacity = "0";
  });

  link.addEventListener("mouseleave", function () {
    video.style.opacity = "0";
    video.pause();
    image.style.opacity = "1";
    logo.src = "./assets/icons/main-logo.svg";
  });
});
const screenSize = window.innerWidth < 768;

// map-rectangle
const handleIntersection = (entries, observer) => {
  console.log(screenSize);

  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const rectangle = document.querySelector(".animated-rectangle");
      const rectangleParent = document.querySelector(".rectangle-parent");
      rectangle.classList.add("active");
      rectangleParent.classList.add("active");

      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(handleIntersection, {
  threshold: 0.5,
});

// main


// Получаем все пути и названия регионов
const regions = document.querySelectorAll(".region");
const regionNames = document.querySelectorAll(".region-name");

// Функция для скрытия всех названий
function hideAllNames() {
  regionNames.forEach((name) => {
    name.classList.remove("visible");
  });
}

// Добавляем обработчики событий наведения на пути
regions.forEach((region) => {
  region.addEventListener("mouseenter", () => {
    hideAllNames(); // Скрываем все названия
    const className = region.classList[1]; // Получаем класс региона
    const correspondingName = document.querySelector(`.${className}`); // Находим соответствующее название
    correspondingName.classList.add("visible"); // Показываем название
  });

  region.addEventListener("mouseleave", () => {
    hideAllNames(); // Скрываем название при уходе курсора
  });
});

// contacts
let panels = gsap.utils.toArray(".last-section");

panels.forEach((panel, i) => {
  ScrollTrigger.create({
    trigger: panel,
    start: () => {
      // Начинаем, когда нижняя часть панели выходит за нижнюю границу окна
      return panel.offsetHeight < window.innerHeight
        ? "bottom bottom"
        : "top top";
    },
    end: () => {
      return "+=500%"; // Полная высота панели
    },
    pin: true,
    pinSpacing: false,
    scrub: true,
  });
});

// форма
document
  .getElementById("contacts-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Остановить стандартное поведение формы

    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    const checkbox = document.getElementById("checkbox-1");

    let valid = true;

    // Проверка поля "Ваше имя"
    if (!name.value.trim()) {
      valid = false;
      alert('Пожалуйста, заполните поле "Ваше имя".');
    }

    // Проверка поля "Телефон"
    if (!phone.value.trim()) {
      valid = false;
      alert('Пожалуйста, заполните поле "Телефон".');
    }

    // Проверка чекбокса
    if (!checkbox.checked) {
      valid = false;
      alert("Вы должны согласиться с условиями обработки данных.");
    }

    if (valid) {
      // Если все проверки пройдены, открыть модальное окно
      document.getElementById("success-modal").style.display = "block";
      document.getElementById("modal-overlay").style.display = "block";
    }
  });

// Функция для закрытия модального окна
function closeModal() {
  document.getElementById("success-modal").style.display = "none";
  document.getElementById("modal-overlay").style.display = "none";
}
