document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);
  
  const scrollButton = document.querySelector('.mobile-header-scroll-button')
  const lenis = new Lenis()
  function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
  }
  
  requestAnimationFrame(raf)
  console.log(lenis)
  scrollButton.addEventListener('click',()=>{
      lenis.scrollTo(window.innerHeight+window.innerHeight/8, { duration: 2 }) // Прокрутить на 1000px за 1 секунду
  })
  

  gsap.set('.team-card', { opacity: 0, y: 50 });
  const formSelectors = ['.form-description','.form-team-name','.form-team-phone','.form-team-submit','.form-checkbox','.custom-checkbox','.privacy']
  const cardSelecotrs = [  
    'first',
    'second',
    'third',
    'fourth',
    'fifth',
    'sixth',
    'seventh',
    'eighth',
    'ninth',
    'teenth',
    'eleventh',
    'twelfth',
    'thirteenth',
    'fourteenth']
  gsap.set(formSelectors, { opacity: 0 });
    try {
      document.querySelector('.modal-exit-button').addEventListener('click',()=>{
        gsap.to('.employee-modal',{
            opacity:0,
            x:"0",
            display:'none'
          })
        })
        gsap.to('.employee-modal-content',{
          x: 100,
        })
    }catch (e) {

    }
  


  if(window.innerWidth>768){

    cardSelecotrs.forEach(selector=>{
      const card =  document.querySelector('.team-card-'+selector)

      
      card.addEventListener('click',()=>{
        const [name , sign] = card.children[1].textContent.trim().split(' ')
        const img = card.children[0].children[0].src
        const description = card.children[2].children[0].textContent
    
        const modalImg = document.querySelector('.modal-img')
        const modalName = document.querySelector('.modal-name-blue')
        const modalSign = document.querySelector('.modal-name-sign')
        const modalDescription = document.querySelector('.modal-desc-from-card')
        modalName.innerHTML = name
        modalSign.innerHTML = sign
        modalImg.src = img
        modalDescription.innerHTML = description
    
        gsap.to('.employee-modal',{
          opacity:1,
          display:'block'
        })
        gsap.to('.employee-modal-content',{
          x: 0,
        })
      })

    })
  }


  const tlTeam= gsap.timeline({
    scrollTrigger: {
      trigger: '.team',
      start: 'top top',
      end: '80% center', 
      snap: {
          snapTo: 'labels', 
          ease: 'power1.inOut' 
      },
      scrub:true,
      once:true, 
  }
  });

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

  const cardOptions = {    
    opacity: 1,
    y: 0,
    ease: "power2.out" // добавление плавности
  };


  

  cardSelecotrs.forEach(el=>tlTeam.to(`.team-card-${el}`,cardOptions))
});
gsap.registerPlugin(ScrollTrigger)
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
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
    const rect = section.getBoundingClientRect();
    if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
      currentSection = sections[index];

      if (index === 0 ||index ===sectionElements.length-1) {
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
  }else {
    sections.forEach((section) => section.className==="objects-level"?section.classList.add('active'):false);
  }
}
document.addEventListener("scroll", updateActiveSectionAbout);



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