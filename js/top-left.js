gsap.registerPlugin(ScrollTrigger);

const imgAbout = document.querySelector(".about-image img");

gsap.fromTo(
  imgAbout,
  { opacity: 0, clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)" }, // Начальные значения
  {
    opacity: 1, // Конечная прозрачность
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Конечная маска (всё изображение)
    duration: 0.3, // Длительность анимации
    scrollTrigger: {
      trigger: ".about-image", // Триггер анимации
      start: "top 75%", // Начало анимации (когда верхняя часть элемента достигает 75% высоты окна)
      toggleActions: "play none none reverse", // Действия при прокрутке
    },
    ease: "power2.out", // Плавная анимация
  }
);

gsap.registerPlugin(ScrollTrigger);

const imgObjects = document.querySelectorAll(".objects-main-img img");

imgObjects.forEach((imgObject) => {
  gsap.fromTo(
    imgObject,
    { opacity: 0, clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)" }, // Начальные значения
    {
      opacity: 1, // Конечная прозрачность
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Конечная маска (всё изображение)
      duration: 1, // Длительность анимации
      scrollTrigger: {
        trigger: imgObject.parentElement, // Триггер анимации
        start: "top 100%", // Начало анимации (когда верхняя часть элемента достигает 75% высоты окна)
        toggleActions: "play none none reverse", // Действия при прокрутке
      },
      ease: "power2.out", // Плавная анимация
    }
  );
});
ScrollTrigger.refresh();

// Регистрация плагина GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Анимация для блока с формой
const contactForm = document.querySelector(".contacts-form");

gsap.fromTo(
  contactForm,
  {
    opacity: 0,
    clipPath: "polygon(-10% 110%, -10% 110%, -10% 110%, -10% 110%)", // Расширяем область на тень
  },
  {
    opacity: 1,
    clipPath: "polygon(-10% -10%, 110% -10%, 110% 110%, -10% 110%)", // Включаем тень
    duration: 1.5,
    scrollTrigger: {
      trigger: ".contacts",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
    ease: "power2.out",
  }
);

const imgMissions = document.querySelectorAll(".mission-img img");

// Инициализируем GSAP и ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Применяем анимацию ко всем изображениям
imgMissions.forEach((imgMission) => {
  gsap.fromTo(
    imgMission,
    { opacity: 0, clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)" }, // Начальные значения
    {
      opacity: 1, // Конечная прозрачность
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Конечная маска (всё изображение)
      duration: 1, // Длительность анимации
      scrollTrigger: {
        trigger: imgMission.parentElement, // Триггер анимации
        start: "top 100%", // Начало анимации (когда верхняя часть элемента достигает 75% высоты окна)
        toggleActions: "play none none reverse", // Действия при прокрутке
      },
      ease: "power2.out", // Плавная анимация
    }
  );
});
ScrollTrigger.refresh();

// Регистрация плагина GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const imgDevelopments = document.querySelectorAll(".development-img img");

// Инициализируем GSAP и ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Применяем анимацию ко всем изображениям
imgDevelopments.forEach((imgDevelopment) => {
  gsap.fromTo(
    imgDevelopment,
    { opacity: 0, clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)" }, // Начальные значения
    {
      opacity: 1, // Конечная прозрачность
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Конечная маска (всё изображение)
      duration: 0.5, // Длительность анимации
      scrollTrigger: {
        trigger: imgDevelopment.parentElement, // Триггер анимации
        start: "top 100%", // Начало анимации (когда верхняя часть элемента достигает 75% высоты окна)
        toggleActions: "play none none none", // Действия при прокрутке
        once: true,
      },
      ease: "power2.out", // Плавная анимация
    }
  );
});
ScrollTrigger.refresh();

// Регистрация плагина GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const imgDevelopments2 = document.querySelectorAll(".development2-img img");

// Инициализируем GSAP и ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Применяем анимацию ко всем изображениям
imgDevelopments2.forEach((imgDevelopment) => {
  gsap.fromTo(
    imgDevelopment,
    { opacity: 0, clipPath: "polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%)" }, // Начальные значения
    {
      opacity: 1, // Конечная прозрачность
      clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)", // Конечная маска (всё изображение)
      duration: 0.5, // Длительность анимации
      scrollTrigger: {
        trigger: imgDevelopment.parentElement, // Триггер анимации
        start: "top 100%", // Начало анимации (когда верхняя часть элемента достигает 100% высоты окна)
        toggleActions: "play none none none", // Действия при прокрутке
        once: true,
      },
      ease: "power2.out", // Плавная анимация
    }
  );
});
ScrollTrigger.refresh();

