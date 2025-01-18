const lenis = new Lenis();

lenis.on("scroll", (e) => {});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// modal
const projects = {
  1: { title: "Project 1", description: "Description of project 1" },
  2: { title: "Project 2", description: "Description of project 2" },
};

let scrollPosition = 0;

function openModal(projectId) {
  const project = projects[projectId];
  if (!project) return;

  const modalContainer = document.querySelector(".modal-container");

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

function closeReviewModal() {
  // Восстанавливаем скролл
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  window.scrollTo(0, scrollPosition);

  // Скрываем модальное окно
  document.getElementById("modalOverlay").classList.remove("active");
}

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
