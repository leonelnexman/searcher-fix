const lenis = new Lenis();

lenis.on("scroll", (e) => {});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);


window.addEventListener("DOMContentLoaded", () => {
  const waterPart = document.querySelector('.water-part')
  const waterHoverPart = document.querySelector('.water-part-hover')

  const groundPart = document.querySelector('.ground-part')
  const groundHoverPart = document.querySelector('.ground-part-hover')
  document.addEventListener('click', (event) => {
    // Получаем координаты клика
    const clickX = event.clientX;
    const clickY = event.clientY;
  
    // Получаем кнопки
    const buttons = document.querySelectorAll('.hero-button-detais, .hero-button-contact');
  
    // Проверяем каждый элемент
    buttons.forEach((button) => {
      const rect = button.getBoundingClientRect(); // Получаем координаты и размеры элемента
  
      // Проверяем, попал ли клик внутрь элемента
      if (
        clickX >= rect.left &&
        clickX <= rect.right &&
        clickY >= rect.top &&
        clickY <= rect.bottom
      ) {
        // Клик внутри элемента
        console.log(`Клик по кнопке: ${button.textContent}`);
        // Выполняем действие для кнопки
        if (button.classList.contains('hero-button-detais')) {
          console.log('Детальная кнопка нажата');
          // Ваш код для обработки клика на "Подробнее"
        } else if (button.classList.contains('hero-button-contact')) {
          console.log('Контактная кнопка нажата');
          // Ваш код для обработки клика на "Связаться с нами"
        }
      }
    });
  });
  
 try {
  waterHoverPart.addEventListener('mouseover',()=>{
    groundHoverPart.style.opacity=1
  })  
  waterHoverPart.addEventListener('mouseout',()=>{
    groundHoverPart.style.opacity=0

  })  

  groundHoverPart.addEventListener('mouseover',()=>{
    waterHoverPart.style.opacity=1
  })  
  groundHoverPart.addEventListener('mouseout',()=>{
    waterHoverPart.style.opacity=0

  })  
 } catch(e){}
 
  try {
    videojs("vid1", {
      preload: "auto",
      controls: true,
    });
  } catch (err) {
    console.log(err)
  }
  // gsap.set('.hero-switch-card',{
  //   opacity:0
  // })
 
  // gsap.set(".activity-player-description-first", {
  //   opacity: 0,
  //   y: -100,
  // });
  // gsap.set(".activity-project-card", {
  //   opacity: 0,
  //   x: 50,
  // });
  // gsap.set(".activity-projects-title", {
  //   opacity: 0,
  // });

  // gsap.set(".activity-player-description-second", {
  //   opacity: 0,
  //   y: -150,
  // });



  for (let i = 1; i < 5; i++) {
    gsap.to(".activity-project-card-" + i, {
      x: 0, // Позиция возвращается в исходное положение
      opacity: 1,
      delay: i * 0.3,
      scrollTrigger: {
        trigger: ".activity-projects-cards",
        start: "top bottom", // Начинаем анимацию, когда верх карты достигает 80% окна
        end: "bottom center", // Конец анимации, когда низ карты достигает 20% окна
      },
      ease: "power2.out", // Плавное затухание для равномерного эффекта
    });
  }
  gsap.to('.activity-card-1',{
    opacity:1,
    delay:3
  })

  for (let i = 2; i < 6; i++) {
    gsap.to(".activity-card-" + i, {
      opacity: 1,
      scrollTrigger: {
        trigger: ".activity-card-" + i,
        start: "top 80%", // Начинаем анимацию, когда верх карты достигает 80% окна
        end: "bottom bottom", // Конец аßнимации, когда низ карты достигает 20% окна
        scrub:true,
        once:true,
      },
     
    });
  }

  gsap.to(
    [
      ".right-line-wrapper-hr",
      ".left-line-wrapper-hr",
      ".middle-line-wrapper-hr",
    ],
    {
      y: 0,
    }
  );

  gsap.to(".left", {
    opacity: 1,
  });
  gsap.to(".video", {
    clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
    scrollTrigger: {
      trigger: ".video",
      start: "top center", // Начинаем анимацию, когда верх карты достигает 80% окна
      end: "bottom bottom",
    },
  });
  gsap.to(".top-line-wrapper-hr", {
    x: 0,
  });
  gsap.to(".activity-player-title", {
    opacity: 1,
    scrollTrigger: {
      trigger: ".activity-player-title-h2",
      start: "top bottom",
      end: "bottom bottom",
    },
  });
 
  gsap.to('.breadcrumbs', {
    opacity:1 ,
    x:0,
    scrollTrigger : {
        trigger:'.breadcrumbs',
        start:'top center ',
        end:'top top',
    }
  })
  //.breadcrumbs

  gsap.to('.hero-description-card-h2',{
    opacity:1,
    delay:2.4
  })
  gsap.to('.hero-description-card-p',{
    opacity:1,
    delay:2.6
  })
  gsap.to('.card', {
    opacity:1 ,
    y:0,
    delay:2.8
  })
  gsap.to(".activity-player-description-first", {
    opacity: 1,
    y: 0,
    scrollTrigger: {
      start: "top center",
      end: "bottom bottom",
      trigger: ".activity-player-description-first",
    },
  });
  gsap.to(".activity-player-description-second", {
    opacity: 1,
    y: 0,
    scrollTrigger: {
      start: "top center",
      end: "bottom bottom",
      trigger: ".activity-player-description-first",
    },
  });

  gsap.to(".activity-projects-title", {
    opacity: 1,
    scrollTrigger: {
      start: "bottom bottom",
      end: "bottom bottom",
      trigger: ".activity-projects-title",
    },
  });

  // Отображаем модалку земли
});

