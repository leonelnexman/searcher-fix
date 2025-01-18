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

window.addEventListener("DOMContentLoaded", () => {
  const vacancyCards = document.querySelectorAll(".hero-button-detais");
  const exitModalButton = document.querySelector(".vacancy-modal-exit-button");
  // .panel ,.panel,.form-container{
  //     display: none !important;
  // }
  gsap.set([".panel", ".form-container", ".vacancy"], {
    transition: " all 0.2s ease-in-out",
  });
  gsap.set(".equipment-card", {
    opacity: 0,
  });

  gsap.to(".equipment-card-1", {
    opacity: 1,
    delay: 2.5,
  });
  gsap.to(".equipment-card-2", {
    opacity: 1,
    delay: 2.7,
  });

  for (let i = 3; i <= 11; i += 2) {
    gsap.to(".equipment-card-" + i, {
      opacity: 1,
      scrollTrigger: {
        trigger: ".equipment-card-" + i,
        start: "bottom bottom",
        end: "center center",
      },
    });
    const second = i + 1;
    gsap.to(".equipment-card-" + second, {
      opacity: 1,
      delay: 0.3,
      scrollTrigger: {
        trigger: ".equipment-card-" + second,
        start: "bottom bottom",
        end: "center center",
      },
    });
  }
  exitModalButton.addEventListener("click", () => {
    gsap.to(".vacancy-modal", {
      x: "0%",
      opacity: 0,
      display: "none",
    });
    // возвращаю значения по умолчанию у этих блоков
    gsap.to([".form-container"], {
      display: "flex",
    });
    gsap.to([".panel"], {
      display: "block",
    });

    gsap.to(".contacts", {
      display: "flex",
    });
  });
  vacancyCards.forEach((el) => {
    el.addEventListener("click", () => {
      gsap.timeline().to(".vacancy-modal", {
        x: 0,
        opacity: 1,
        display: "flex",
      });
      // lenis.scrollTo('#button'); // код который не работает
    });
  });
});

function updateActiveSectionAbout() {
  const sections = document.querySelectorAll(".user-level div");
  const hrElements = document.querySelectorAll(".user-level hr");
  const pElements = document.querySelectorAll(".user-level p");
  const sectionElements = document.querySelectorAll(".panel");
  const menu = document.querySelector(".menu-title");
  const menuImage = document.querySelector(".menu-img");
  const windowHeight = window.innerHeight;

  let currentSection = null;
  sectionElements.forEach((section, index) => {
    console.log(section);

    const rect = section.getBoundingClientRect();
    if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
      currentSection = sections[index];
      console.log(sections);
      if (index) {
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
gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);
