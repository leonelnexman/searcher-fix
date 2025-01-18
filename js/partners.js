const lenis = new Lenis();

lenis.on("scroll", (e) => {});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

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

      if (index === 0 || index === 3 || index === 5) {
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
// partners-swiper
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;

  return rect.top === 0 && rect.bottom === windowHeight;
}

document.addEventListener("DOMContentLoaded", function () {
  const partnersSwiperConfig = {
    slidesPerView: 3,
    spaceBetween: 40,
    pagination: {
      el: ".partners-swiper .swiper-pagination",
      type: "fraction",
      clickable: true,
      renderFraction: function (currentClass, totalClass) {
        return `<span class="${currentClass}"></span> &mdash; <span class="${totalClass}"></span>`;
      },
    },
    navigation: {
      nextEl: ".partners-swiper .swiper-button-next",
      prevEl: ".partners-swiper .swiper-button-prev",
    },
    mousewheel: true,
    on: {
      slideChange: function () {
        const totalSlides = this.slides.length;
        const currentSlideIndex = this.realIndex;

        const blueBarPosition = currentSlideIndex * 77;
        document.querySelector(
          ".blue-bar"
        ).style.transform = `translateX(${blueBarPosition}%)`;
      },
      slideChangeTransitionStart: function () {
        const isPartnersInView = isElementInViewport(
          document.querySelector(".partners-swiper")
        );
        if (!isPartnersInView) {
          lenis.stop();
        }
      },
      slideChangeTransitionEnd: function () {
        const isPartnersInView = isElementInViewport(
          document.querySelector(".partners-swiper")
        );
        if (!isPartnersInView) {
          lenis.start();
        }
      },
      mousewheel: function () {
        const isPartnersInView = isElementInViewport(
          document.querySelector(".partners-swiper")
        );
        if (!isPartnersInView) {
          lenis.stop();
        }
      },
      mousewheelEnd: function () {
        const isPartnersInView = isElementInViewport(
          document.querySelector(".partners-swiper")
        );
        if (!isPartnersInView) {
          lenis.start();
        }
      },
    },
  };

  const partnersSwiper = new Swiper(
    ".partners-swiper .swiper-container",
    partnersSwiperConfig
  );
});

//marquee
let isScrollingDown = true;
let lastScrollY = window.scrollY;
let isCloned = false;

function animateMarquee(el, duration) {
  const innerEl = el.querySelector(".marquee-title");
  if (el.querySelectorAll(".marquee-title").length > 1) {
    return; // Если клон уже существует, выходим из функции
  }
  const innerWidth = innerEl.offsetWidth;
  const cloneEl = innerEl.cloneNode(true);
  el.appendChild(cloneEl);

  let start = performance.now();
  let translateX = 0;

  const step = (now) => {
    const progress = (now - start) / duration;

    if (progress > 1) {
      start = now;
    }

    const direction = isScrollingDown ? 1 : -1;
    translateX = (innerWidth * progress * direction) % innerWidth;

    if (translateX < 0) {
      translateX += innerWidth;
    }

    el.style.left = "0";
    innerEl.style.transform = `translate3d(-${translateX}px, 0, 0)`;
    cloneEl.style.transform = `translate3d(-${translateX + 15}px, 0, 0)`;

    if (translateX >= innerWidth) {
      innerEl.style.transform = `translate3d(0, 0, 0)`;
      translateX = 0;
    }

    requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  isScrollingDown = currentScrollY > lastScrollY;
  lastScrollY = currentScrollY;
});

// Определяем элемент для анимации и длительность
const marquee = document.querySelector(".marquee");
const duration = 20000;

// Создаем наблюдатель
const observerMarquee = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Когда элемент становится видимым, запускаем анимацию и отключаем наблюдатель
      animateMarquee(marquee, duration);
      observer.unobserve(entry.target);
    }
  });
});

// Наблюдаем за элементом .marquee
observerMarquee.observe(marquee);

// advantages
let advantages = document.querySelector(".advantages");
let advantagesPanels = gsap.utils.toArray(".advantages-video");

advantagesPanels.forEach((panel, i) => {
  ScrollTrigger.create({
    trigger: panel,
    start: () => {
      return panel.offsetHeight < window.innerHeight
        ? "bottom bottom"
        : "top top";
    },
    end: () => {
      return `+=280%`;
    },
    pin: true,
    pinSpacing: false,
    scrub: true,
  });
});

// play-button
const playButton = document.getElementById("playButton");
const videoElement = document.getElementById("videoElement");
const companyVideo = document.querySelector(".company-video"); // w-100%
const videoContainer = document.querySelector(".company-container"); // w-100%

// Ensure GSAP is loaded
if (typeof gsap !== "undefined") {
  videoElement.addEventListener("play", () => {
    playButton.classList.add("hidden");

    // Animate to full width on play
    gsap.to(videoContainer, { width: "100%", duration: 1 });
    gsap.to(companyVideo, { width: "100%", duration: 1 });
  });

  videoElement.addEventListener("pause", () => {
    playButton.classList.remove("hidden");
  });

  videoElement.addEventListener("ended", () => {
    playButton.classList.remove("hidden");

    // Animate back to original sizes on video end
    gsap.to(videoContainer, { width: "90rem", duration: 1 });
    gsap.to(companyVideo, { width: "66.5rem", duration: 1 });
  });

  playButton.addEventListener("click", () => {
    videoElement.play(); // Start video playback on button click
    playButton.classList.add("hidden"); // Hide play button
  });
} else {
  console.error("GSAP library is not loaded.");
}
