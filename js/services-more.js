const lenis = new Lenis();

lenis.on("scroll", (e) => {});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Установка начального состояния карточек команды
  gsap.set(".team-card", { opacity: 0, y: 50 });

  // Селекторы для карточек команды
  const cardSelectors = [
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
    "eighth",
    "ninth",
    "teenth",
    "eleventh",
    "twelfth",
    "thirteenth",
    "fourteenth",
  ];

  // Опции для анимации появления карточек
  const cardOptions = {
    opacity: 1,
    y: 0,
    ease: "power2.out", // Плавность появления
  };

  // Таймлайн для анимации карточек команды
  const tlTeam = gsap.timeline({
    scrollTrigger: {
      trigger: ".team", // Секция, которая запускает анимацию
      start: "top top", // Когда верх секции `.team` совпадает с верхом окна
      end: "80% center", // Когда 80% высоты окна доходят до середины секции
      snap: {
        snapTo: "labels", // Автоматическое выравнивание по меткам таймлайна
        ease: "power1.inOut", // Плавность привязки
      },
      scrub: true, // Синхронизация со скроллом
      once: true, // Анимация проигрывается только один раз
    },
  });

  // Добавление анимации появления для каждой карточки
  cardSelectors.forEach((selector) => {
    tlTeam.to(`.team-card-${selector}`, cardOptions);
  });
});

// methodology-swiper
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;

  return rect.top === 0 && rect.bottom === windowHeight;
}

document.addEventListener("DOMContentLoaded", function () {
  const partnersSwiperConfig = {
    slidesPerView: 1.4,
    spaceBetween: 10,
    pagination: {
      el: ".methodology-swiper .swiper-pagination",
      type: "custom",
      renderCustom: function (swiper, current, total) {
        const totalSlides = total - 1; // Исключаем последний слайд
        return `<span>${current}</span> &mdash; <span>${totalSlides}</span>`;
      },
    },
    navigation: {
      nextEl: ".methodology-swiper .swiper-button-next",
      prevEl: ".methodology-swiper .swiper-button-prev",
    },
    on: {
      slideChange: function () {
        const totalSlides = this.slides.length; // Общее количество слайдов
        const currentSlideIndex = this.realIndex; // Индекс текущего слайда (начинается с 0)

        const blueBarPosition = currentSlideIndex * 77;
        document.querySelector(
          ".blue-bar"
        ).style.transform = `translateX(${blueBarPosition}%)`;

        // Отключение кнопки "Next" на предпоследнем слайде
        const nextButton = document.querySelector(
          ".methodology-swiper .swiper-button-next"
        );

        if (currentSlideIndex === totalSlides - 2) {
          nextButton.classList.add("swiper-button-disabled");
          nextButton.disabled = true;
        } else {
          nextButton.classList.remove("swiper-button-disabled");
          nextButton.disabled = false;
        }
      },
      slideChangeTransitionStart: function () {
        const isPartnersInView = isElementInViewport(
          document.querySelector(".methodology-swiper")
        );
        if (!isPartnersInView) {
          lenis.stop();
        }
      },
      slideChangeTransitionEnd: function () {
        const isPartnersInView = isElementInViewport(
          document.querySelector(".methodology-swiper")
        );
        if (!isPartnersInView) {
          lenis.start();
        }
      },
      mousewheel: function () {
        const isPartnersInView = isElementInViewport(
          document.querySelector(".methodology-swiper")
        );
        if (!isPartnersInView) {
          lenis.stop();
        }
      },
      mousewheelEnd: function () {
        const isPartnersInView = isElementInViewport(
          document.querySelector(".methodology-swiper")
        );
        if (!isPartnersInView) {
          lenis.start();
        }
      },
    },
  };

  const partnersSwiper = new Swiper(
    ".methodology-swiper .swiper-container",
    partnersSwiperConfig
  );
});

// video
document.addEventListener("DOMContentLoaded", function () {
  const playButton = document.getElementById("playButton");
  const videoElement = document.getElementById("videoElement");

  // Функция для переключения класса active
  function togglePlayButton() {
    if (videoElement.paused) {
      playButton.classList.remove("active"); // Показать кнопку
    } else {
      playButton.classList.add("active"); // Скрыть кнопку
    }
  }

  // Запуск видео при нажатии на кнопку и добавление класса active
  playButton.addEventListener("click", function () {
    videoElement.play();
    playButton.classList.add("active");
  });

  // События play и pause для добавления/удаления класса active
  videoElement.addEventListener("play", togglePlayButton);
  videoElement.addEventListener("pause", togglePlayButton);
});

//lettter
function showLetter(letterId) {
  const letterItems = document.querySelectorAll(".letter-display");
  const listItems = document.querySelectorAll(".letter-block ul li");

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
  console.log(selectedListItem);
}

// Назначьте обработчики событий наведения для всех элементов списка
const listItems = document.querySelectorAll(".letter-block ul li");
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

// content-box
document.addEventListener("DOMContentLoaded", function () {
  const objectsSlides = document.querySelectorAll(".objects-slide");
  const firstBlock = objectsSlides[0].querySelector(".objects-block");
  const firstContent = objectsSlides[0].querySelector(".objects-content");
  const firstIcon = firstContent.querySelector(".toggle-icon");

  firstBlock.classList.add("active");
  firstContent.classList.add("active");
  firstIcon.src = "../../../assets/icons/minus.svg";

  objectsSlides.forEach((slide) => {
    const content = slide.querySelector(".objects-content");
    const block = slide.querySelector(".objects-block");
    const icon = content.querySelector(".toggle-icon");

    content.addEventListener("click", () => {
      const isActive = block.classList.contains("active");

      objectsSlides.forEach((slide) => {
        const block = slide.querySelector(".objects-block");
        block.classList.remove("active");
        slide.querySelector(".objects-content").classList.remove("active");
        slide.querySelector(".toggle-icon").src =
          "../../../assets/icons/plus.svg";
      });

      if (!isActive) {
        block.classList.add("active");
        content.classList.add("active");
        icon.src = "../../../assets/icons/minus.svg";
      }
    });
  });
});

