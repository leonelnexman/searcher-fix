const lenis = new Lenis();

lenis.on("scroll", (e) => {});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

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

// content-box
document.addEventListener("DOMContentLoaded", function () {
  const faqSlides = document.querySelectorAll(".faq-slide");
  const firstBlock = faqSlides[0].querySelector(".faq-block");
  const firstContent = faqSlides[0].querySelector(".faq-content");
  const firstIcon = firstContent.querySelector(".toggle-icon");

  firstBlock.classList.add("active");
  firstContent.classList.add("active");
  firstIcon.src = "../../assets/icons/minus.svg";

  faqSlides.forEach((slide) => {
    const content = slide.querySelector(".faq-content");
    const block = slide.querySelector(".faq-block");
    const icon = content.querySelector(".toggle-icon");

    content.addEventListener("click", () => {
      const isActive = block.classList.contains("active");

      faqSlides.forEach((slide) => {
        const block = slide.querySelector(".faq-block");
        block.classList.remove("active");
        slide.querySelector(".faq-content").classList.remove("active");
        slide.querySelector(".toggle-icon").src = "../../assets/icons/plus.svg";
      });

      if (!isActive) {
        block.classList.add("active");
        content.classList.add("active");
        icon.src = "../../assets/icons/minus.svg";
      }
    });
  });
});

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
