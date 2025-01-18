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
        speed = 1000; // средне
        break;
      case 2:
        speed = 500; // быстро
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

// video-mouse
document.addEventListener("DOMContentLoaded", () => {
  const videoBox = document.querySelector(".main-video");
  const playButton = document.querySelector(".play-btn");

  const updateButtonPosition = (angle) => {
    const radius = videoBox.offsetWidth / 2; // Радиус окружности (main-video)
    const buttonRadius = playButton.offsetWidth / 2; // Радиус кнопки

    // Центр окружности (main-video)
    const centerX = videoBox.offsetWidth / 2;
    const centerY = videoBox.offsetHeight / 2;

    // Вычисляем положение кнопки по углу на окружности
    const x = centerX + radius * Math.cos(angle) - buttonRadius;
    const y = centerY + radius * Math.sin(angle) - buttonRadius;

    // Позиционируем кнопку относительно видео-контейнера
    playButton.style.transform = `translate(${x}px, ${y}px)`;
  };

  // Следим за движением мыши на документе
  document.addEventListener("mousemove", (event) => {
    const centerX = videoBox.offsetLeft + videoBox.offsetWidth / 2;
    const centerY = videoBox.offsetTop + videoBox.offsetHeight / 2;

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Рассчитываем угол между центром окружности и положением курсора
    const angle = Math.atan2(mouseY - centerY, mouseX - centerX);

    // Обновляем позицию кнопки в зависимости от угла
    updateButtonPosition(angle);
  });
});
const isMobile = () => window.innerWidth < 768;

let videoTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".history-video-box",
    pin: true,
    start: "top center",
    end: "bottom bottom+=50vh",
    scrub: 0.1,
    markers: false,
    snap: {
      snapTo: "labels", // Привязка к меткам
      duration: { min: 0.2, max: 0.5 }, // Продолжительность привязки
      delay: 0.1, // Задержка
      ease: "power1.in", // Плавность анимации
    },
  },
});

videoTimeline
  .to(".play-btn", {
    opacity: 0, // Уменьшаем непрозрачность
  })
  .to(".main-video-wrapper", {
    borderRadius: "0%", // Плавный переход
    width: "100%",
    height: "100vh",
    duration: 0.5,
    ease: "power1.in",
  })
  .to(".main-video-inner", {
    borderRadius: "0", // Плавный переход
    width: "100%",
    height: "100%",
    duration: 0.5,
    ease: "power1.in",
  });

//
const swipers = [];
const swiperContainers = document.querySelectorAll(
  ".clients .swiper-container"
);

// Создаем экземпляры Swiper для каждого контейнера
swiperContainers.forEach((container) => {
  const swiper = new Swiper(container, {
    loop: true, // Включаем зацикливание, если нужно
  });
  swipers.push(swiper); // Добавляем экземпляр в массив
});

// Функции для переключения слайдов
const goToNextSlide = () => {
  swipers.forEach((swiper) => swiper.slideNext());
};

const goToPrevSlide = () => {
  swipers.forEach((swiper) => swiper.slidePrev());
};

// Привязка событий к кнопкам
document.getElementById("nextBtn").addEventListener("click", goToNextSlide);
document.getElementById("prevBtn").addEventListener("click", goToPrevSlide);

const modal = document.getElementById("modal");
const modalContent = modal.querySelector(".modal-content p");
const modalTitle = modal.querySelector(".modal-content h2");
const openModalButtons = document.querySelectorAll(".openModal");
const closeModalButton = document.getElementById("closeModal");

// Функция для открытия модалки с динамическим контентом
openModalButtons.forEach((button) => {
  button.onclick = function () {
    const content = button.getAttribute("data-content");
    modalTitle.textContent = "Отзыв клиента"; // Заголовок можно сделать тоже динамическим
    modalContent.textContent = content; // Устанавливаем контент модалки
    modal.style.display = "flex";
  };
});

// Функция для закрытия модалки
closeModalButton.onclick = function () {
  modal.style.display = "none";
};

// Закрытие модалки при клике вне ее содержимого
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

const projectsSwiperElement = document.querySelector(
  ".projects-content .swiper"
);

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
          : document.querySelector(
              ".projects-widgets-mobile .projects-button-next"
            ),
      prevEl:
        screenWidth >= 768
          ? document.querySelector(".projects-widgets .projects-button-prev")
          : document.querySelector(
              ".projects-widgets-mobile .projects-button-prev"
            ),
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
