const slides = document.querySelectorAll(".slides img");
const dots = document.querySelectorAll(".dot");
let slideIndex = 0;
let intervalId = null;
let startX = 0;
let endX = 0;

document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider() {
  if (slides.length > 0 && dots.length > 0) {
    slides[slideIndex].classList.add("displaySlide");
    dots[slideIndex].classList.add("displaydot");
    intervalId = setInterval(nextSlide, 2000);
  }

  document.querySelector(".slides").addEventListener("mouseenter", stopSlider);
  document.querySelector(".slides").addEventListener("mouseleave", startSlider);

  document
    .querySelector(".slides")
    .addEventListener("touchstart", touchStart, false);
  document
    .querySelector(".slides")
    .addEventListener("touchmove", touchMove, false);
  document
    .querySelector(".slides")
    .addEventListener("touchend", touchEnd, false);
}

function showSlides(index) {
  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  }
  slides.forEach((slide) => {
    slide.classList.remove("displaySlide");
  });
  slides[slideIndex].classList.add("displaySlide");
}
function dotMover(index) {
  if (index >= dots.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = dots.length - 1;
  }
  dots.forEach((dot) => {
    dot.classList.remove("displaydot");
  });
  dots[slideIndex].classList.add("displaydot");
}

function prevSlide() {
  stopSlider();
  slideIndex--;
  showSlides(slideIndex);
  dotMover(slideIndex);
  startSlider();
}

function nextSlide() {
  stopSlider();
  slideIndex++;
  showSlides(slideIndex);
  dotMover(slideIndex);
  startSlider();
}

function stopSlider() {
  clearInterval(intervalId);
}

function startSlider() {
  intervalId = setInterval(nextSlide, 3000);
}

function touchStart(event) {
  startX = event.touches[0].clientX;
}

function touchMove(event) {
  endX = event.touches[0].clientX;
}

function touchEnd() {
  let swipe = startX - endX;

  if (swipe > 50) {
    nextSlide();
  } else if (swipe < -50) {
    prevSlide();
  }
}