const projectsSwiperElement = document.querySelector(
  ".projects-content .swiper"
);

if (projectsSwiperElement) {
  const projectsSwiper = new Swiper(projectsSwiperElement, {
    loop: false,
    navigation: {
      nextEl: document.querySelector(".projects-button-next"),
      prevEl: document.querySelector(".projects-button-prev"),
    },
    pagination: {
      el: document.querySelector(".projects-swiper-pagination"),
      type: "fraction",
    },
    on: {
      init: function () {
        const slides = this.slides;
        slides.forEach((slide) => {
          if (!slide.classList.contains("swiper-slide-active")) {
            slide.style.opacity = "0";
            slide.style.transition = "opacity 1s ease";
          }
        });
      },
      slideChangeTransitionStart: function () {
        const activeSlide = this.slides[this.activeIndex];
        activeSlide.style.opacity = "1";
      },
      slideChangeTransitionEnd: function () {
        const slides = this.slides;
        slides.forEach((slide) => {
          if (!slide.classList.contains("swiper-slide-active")) {
            slide.style.opacity = "0";
          }
        });
      },
    },
  });
}

gsap.registerPlugin(ScrollTrigger);

const containers = document.querySelectorAll(".projects-slide");

containers.forEach((container) => {
  const image = container.querySelector(".projects-img img");
  container.addEventListener("mousemove", function (event) {
    const containerRect = container.getBoundingClientRect();
    const mouseX = event.clientX - containerRect.left;
    const mouseY = event.clientY - containerRect.top;

    const offsetX = mouseX - image.offsetWidth / 2 - 200;
    const offsetY = mouseY - image.offsetHeight / 2 - 200;
    image.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });

  image.style.transition = "transform 0.1s ease-out";
});

// fullcsreen
const projectContent = document.querySelector(".projects-content");
const swiperSlide = document.querySelector(".swiper-slide");
const imgParent = document.querySelectorAll(".projects-img");
const projectsWidgets = document.querySelector(".projects-widgets");

document.querySelectorAll(".projects-slide").forEach((slide) => {
  const image = slide.querySelector(".projects-img");

  slide.addEventListener("click", () => {
    if (image.classList.contains("full-screen")) {
      // Уменьшаем обратно до оригинального размера
      gsap.to(image, {
        duration: 1,
        width: "50.06rem",
        height: "28.56rem",
        top: "50%",
        left: "50%",
        x: "-50%",
        y: "-50%",
        position: "absolute",
        zIndex: 0,
        ease: "power2.out",
      });
      gsap.to(swiperSlide, {
        width: "100%",
      });
      gsap.to(projectContent, {
        duration: 1,
        width: "90rem",
        height: "50rem",
        ease: "power2.out",
      });
      gsap.to(projectsWidgets, {
        position: "absolute",
        zIndex: 10,
      });
      image.classList.remove("full-screen");
    } else {
      image.style.transform = "";
      gsap.to(image, {
        duration: 1,
        width: "100vw",
        height: "100vh",
        top: "0",
        left: "0",
        x: "0",
        y: "0",
        position: "fixed",
        zIndex: 100,
        ease: "power2.out",
      });
      gsap.to(swiperSlide, {
        width: "100vh",
      });
      gsap.to(projectContent, {
        duration: 1,
        width: "100%",
        height: "100%",
        ease: "power2.out",
      });
      gsap.to(projectsWidgets, {
        position: "relative",
        zIndex: 0,
      });
      image.classList.add("full-screen");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".count");

  const updateCount = (counter) => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;

    let speed;
    switch (Array.from(counters).indexOf(counter)) {
      case 0:
        speed = 2000; // медленно
        break;
      case 1:
        speed = 500; // средне
        break;
      case 2:
        speed = 1800; // быстро
        break;
      default:
        speed = 2000;
    }

    const increment = target / (speed / 20);

    // Если текущий счётчик меньше целевого
    if (count < target) {
      // Обновляем счётчик
      counter.innerText = Math.ceil(count + increment);
      setTimeout(() => updateCount(counter), 20); // уменьшил время для более плавного обновления
    } else {
      counter.innerText = target; // Устанавливаем целевое значение
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCount(entry.target);
          observer.unobserve(entry.target); // Отключаем наблюдение после обновления
        }
      });
    },
    { threshold: 0.7 }
  );

  counters.forEach((counter) => {
    counter.innerText = "0"; // Инициализируем счётчик
    observer.observe(counter); // Наблюдаем за счётчиком
  });
});

// user-level
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

      if (index === 5 || index === 9) {
        menu.style.color = "#E0E0E0";
        menuImage.src = "../../../assets/icons/menu-white.svg";
        hrElements.forEach((hr) => {
          hr.style.backgroundColor = "#E0E0E0";
        });
        pElements.forEach((p) => {
          p.style.color = "#E0E0E0";
        });
      } else {
        menu.style.color = "#050C1A";
        menuImage.src = "../../../assets/icons/menu.svg";
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
