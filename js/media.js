const lenis = new Lenis();

lenis.on("scroll", (e) => {});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Табы
const tabs = document.querySelectorAll(".tab");
const tabItems = document.querySelectorAll(".tab-item");

tabs[0].classList.add("active");
tabItems[0].classList.add("active");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const selectedTab = tab.dataset.tab;

    tabItems.forEach((item) => {
      item.classList.remove("active");
      item.style.display = "none";
    });

    const selectedItem = document.getElementById(selectedTab);
    selectedItem.style.display = "block";
    setTimeout(() => {
      selectedItem.classList.add("active");
    }, 10);

    tabs.forEach((t) => {
      t.classList.remove("active");
    });

    tab.classList.add("active");
  });
});

// modals
// video
gsap.registerPlugin(ScrollTrigger);

// Видео модалка
const videoModal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const mediaVideos = document.querySelectorAll(".media-video video");
const closeVideoModal = videoModal.querySelector(".close-btn");

mediaVideos.forEach((video) => {
  video.addEventListener("click", () => {
    // Анимация модального окна (опускание сверху вниз)
    gsap.to(videoModal, {
      top: 0, // Перемещаем модалку на экран
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        gsap.fromTo(
          modalVideo,
          { opacity: 0, clipPath: "inset( 0% 0% 100% 0%)" }, // Скрытое состояние
          {
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)", // Полностью раскрытое видео
            delay: 1,
            duration: 1, // Длительность анимации видео
            ease: "power2.out",
            onStart: () => {
              modalVideo.src = video.querySelector("source").src; // Устанавливаем источник видео
              modalVideo.play(); // Запускаем воспроизведение
            },
          }
        );
      },
    });
  });
});

// Закрытие модалки
closeVideoModal.addEventListener("click", () => {
  // Анимация скрытия видео
  gsap.to(modalVideo, {
    opacity: 0,
    clipPath: "inset(0% 0% 100% 0%)", // Свернуть сверху вниз
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => {
      modalVideo.pause();
      modalVideo.src = ""; // Очистка источника видео

      // Анимация скрытия модалки
      gsap.to(videoModal, {
        top: "-100%", // Убираем модалку за экран
        duration: 0.5,
        ease: "power2.in",
      });
    },
  });
});

// Закрытие при клике вне модального окна
videoModal.addEventListener("click", (event) => {
  if (event.target === videoModal) {
    closeVideoModal.click(); // Триггерим закрытие модалки
  }
});

// image
const mediaImage = document.querySelectorAll(".media-image img");
const modalImg = document.getElementById("imageModal");
const closeImgModal = document.querySelector("#imageModal .close-btn");
const swiperImg = document.querySelector("#imageModal .swiper-container");

mediaImage.forEach((image) => {
  image.addEventListener("click", () => {
    // Анимация модального окна (опускание сверху вниз)
    gsap.to(modalImg, {
      top: 0, // Перемещаем модалку на экран
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        gsap.fromTo(
          swiperImg,
          { opacity: 0, clipPath: "inset( 0% 0% 100% 0%)" }, // Скрытое состояние
          {
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)", // Полностью раскрытое видео
            delay: 1,
            duration: 1, // Длительность анимации видео
            ease: "power2.out",
          }
        );
      },
    });
  });
});

// Закрытие модалки
closeImgModal.addEventListener("click", () => {
  // Анимация скрытия видео
  gsap.to(swiperImg, {
    opacity: 0,
    clipPath: "inset(0% 0% 100% 0%)", // Свернуть сверху вниз
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => {
      // Анимация скрытия модалки
      gsap.to(modalImg, {
        top: "-100%", // Убираем модалку за экран
        duration: 0.5,
        ease: "power2.in",
      });
    },
  });
});

// Закрытие при клике вне модального окна
closeImgModal.addEventListener("click", (event) => {
  if (event.target === modalImg) {
    closeImgModal.click(); // Триггерим закрытие модалки
  }
});

// swiper
const swiper = new Swiper("#imageModal .swiper-container", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
});

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

      if (index === 1) {
        menu.style.color = "#E0E0E0";
        menuImage.src = "../../assets/icons/menu-white.svg";
        hrElements.forEach((hr) => {
          hr.style.backgroundColor = "#E0E0E0";
        });
        pElements.forEach((p) => {
          p.style.color = "#E0E0E0";
        });
      } else {
        menu.style.color = "#050C1A";
        menuImage.src = "../../assets/icons/menu.svg";
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
