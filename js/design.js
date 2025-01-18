const projects = {
  1: {
    year: "2022 год. ",
    title: "Новая сцена Мариинки",
    description: [
      {
        text: "",
      },
      {
        text: "",
      },
    ],
    images: [
      "../../../assets/images/Projects/design-slide-one.webp",
      "../../../assets/images/Projects/design-slide-two.webp",
    ],
  },
  2: {
    year: "2022 год. ",
    title: "Дворец конгрессов",
    description: [
      {
        text: "",
      },
      {
        text: "",
      },
    ],
    images: [
      "../../../assets/images/Projects/castle.webp",
      "../../../assets/images/Projects/castle-two.webp",
    ],
  },
  3: {
    year: "2022 год. ",
    title: "Конституционный суд",
    description: [
      {
        text: "",
      },
      {
        text: "",
      },
    ],
    images: [
      "../../../assets/images/Projects/design-slide-two.webp",
      "../../../assets/images/Projects/court.webp",
    ],
  },
};

let scrollPosition = 0;

function openModal(projectId) {
  const project = projects[projectId];
  if (!project) return;

  const modalContainer = document.querySelector(".modal-container");

  document.querySelector(".modal-period .blue").textContent = project.year;
  document.querySelector(".modal-period .usual").textContent = project.title;

  const descriptionBoxes = document.querySelectorAll(
    ".modal-overlay .priority-text-box"
  );
  project.description.forEach((desc, index) => {
    if (descriptionBoxes[index]) {
      descriptionBoxes[index].textContent = desc.text || "";
    }
  });

  const swiperSlides = document.querySelectorAll(
    ".modal-container .swiper-slide img"
  );
  swiperSlides.forEach((img, index) => {
    if (project.images[index]) {
      img.src = project.images[index];
    }
  });

  // Сохраняем позицию скролла
  scrollPosition = window.scrollY;
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.width = "100%";

  // Показываем модальное окно
  document.getElementById("modalOverlay").classList.add("active");
  modalContainer.addEventListener("wheel", (event) => {
    event.stopPropagation();
  });
  modalContainer.focus();
}

function closeProjectsModal() {
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  window.scrollTo(0, scrollPosition);

  // Скрываем модальное окно
  document.getElementById("modalOverlay").classList.remove("active");
}

// level
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

      if (index === 0 || index === 5) {
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
