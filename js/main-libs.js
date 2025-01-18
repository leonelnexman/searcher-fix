const lenis = new Lenis();

lenis.on("scroll", (e) => {});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

const servicesSwiperElement = document.querySelector(
  ".services-content .swiper"
);

if (servicesSwiperElement) {
  const servicesSwiper = new Swiper(servicesSwiperElement, {
    loop: false,
    navigation: {
      nextEl: servicesSwiperElement.querySelector(".services-button-next"),
      prevEl: servicesSwiperElement.querySelector(".services-button-prev"),
    },
    pagination: {
      el: servicesSwiperElement.querySelector(
        ".services-pagination .swiper-pagination"
      ),
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

const projectsSwiperElement = document.querySelector(
  ".projects-content .swiper"
);

if (projectsSwiperElement) {
  const projectsSwiper = new Swiper(projectsSwiperElement, {
    loop: false,
    navigation: {
      nextEl: projectsSwiperElement.querySelector(".projects-button-next"),
      prevEl: projectsSwiperElement.querySelector(".projects-button-prev"),
    },
    pagination: {
      el: projectsSwiperElement.querySelector(".swiper-pagination"),
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

// active-news
function showNews(newsId) {
  const newsItems = document.querySelectorAll(".news");
  const listItems = document.querySelectorAll(".news-block ul li");

  gsap.to(newsItems, { duration: 0.5, opacity: 0, display: "none" });

  const selectedNews = document.getElementById(`news-${newsId}`);
  gsap.to(selectedNews, {
    duration: 0.5,
    opacity: 1,
    display: "block",
    width: "fit-content",
  });

  listItems.forEach((item) => item.classList.remove("active"));
  if (document.getElementById(`news-item-${newsId}`)) {
    const selectedListItem = document.getElementById(`news-item-${newsId}`);
    selectedListItem.classList.add("active");
  }
}

const listItems = document.querySelectorAll(".news-block ul li");
listItems.forEach((item, index) => {
  item.addEventListener("mouseenter", () => showNews(index + 1));
  item.addEventListener("mouseleave", () => {
    const newsItems = document.querySelectorAll(".news");
    gsap.to(newsItems, { duration: 0.5, opacity: 0, display: "none" });
    item.classList.remove("active"); // Убираем активный класс при уходе мыши
  });
});

window.onload = function () {
  showNews(1);
};

//news swiper
document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper("#newsSwiper", {
    spaceBetween: 30,
    slidesPerView: 1,
    navigation: {
      nextEl: "#newsSwiper .swiper-button-next",
      prevEl: "#newsSwiper .swiper-button-prev",
    },
    loop: false,
  });
});

// about-swiper
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;

  return rect.top === 0 && rect.bottom === windowHeight;
}
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".about-info .swiper-container", {
    direction: "vertical", // Вертикальная прокрутка
    effect: "creative",
    creativeEffect: {
      prev: {
        translate: [0, "-100%", 0], // Предыдущий слайд опускается вниз
        opacity: 1,
      },
      next: {
        translate: [0, "100%", 0], // Следующий слайд поднимается вверх
        opacity: 1,
      },
    },
    mousewheel: {
      invert: false, // Инвертировать направление прокрутки (по умолчанию false)
      forceToAxis: true, // Прокручивать только по оси (вертикальной или горизонтальной)
      sensitivity: 0.5, // Уменьшение чувствительности, значение по умолчанию - 1
    },
    on: {
      slideChangeTransitionStart: function () {
        const isPartnersInView = isElementInViewport(
          document.querySelector(".about-info")
        );
        if (!isPartnersInView) {
          lenis.stop();
        }
      },
      slideChangeTransitionEnd: function () {
        const isPartnersInView = isElementInViewport(
          document.querySelector(".about-info")
        );
        if (!isPartnersInView) {
          lenis.start();
        }
      },
      mousewheel: function () {
        const isPartnersInView = isElementInViewport(
          document.querySelector(".about-info")
        );
        if (!isPartnersInView) {
          lenis.stop();
        }
      },
      mousewheelEnd: function () {
        const isPartnersInView = isElementInViewport(
          document.querySelector(".about-info")
        );
        if (!isPartnersInView) {
          lenis.start();
        }
      },
    },
  });
});

// user-level
function updateActiveSection() {
  const sections = document.querySelectorAll(".user-level div");
  const hrElements = document.querySelectorAll(".user-level hr");
  const pElements = document.querySelectorAll(".user-level p");
  const sectionElements = document.querySelectorAll(".section");
  const menu = document.querySelector(".menu-items");
  const menuImage = document.querySelector(".menu-img");
  const windowHeight = window.innerHeight;

  let currentSection = null;

  sectionElements.forEach((section, index) => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
      currentSection = sections[index];

      if (index === 0 || index === 4 || index === 7) {
        menu.style.color = "#E0E0E0";
        menuImage.src = "./assets/icons/menu-white.svg";
        hrElements.forEach((hr) => {
          hr.style.backgroundColor = "#E0E0E0";
        });
        pElements.forEach((p) => {
          p.style.color = "#E0E0E0";
        });
      } else {
        menu.style.color = "#050C1A";
        menuImage.src = "./assets/icons/menu.svg";
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
document.addEventListener("scroll", updateActiveSection);
window.addEventListener("load", updateActiveSection);

// слайдер проектов
const containers = document.querySelectorAll(".projects-slide");

let isClicked = false;

// Проверка ширины экрана
const isMobile = () => window.innerWidth < 768;

containers.forEach((container) => {
  const image = container.querySelector(".projects-img img");

  const mouseMoveHandler = function (event) {
    if (isClicked || isMobile()) return;

    const containerRect = container.getBoundingClientRect();
    const mouseX = event.clientX - containerRect.left;
    const mouseY = event.clientY - containerRect.top;

    const offsetX = mouseX - image.offsetWidth / 2 - 200;
    const offsetY = mouseY - image.offsetHeight / 2 - 200;
    image.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  };

  container.addEventListener("mousemove", mouseMoveHandler);

  container.addEventListener("click", () => {
    isClicked = true;
  });

  image.style.transition = "transform 0.1s ease-out";
});

window.addEventListener("resize", () => {
  if (isMobile()) {
    containers.forEach((container) => {
      const image = container.querySelector(".projects-img img");
      image.style.transform = "none"; // Сбрасываем трансформацию
    });
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const resetState = () => {
    isClicked = false;

    if (!isMobile)
      document.querySelectorAll(".projects-img").forEach((imgParent) => {
        imgParent.classList.remove("full-screen");
        gsap.set(imgParent, {
          width: "50.06rem",
          height: "28.56rem",
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          position: "absolute",
          zIndex: 0,
        });
      });

    // Сброс изображений
    document.querySelectorAll(".projects-img img").forEach((img) => {
      gsap.set(img, {
        width: "100%",
        height: "auto",
      });
    });
  };

  resetState();

  window.addEventListener("popstate", resetState);
});

document.querySelectorAll(".projects-slide").forEach((slide) => {
  const imageParent = slide.querySelector(".projects-img");
  const image = slide.querySelector(".projects-img img");
  const link = slide.dataset.link;
  const button = slide.querySelector(".projects-more");

  imageParent.addEventListener("click", () => {
    gsap
      .timeline()
      .set(imageParent, { clearProps: "transform" })
      .to(".projects-widgets", {
        zIndex: 0,
      })
      .to(".projects-content", {
        width: "100vw",
        height: "100vh",
      })
      .to(
        imageParent,
        {
          duration: 1,
          width: "100vw",
          height: "100vh",
          top: "0%",
          left: "0%",
          x: "0%",
          y: "0%",
          position: "fixed",
          zIndex: 9999,
          ease: "power2.out",
        },
        "<"
      )
      .to(image, {
        width: "100%",
        height: "100%",
        zIndex: 9999,

        onComplete: () => {
          window.location.href = link;
        },
      });

    image.classList.add("full-screen");
  });

  button.addEventListener("click", () => {
    gsap
      .timeline()
      .set(imageParent, { clearProps: "transform" })
      .to(".header", {
        display: "none",
      })
      .to(
        imageParent,
        {
          duration: 1,
          width: "100vw",
          height: "100vh",
          top: "0%",
          left: "0%",
          x: "0%",
          y: "0%",
          position: "fixed",
          zIndex: 9999,
          ease: "power2.out",
        },
        "<"
      )
      .to(image, {
        width: "100%",
        height: "100%",
        zIndex: 9999,

        onComplete: () => {
          window.location.href = link;
        },
      });

    image.classList.add("full-screen");
  });
});

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    console.log(event.persisted);

    window.location.reload();
  }
});

// content-box
document.addEventListener("DOMContentLoaded", function () {
  const objectsSlides = document.querySelectorAll(".objects-slide");
  const firstBlock = objectsSlides[0].querySelector(".objects-block");
  const firstContent = objectsSlides[0].querySelector(".objects-content");
  const firstIcon = firstContent.querySelector(".toggle-icon");

  firstBlock.classList.add("active");
  firstContent.classList.add("active");
  firstIcon.src = "./assets/icons/minus.svg";

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
        slide.querySelector(".toggle-icon").src = "./assets/icons/plus.svg";
      });

      if (!isActive) {
        block.classList.add("active");
        content.classList.add("active");
        icon.src = "./assets/icons/minus.svg";
      }
    });
  });
});

const swiper = new Swiper(".news-swiper .swiper-container", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 10,
  navigation: {
    nextEl: ".news-swiper .swiper-button-next",
    prevEl: ".news-swiper .swiper-button-prev",
  },
  pagination: {
    el: ".news-swiper .swiper-pagination",
    clickable: true,
  },
});
