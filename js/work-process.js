const lenis = new Lenis();

lenis.on("scroll", (e) => {});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

document.addEventListener("DOMContentLoaded", function () {
  const animationBoxes = document.querySelectorAll(".animation-box");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.5 }
  );

  animationBoxes.forEach((box) => observer.observe(box));
});

const projectsSwiperElement = document.querySelector(".projects-content .swiper");

if (projectsSwiperElement) {
  let screenWidth = document.documentElement.clientWidth;
  const projectsSwiper = new Swiper(projectsSwiperElement, {
    slidesPerView: screenWidth >= 768 ? 1 : 1.3,
    spaceBetween: 30,
    loop: false,
    navigation: {
      nextEl:
        screenWidth >= 768
          ? document.querySelector(".projects-widgets .projects-button-next")
          : document.querySelector(".projects-widgets-mobile .projects-button-next"),
      prevEl:
        screenWidth >= 768
          ? document.querySelector(".projects-widgets .projects-button-prev")
          : document.querySelector(".projects-widgets-mobile .projects-button-prev"),
    },
    pagination: {
      el: document.querySelector(".projects-swiper-pagination"),
      type: "fraction",
    },
    on: {
      init: function () {
        if (screenWidth > 768) {
          const slides = this.slides;
          slides.forEach((slide) => {
            if (!slide.classList.contains("swiper-slide-active")) {
              slide.style.opacity = "0";
              slide.style.transition = "opacity 1s ease";
            }
          });
        }
      },
      slideChangeTransitionStart: function () {
        if (screenWidth > 768) {
          const activeSlide = this.slides[this.activeIndex];
          activeSlide.style.opacity = "1";
        }
      },
      slideChangeTransitionEnd: function () {
        if (screenWidth > 768) {
          const slides = this.slides;
          slides.forEach((slide) => {
            if (!slide.classList.contains("swiper-slide-active")) {
              slide.style.opacity = "0";
            }
          });
        }
      },
    },
  });
}

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
