const lenis = new Lenis();

lenis.on("scroll", (e) => {});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

window.addEventListener("DOMContentLoaded", () => {
  gsap.to(".cover", {
    duration: 0.5,
    opacity: 1,
    ease: "power2.out",
  });
});

// swiper
document.addEventListener("DOMContentLoaded", function () {
  const partnersSwiperConfig = {
    slidesPerView: 1.4,
    spaceBetween: 10,
    pagination: {
      el: ".priority-swiper .swiper-pagination",
      type: "custom",
      renderCustom: function (swiper, current, total) {
        const totalSlides = total - 1;
        return `<span>${current}</span> &mdash; <span>${totalSlides}</span>`;
      },
    },
    navigation: {
      nextEl: ".priority-swiper .swiper-button-next",
      prevEl: ".priority-swiper .swiper-button-prev",
    },
    on: {
      slideChange: function () {
        const totalSlides = this.slides.length; // Общее количество слайдов
        const currentSlideIndex = this.realIndex; // Индекс текущего слайда (начинается с 0)
        const blueBarPosition = currentSlideIndex * 77;

        // Обновление позиции синей полосы
        document.querySelector(
          ".blue-bar"
        ).style.transform = `translateX(${blueBarPosition}%)`;

        // Отключение кнопки "Next" на предпоследнем слайде
        const nextButton = document.querySelector(
          ".priority-swiper .swiper-button-next"
        );

        if (currentSlideIndex === totalSlides - 2) {
          nextButton.classList.add("swiper-button-disabled");
          nextButton.disabled = true;
        } else {
          nextButton.classList.remove("swiper-button-disabled");
          nextButton.disabled = false;
        }
      },
    },
  };

  const partnersSwiper = new Swiper(
    ".priority-swiper .swiper-container",
    partnersSwiperConfig
  );
});


