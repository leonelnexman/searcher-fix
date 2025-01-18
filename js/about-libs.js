const lenis = new Lenis();

lenis.on("scroll", (e) => {});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

let screenWidth = document.documentElement.clientWidth;
//lettter
function showLetter(letterId) {
  const letterItems = document.querySelectorAll(".letter-display");
  const listItems = document.querySelectorAll("ul li");

  // Скрыть все письма
  gsap.to(letterItems, { duration: 0.5, opacity: 0, display: "none" });

  // Показать выбранное письмо
  const selectedLetter = document.getElementById(`letter-${letterId}`);
  gsap.to(selectedLetter, {
    duration: 0.5,
    opacity: 1,
    display: "block",
    width: "fit-content",
  });

  // Удалить активный класс у всех элементов списка
  listItems.forEach((item) => item.classList.remove("active"));
  const selectedListItem = document.getElementById(`letter-item-${letterId}`);
  selectedListItem.classList.add("active");
}

// Назначьте обработчики событий наведения для всех элементов списка
const listItems = document.querySelectorAll("ul li");
listItems.forEach((item, index) => {
  // Показывать письмо при наведении
  item.addEventListener("mouseenter", () => showLetter(index + 1));

  // Скрывать письмо при уходе мыши
  item.addEventListener("mouseleave", () => {
    const letterItems = document.querySelectorAll(".letter-display");
    gsap.to(letterItems, { duration: 0.5, opacity: 0, display: "none" });
    item.classList.remove("active"); // Убираем активный класс при уходе мыши
  });

  // Скачать PDF при клике
  item.addEventListener("click", () => {
    const pdfUrl = item.getAttribute("data-pdf");
    if (pdfUrl) {
      // Создаем временный элемент для скачивания
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = ""; // Это позволит скачать файл с указанным именем
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  });
});

window.onload = function () {
  showLetter(1); // Показываем первую новость по умолчанию
};

const swiper = new Swiper(".program-conteiner .swiper-container", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: ".programm-cover .swiper-button-next",
    prevEl: ".programm-cover .swiper-button-prev",
  },
  pagination: {
    el: ".programm-cover .swiper-pagination",
    type: "fraction",
  },
});

// mission-swiper
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;

  return rect.top === 0 && rect.bottom === windowHeight;
}
const missionSwiperConfig = {
  slidesPerView: 1.1, // Показывать 1.5 слайда одновременно
  spaceBetween: 20,
  pagination: {
    el: ".mission-swiper .swiper-pagination",
    type: "fraction",
    clickable: true,
    renderFraction: function (currentClass, totalClass) {
      return `<span class="${currentClass}"></span> &mdash; <span class="${totalClass}"></span>`;
    },
  },
  navigation: {
    nextEl: ".mission-swiper .swiper-button-next",
    prevEl: ".mission-swiper .swiper-button-prev",
  },
  mousewheel: screenWidth > 768 ? true : false,
  on: {
    slideChange: function () {
      const totalSlides = this.slides.length;
      const currentSlideIndex = this.realIndex;

      const blueBarPosition = currentSlideIndex * 103.3;
      document.querySelector(
        ".blue-bar"
      ).style.transform = `translateX(${blueBarPosition}%)`;
    },
    slideChangeTransitionStart: function () {
      const isMissionInView = isElementInViewport(
        document.querySelector(".mission")
      );
      if (!isMissionInView) {
        lenis.stop();
      }
    },
    slideChangeTransitionEnd: function () {
      const isMissionInView = isElementInViewport(
        document.querySelector(".mission")
      );
      if (!isMissionInView) {
        lenis.start();
      }
    },
    mousewheel: function () {
      const isMissionInView = isElementInViewport(
        document.querySelector(".mission")
      );
      if (!isMissionInView) {
        lenis.stop();
      }
    },
    mousewheelEnd: function () {
      const isMissionInView = isElementInViewport(
        document.querySelector(".mission")
      );
      if (!isMissionInView) {
        lenis.start();
      }
    },
  },
};

// Инициализация Swiper только для .mission-swiper
const missionSwiper = new Swiper(
  ".mission-swiper .swiper-container",
  missionSwiperConfig
);

// levels
function updateActiveSectionAbout() {
  const sections = document.querySelectorAll(".user-level div");
  const hrElements = document.querySelectorAll(".user-level hr");
  const pElements = document.querySelectorAll(".user-level p");
  const sectionElements = document.querySelectorAll(".panel");
  const menu = document.querySelector(".menu-items");
  const menuImage = document.querySelector(".menu-img");
  const windowHeight = window.innerHeight;

  let currentSection = null;

  sectionElements.forEach((section, index) => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
      currentSection = sections[index];

      if (index === 0 || index === 3 || index === 7 || index === 8) {
        menu.style.color = "#E0E0E0";
        menuImage.src = "../assets/icons/menu-white.svg";
        hrElements.forEach((hr) => {
          hr.style.backgroundColor = "#E0E0E0";
        });
        pElements.forEach((p) => {
          p.style.color = "#E0E0E0";
        });
      } else {
        menu.style.color = "#050C1A";
        menuImage.src = "../assets/icons/menu.svg";
        hrElements.forEach((hr) => {
          hr.style.backgroundColor = "#050C1A";
        });
        pElements.forEach((p) => {
          p.style.color = "#050C1A";
        });
      }
    }
  });

  sections.forEach((section) => section.classList.remove("active"));

  if (currentSection) {
    currentSection.classList.add("active");
  }
}
document.addEventListener("scroll", updateActiveSectionAbout);
window.addEventListener("load", updateActiveSectionAbout);

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // Инициализация Swiper внутри .counter
  const swiper = new Swiper(".counter .swiper-container", {
    // Опции Swiper
    slidesPerView: 1.5, // Показывать 1 слайд за раз
    spaceBetween: 10, // Расстояние между слайдами
    navigation: {
      nextEl: ".counter .swiper-button-next", // Кнопка следующего слайда
      prevEl: ".counter .swiper-button-prev", // Кнопка предыдущего слайда
    },
    pagination: {
      el: ".counter .swiper-pagination", // Пагинация
      clickable: true, // Включить кликабельность пагинации
    },
    loop: false, // Зацикливать слайды
  });
});
