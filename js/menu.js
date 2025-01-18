const menuButton = document.querySelector(".menu-items");
const closeButton = document.querySelector(".opened-menu-btn button");
const openedMenu = document.querySelector(".opened-menu");
const menuVideo = document.querySelector(".opened-menu-back");
const bigLogo = document.querySelector(".big-logo");

// Открываем меню при нажатии на кнопку "Меню"
menuButton.addEventListener("click", () => {
  openedMenu.classList.add("active"); // Добавляем класс active, чтобы меню выезжало
  menuVideo.play();
  bigLogo.style.opacity = 1;
});

// Закрываем меню при нажатии на кнопку "Закрыть"
closeButton.addEventListener("click", () => {
  openedMenu.classList.remove("active"); // Убираем класс active, чтобы меню закрывалось
  menuVideo.pause();
  bigLogo.style.opacity = 0;
});
