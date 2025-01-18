const lenis = new Lenis();

lenis.on("scroll", (e) => {});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// pin
window.addEventListener("DOMContentLoaded", () => {
  gsap.to(".first-project", {
    scrollTrigger: {
      trigger: ".first-project",
      start: "top top",
      end: "+=100%",
      scrub: false,
      pin: true,
      pinSpacing: false,
      // onEnter: () => {
      //   gsap.to(".first-project", { opacity: 1, duration: 0.3, zIndex: 100 });
      // },
      onLeave: () => {
        gsap.to(".first-project", { opacity: 0, duration: 0.3 });
      },
      onEnterBack: () => {
        gsap.to(".first-project", { opacity: 1, duration: 0.3, zIndex: 100 });
      },
      onLeaveBack: () => {
        gsap.to(".first-project", { opacity: 0, duration: 0.3 });
      },
      onUpdate: (self) => {
        if (self.progress <= 0) {
          gsap.to(".first-project", { opacity: 1 }); // Если элемент еще не закреплен, он остается видимым
        }
      },
    },
  });

  gsap.to(".second-project", {
    scrollTrigger: {
      trigger: ".second-project",
      start: "top top",
      end: "+=100%",
      scrub: false,
      pin: true,
      onEnter: () => {
        gsap.to(".second-project", {
          opacity: 1,
          duration: 0.3,
          zIndex: 100,
          pointerEvents: "auto",
        });
      },
      onLeave: () => {
        gsap.to(".second-project", { opacity: 0, duration: 0.3 });
      },
      onEnterBack: () => {
        gsap.to(".second-project", {
          opacity: 1,
          duration: 0.3,
          zIndex: 100,
          pointerEvents: "auto",
        });
      },
      onLeaveBack: () => {
        gsap.to(".second-project", { opacity: 0, duration: 0.3 });
      },
    },
  });

  gsap.to(".third-project", {
    scrollTrigger: {
      trigger: ".third-project",
      start: "top top",
      end: "+=100%",
      scrub: false,
      pin: true,
      onEnter: () => {
        gsap.to(".third-project", {
          opacity: 1,
          duration: 0.3,
          zIndex: 100,
          pointerEvents: "auto",
        });
      },
      onLeave: () => {
        gsap.to(".third-project", { opacity: 0, duration: 0.3 });
      },
      onEnterBack: () => {
        gsap.to(".third-project", {
          opacity: 1,
          duration: 0.3,
          zIndex: 100,
          pointerEvents: "auto",
        });
      },
      onLeaveBack: () => {
        gsap.to(".third-project", { opacity: 0, duration: 0.3 });
      },
    },
  });

  gsap.to(".last-project", {
    scrollTrigger: {
      trigger: ".last-project",
      start: "top top",
      end: "+=100%",
      scrub: false,
      pin: true,
      onEnter: () => {
        gsap.to(".last-project", {
          opacity: 1,
          duration: 0.3,
          zIndex: 100,
          pointerEvents: "auto",
        });
      },
      // onLeave: () => {
      //   gsap.to(".last-project", { opacity: 0, duration: 0.1 });
      // },
      onEnterBack: () => {
        gsap.to(".last-project", {
          opacity: 1,
          duration: 0.3,
          zIndex: 100,
          pointerEvents: "auto",
        });
      },
      onLeaveBack: () => {
        gsap.to(".last-project", { opacity: 0, duration: 0.3 });
      },
    },
  });
});

// projects mouse-event
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

// Убираем трансформацию на мобильных экранах
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

    // Сброс стилей изображений
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

    // Показ заголовка
    gsap.set(".header", {
      display: "flex",
    });
  };

  resetState();

  window.addEventListener("popstate", resetState);
});

document.querySelectorAll(".projects-slide").forEach((slide) => {
  const imageParent = slide.querySelector(".projects-img");
  const image = slide.querySelector(".projects-img img");
  const cover = slide.querySelector(".cover");
  const link = slide.dataset.link;
  const button = slide.querySelector(".projects-more");

  imageParent.addEventListener("click", () => {
    gsap
      .timeline()
      .set(imageParent, { clearProps: "transform" })
      .to(".header", {
        display: "none",
      })
      .to(cover, {
        opacity: 1,
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
