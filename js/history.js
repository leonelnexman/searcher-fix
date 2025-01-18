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

      if (index === 0 || index === 3) {
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

//ruler
let scrollPercentOffset = 0;
window.addEventListener("scroll", () => {
  const ruler = document.querySelector(".development-ruler");
  const maxHeight = 100;
  const scrollHeight = window.scrollY;
  const windowHeight = document.body.scrollHeight - window.innerHeight;

  const midWindow = window.innerHeight / 2 + scrollPercentOffset;

  if (scrollHeight >= midWindow) {
    const scrollPercent = Math.min(
      ((scrollHeight - midWindow) / (windowHeight - midWindow)) * maxHeight,
      maxHeight
    );

    ruler.style.height = `${scrollPercent}%`;
  } else {
    ruler.style.height = "0%";
  }

  if (scrollHeight < 5240) {
    return (scrollPercentOffset -= 1);
  } else if (scrollHeight >= 5240 && scrollHeight < 9815) {
    return (scrollPercentOffset -= 2);
  } else if (scrollHeight >= 9815) {
    return (scrollPercentOffset -= 8);
  }
  if (scrollPercent >= 90) {
    return (scrollPercentOffset -= 15);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Остановить наблюдение после срабатывания
        }
      });
    },
    {
      threshold: 0.1, // Сработает, когда 10% элемента будет видно
    }
  );

  const targets = document.querySelectorAll(".development-subtitle");
  const yearsTarget = document.querySelectorAll(".development-year");
  targets.forEach((target) => observer.observe(target));
  yearsTarget.forEach((year) => observer.observe(year));
});
