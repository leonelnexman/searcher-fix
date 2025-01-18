

document.addEventListener("DOMContentLoaded", (event) => {
    const vacancyCards = document.querySelectorAll('.vacancy-card-button')
    const exitModalButton = document.querySelector('.vacancy-modal-exit-button')
    const resumeButton = document.querySelector('.vacancy-hero-button')
    const scrollButton = document.querySelector('.mobile-header-scroll-button')
    const lenis = new Lenis()
    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)
    console.log(lenis)
    scrollButton.addEventListener('click',()=>{
        lenis.scrollTo(window.innerHeight, { duration: 2 }) // Прокрутить на 1000px за 1 секунду
    })
    resumeButton.addEventListener('click',()=>{
    })
    // .panel ,.panel,.form-container{
    //     display: none !important;
    // }

  const formSelectors = ['.form-description','.form-team-name','.form-team-phone','.form-team-submit','.form-checkbox','.custom-checkbox','.privacy']
    
  gsap.to('.vacancy-hero-button',{
    opacity:1,
    delay:2.7
  })
  
    exitModalButton.addEventListener('click', () => {
        gsap.to('.vacancy-modal', {
            x: "0%",
            opacity: 0,
            display: 'none',
        });
        
    });

    vacancyCards.forEach(el => {
        el.addEventListener("click", () => {
            gsap.timeline().to('.vacancy-modal', {
                x: "0",
                opacity: 1,
                 display: 'flex',
            })
        });
    });
    gsap.registerPlugin(ScrollTrigger);
    const imgSelecotrs = [  
        'first',
        'second',
        'third',
        'fourth',
       ]
    const cardSelecotrs = [  
        ...imgSelecotrs,
        'fifth',
        'sixth',
    ]

    const scrollTriggerOptions = (trigger,start='top top',end='bottom bottom') =>{
        return {
            trigger,
            start,
            end,
            shap:{
            snapTo: 'labels', 
              ease: 'power1.inOut'
            }
        }
    }  
    const cardTl = gsap.timeline({
        scrollTrigger:{
            ...scrollTriggerOptions('.vacancies','top 90%','center center'),
            scrub:true,
            once:true,
        }
    })

    const imgTl = gsap.timeline({
        scrollTrigger:{
            ...scrollTriggerOptions('.vacancy-images','top center','center center'),
            scrub:true,
            once:true,
        }
    })
    
    const textTl = gsap.timeline({
        scrollTrigger: {
            ...scrollTriggerOptions('.vacancy','top center','15% center'),
            scrub:true,
            once:true,
        }
    })
    textTl.to('.vacancy-title',{
        y:0,
        opacity:1
    })
    textTl.to('.vacancy-description',{
        x:0,
        opacity:1,

    })
    cardSelecotrs.forEach(el=>gsap.to(`.vacancy-${el}`,{
        opacity:1,
        scrollTrigger: {
            
            trigger:`.vacancy-${el}`,
            start: 'top bottom',
            end:'center center',
            snap: {
                snapTo: 'labels', 
                ease: 'power1.inOut' 
            },
            once:true,
            scrub:true
        }
    }))
    
    imgSelecotrs.forEach(el=>imgTl.to(`.vacancies-img-${el}`,{
        opacity:1,
    }))


    const tlForm = gsap.timeline({
        scrollTrigger: {
          trigger: '.form-container',
          start: 'top bottom',
          end:'65% 65%',
          snap: {
              snapTo: 'labels', 
              ease: 'power1.inOut' 
          },
          once:true,
          scrub:true
      }
      })
      const formOptions = {
        opacity:1
      }
      tlForm.to('.form-img',{
        clipPath:"polygon(100% 0, 100% 100%, 0 100%, 0 0)",
      })
      formSelectors.forEach(el=>tlForm.to(el,formOptions))
});
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin);





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

    if (index ===0|| index===3) {
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
} else { 
    sections[2].classList.add('active')
}
}
document.addEventListener("scroll", updateActiveSectionAbout);
window.addEventListener("load", updateActiveSectionAbout);

const formTitle = document.querySelector('.form-title')
const formSubmitBtn = document.querySelector('.form-team-submit')
const formInputs = document.querySelector('.form-team')
const formDesription = document.querySelector('.form-description')
const nameInput = document.querySelector('.form-team-name')
const phoneInput = document.querySelector('.form-team-phone')
const checkboxForm = document.querySelector('.form-checkbox')
formSubmitBtn.addEventListener('click',(e)=>{
  e.preventDefault()
  const phoneMask = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/

  if(phoneMask.test(phoneInput.value)&& nameInput.value.length>2&&checkboxForm.checked) {
    formDesription.style.display = 'none'
    formInputs.style.display = 'none'
    formDesription.style.display = 'none'
    formTitle.innerHTML = `
    <div >
      <p>
        Спасибо за 
      <p/>
      <p>
        вашу заявку !
      <p/>
    </div
   
    `
  }
})