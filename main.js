const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
let slidesCount = slides.length;



let nextSlide = function() {
  goToSlide(currentSlide + 1);
};

let previousSlide = function() {
  goToSlide(currentSlide - 1);
};



let goToSlide = function(n) {
slides[currentSlide].classList.toggle('active');
currentSlide = (n + slidesCount) % slidesCount;
slides[currentSlide].classList.toggle('active'); 
};

let slideInterval = setInterval(nextSlide, 2000);




const pauseButton = document.querySelector('#pause');
let isPlaying = true;

pauseButton.addEventListener('click', () => {
  if (isPlaying) pauseSlideShow();
  else playSlideShow();
});

let pauseSlideShow = function() {
  pauseButton.innerHTML = 'Play';
  isPlaying = false;
  clearInterval(slideInterval);
};



let playSlideShow = function() {
  pauseButton.innerHTML = 'Pause';
  isPlaying = true;
  slideInterval = setInterval(nextSlide, 2000);
};


const next = document.querySelector('#next');
const prev = document.querySelector('#previous');
console.log(prev);

next.addEventListener('click', () => {
  pauseSlideShow();
  nextSlide();
});
prev.addEventListener('click',  () => {
  pauseSlideShow();
  previousSlide();
});