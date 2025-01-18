// modal-swiper
document.addEventListener("DOMContentLoaded", function () {
  const modalSwiperConfig = {
    slidesPerView: 1.4,
    spaceBetween: 10,
    pagination: {
      el: ".modal-container .priority-swiper .swiper-pagination",
      type: "custom",
      renderCustom: function (swiper, current, total) {
        const totalSlides = total - 1;
        return `<span>${current}</span> &mdash; <span>${totalSlides}</span>`;
      },
    },
    navigation: {
      nextEl: ".modal-container .priority-swiper .swiper-button-next",
      prevEl: ".modal-container .priority-swiper .swiper-button-prev",
    },
    on: {
      slideChange: function () {
        const totalSlides = this.slides.length; // Общее количество слайдов
        const currentSlideIndex = this.realIndex; // Индекс текущего слайда (начинается с 0)
        const blueBarPosition = currentSlideIndex * 77;

        // Обновление позиции синей полосы
        document.querySelector(".blue-bar").style.transform = `translateX(${blueBarPosition}%)`;

        // Отключение кнопки "Next" на предпоследнем слайде
        const nextButton = document.querySelector(".modal-container .priority-swiper .swiper-button-next");

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

  const modalSwiper = new Swiper(".modal-container .priority-swiper .swiper-container", modalSwiperConfig);
});

const projects = {
  1: {
    year: "2004 - 2005 годы",
    title: "Морской фасад",
    description: [
      {
        text: "На акватории проектируемого на тот момент Морского пассажирского терминала «Морской фасад Петербурга», прилегающей к западному побережью Васильевского острова, были проведены работы по очистке от взрывоопасных предметов. ",
      },
      {
        text: "В ходе работ на акватории было обнаружено 8 единиц ВОП из них 4 авиабомбы. Применённые при работе силы и средства позволили в кратчайшие сроки поднять и транспортировать на утилизацию (уничтожение) все обнаруженные ВОП, включая авиабомбы. ",
      },
    ],
    images: ["../../../assets/images/Projects/sea-front1.webp", "../../../assets/images/Projects/sea-front2.webp"],
  },
  2: {
    year: "2022 год.",
    title: "ООО «ГТ Моргео» Усть-Луга Газохимический комплекс",
    description: [
      {
        text: "«Строительство газохимического комплекса по производству метанола и карбамида в районе морского порта Усть-Луга» – очередной контракт 2022 года по работам в Морском порту Усть-Луга. ",
      },
      {
        text: "Погодные условия сложные, территория по размеру значительная, сроки максимально сжатые – логистика использования сил и средств позволила выполнить поставленную задачу в установленные сроки. ",
      },
    ],
    images: ["../../../assets/images/Projects/gt-morgeo.webp", "../../../assets/images/Projects/gt-morgeo2.webp"],
  },
  3: {
    year: "2022 год.",
    title: "ООО «НИПИ НГ «Петон» Морской порт Высоцк Комплекс сжиженного газа КС «Портовая»",
    description: [
      {
        text: "В 2022 году АО «Искатель» выполнило огромный объем работ по обследованию на ВОП морских судоходных путей и якорной стоянки на объекте «Комплекс по производству, хранению и отгрузке сжиженного природного газа в районе КС «Портовая» - общий объем обследованной акватории превысил 1800 га. ",
      },
      {
        text: "При проведении работ были обнаружены и утилизированы (уничтожены) авиабомбы, торпеда, морские якорные мины, а также минный защитник времен ВОВ. Уничтожение производилось во взаимодействии со специалистами Ленинградской военно-морской базы Балтийского флота. Примечательным фактом уничтожения морских мин, которое выполнялось на местах обнаружения, было то, что сейсмические толчки от взрывов были зафиксированы даже Финским Сейсмологическим институтом.",
      },
    ],
    images: ["../../../assets/images/Projects/seaport1.webp", "../../../assets/images/Projects/seaport2.webp"],
  },
  4: {
    year: "2022 год.",
    title: "АО «НИПИГАЗ» Усть-Луга Газоперерабатывающий комплекс",
    description: [
      {
        text: "Работа по подготовке к проектированию и строительству объекта «Газоперерабатывающий комплекс в составе Комплекса переработки этансодержащего газа в районе поселка Усть-Луга» выполнялась на стадии инженерных изысканий, в составе которых было выполненно обследование на ВОП и персонал АО «ИСКАТЕЛЬ» обеспечил безопасность всей территории и акватории объекта. Из особенностей работы можно отметить значительную «засоренность» территории и акватории объекта, ввиду активных боевых действия во время ВОВ. ",
      },
      {
        text: "При проведении работ был обнаружен и самолёт ИЛ-2 с погибшим пилотом. С 2019 года в составе АО «ИСКАТЕЛЬ» зарегистрирована в Минюсте и функционирует общественная организация по увековечению памяти погибших при защите Отечества МОО «Искатель». благодаря совмещению деятельности персонала при разминировании и обнаружении воинских захоронения, удаётся проводить и большую работу по воспитанию патриотизма у молодого поколения россиян. Мы находим раритеты войны 1939-1945 годов, поднимаем их, реставрируем и передаём в музей – как Победное оружие России. Обнаруженные и поднятые нами танки стоят на постаментах в городах Выборге и Кировске, Ленинградской области.",
      },
    ],
    images: ["../../../assets/images/Projects/nipigaz1.webp", "../../../assets/images/Projects/nipigaz2.webp"],
  },
};

let scrollPosition = 0;

function openModal(projectId) {
  const project = projects[projectId];
  if (!project) return;

  const modalContainer = document.querySelector(".modal-container");

  document.querySelector(".modal-period .blue").textContent = project.year;
  document.querySelector(".modal-period .usual").textContent = project.title;

  const descriptionBoxes = document.querySelectorAll(".modal-overlay .priority-text-box");
  project.description.forEach((desc, index) => {
    if (descriptionBoxes[index]) {
      descriptionBoxes[index].textContent = desc.text || "";
    }
  });

  const swiperSlides = document.querySelectorAll(".modal-container .swiper-slide img");
  console.log(swiperSlides);

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
  // Восстанавливаем скролл
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  window.scrollTo(0, scrollPosition);

  // Скрываем модальное окно
  document.getElementById("modalOverlay").classList.remove("active");
}