// news-more
gsap.registerPlugin(ScrollTrigger);

const imgNewsMore = document.querySelector(".news-more-img img");

gsap.fromTo(
  imgNewsMore,
  { opacity: 0, clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)" }, // Начальные значения
  {
    opacity: 1, // Конечная прозрачность
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Конечная маска (всё изображение)
    duration: 0.3, // Длительность анимации
    scrollTrigger: {
      trigger: ".news-more-img", // Триггер анимации
      start: "top 75%", // Начало анимации (когда верхняя часть элемента достигает 75% высоты окна)
      toggleActions: "play none none reverse", // Действия при прокрутке
    },
    ease: "power2.out", // Плавная анимация
  }
);

// services
gsap.registerPlugin(ScrollTrigger);

const imgExamination2 = document.querySelectorAll(".examination2-image img");

// Инициализируем GSAP и ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Применяем анимацию ко всем изображениям
imgExamination2.forEach((imgExamination2) => {
  gsap.fromTo(
    imgExamination2,
    { opacity: 0, clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)" }, // Начальные значения
    {
      opacity: 1, // Конечная прозрачность
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Конечная маска (всё изображение)
      duration: 1, // Длительность анимации
      scrollTrigger: {
        trigger: imgExamination2.parentElement, // Триггер анимации
        start: "top 100%", // Начало анимации (когда верхняя часть элемента достигает 75% высоты окна)
        toggleActions: "play none none none", // Действия при прокрутке
        once: true,
      },
      ease: "power2.out", // Плавная анимация
    }
  );
});
ScrollTrigger.refresh();

gsap.registerPlugin(ScrollTrigger);

const imgExamination1 = document.querySelectorAll(".examination1-image img");

imgExamination1.forEach((imgExamination1) => {
  gsap.fromTo(
    imgExamination1,
    { opacity: 0, clipPath: "polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%)" }, // Начальные значения
    {
      opacity: 1, // Конечная прозрачность
      clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)", // Конечная маска (всё изображение)
      duration: 1, // Длительность анимации
      scrollTrigger: {
        trigger: imgExamination1.parentElement, // Триггер анимации
        start: "top 100%", // Начало анимации (когда верхняя часть элемента достигает 100% высоты окна)
        toggleActions: "play none none none", // Действия при прокрутке
        once: true,
      },
      ease: "power2.out", // Плавная анимация
    }
  );
});
ScrollTrigger.refresh();

gsap.registerPlugin(ScrollTrigger);

const stagesCard = document.querySelectorAll(".stages-card");

stagesCard.forEach((stagesCard) => {
  gsap.fromTo(
    stagesCard,
    { opacity: 0, clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)" },
    {
      opacity: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1,
      scrollTrigger: {
        trigger: stagesCard.parentElement,
        start: "top 100%",
        toggleActions: "play none none none",
        once: true,
      },
      ease: "power2.out",
    }
  );
});
ScrollTrigger.refresh();

gsap.registerPlugin(ScrollTrigger);

const imgPrice = document.querySelectorAll(".price-image img");

imgPrice.forEach((imgPrice) => {
  gsap.fromTo(
    imgPrice,
    { opacity: 0, clipPath: "polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%)" }, // Начальные значения
    {
      opacity: 1, // Конечная прозрачность
      clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)", // Конечная маска (всё изображение)
      duration: 1, // Длительность анимации
      scrollTrigger: {
        trigger: imgPrice.parentElement, // Триггер анимации
        start: "top 100%", // Начало анимации (когда верхняя часть элемента достигает 100% высоты окна)
        toggleActions: "play none none none", // Действия при прокрутке
        once: true,
      },
      ease: "power2.out", // Плавная анимация
    }
  );
});
ScrollTrigger.refresh();