function updateActiveSectionAbout() {
  const sections = document.querySelectorAll(".user-level div");
  const hrElements = document.querySelectorAll(".user-level hr");
  const pElements = document.querySelectorAll(".user-level p");
  const sectionElements = document.querySelectorAll(".panel");
  const menu = document.querySelector(".menu-title");
  const menuImage = document.querySelector(".menu-img");
  const windowHeight = window.innerHeight;
  const htmlName = window.location.pathname.split('/')[4]
  console.log(window.location.pathname.split('/')[4])
  let endPathMenuSVG =htmlName==='water.html'||htmlName==='ground.html'?'../../':'../'
  let currentSection = null;
  sectionElements.forEach((section, index) => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
      currentSection = sections[index];
      if (index === 2) {
        menu.style.color = "#E0E0E0";
        menuImage.src = endPathMenuSVG+"assets/icons/menu-white.svg";
        hrElements.forEach((hr) => {
          hr.style.backgroundColor = "#E0E0E0";
        });
        pElements.forEach((p) => {
          p.style.color = "#E0E0E0";
        });
      } else {
        menu.style.color = "#050C1A";
        menuImage.src =endPathMenuSVG+ "assets/icons/menu.svg";
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
  console.log(htmlName==='water.html'||htmlName==='ground.html')
  if(htmlName==='water.html'||htmlName==='ground.html') {
    menu.style.color = "#050C1A";
    menuImage.src = endPathMenuSVG+"assets/icons/menu.svg";
  }
  if (currentSection) {
    currentSection.classList.add("active");
  }
}
document.addEventListener("scroll", updateActiveSectionAbout);
window.addEventListener("load", updateActiveSectionAbout);
gsap.registerPlugin(ScrollTrigger);
document.addEventListener('click', (event) => {
  // Получаем координаты клика
  const clickX = event.clientX;
  const clickY = event.clientY;

  // Получаем кнопки
  const buttons = document.querySelectorAll('.hero-button-detais, .hero-button-contact');

  // Проверяем каждый элемент
  buttons.forEach((button) => {
    const rect = button.getBoundingClientRect(); // Получаем координаты и размеры элемента

    // Проверяем, попал ли клик внутрь элемента
    if (
      clickX >= rect.left &&
      clickX <= rect.right &&
      clickY >= rect.top &&
      clickY <= rect.bottom
    ) {
      if (button.classList.contains('ground-details')) {
        window.location.href = './activity/ground.html'
      } else {
        window.location.href = './activity/water.html'
      }
    }
  });
});
