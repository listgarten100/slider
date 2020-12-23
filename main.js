const carousel = document.querySelector('#carousel');
const slides = carousel.querySelectorAll('.slide');
const indicatorsContainer = carousel.querySelector('#indicators-container');
const indicators = indicatorsContainer.querySelectorAll('.indicator');
const controlsContainer = carousel.querySelector('#controls-container');
const pauseButton = controlsContainer.querySelector('#pause-btn');
const nextBtn = controlsContainer.querySelector('#next-btn');
const prevBtn = controlsContainer.querySelector('#previous-btn');

let currentSlide = 0;
let slidesCount = slides.length;
let interval = 2000;
let isPlaying = true;
let slideInterval = null;
let swipeStartX = null;
let swipeEndX = null;

const ACTIVE = 'active';
const FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
const FA_PLAY = '<i class="fas fa-play-circle"></i>';
const SPACE = ' ';
const LEFT_ARROW = 'ArrowLeft';
const RIGHT_ARROW = 'ArrowRight';


let nextSlide = function() {
  goToSlide(currentSlide + 1);
};

let previousSlide = function() {
  goToSlide(currentSlide - 1);
};


let goToSlide = function(n) {
slides[currentSlide].classList.toggle(ACTIVE);
indicators[currentSlide].classList.toggle(ACTIVE);
currentSlide = (n + slidesCount) % slidesCount;
slides[currentSlide].classList.toggle(ACTIVE);
indicators[currentSlide].classList.toggle(ACTIVE); 
};


let pausePlay = function() {
  if (isPlaying) pauseSlideShow();
  else playSlideShow();
};

let pauseSlideShow = function() {
  pauseButton.innerHTML = FA_PLAY;
  isPlaying = false;
  clearInterval(slideInterval);
};



let playSlideShow = function() {
  pauseButton.innerHTML = FA_PAUSE;
  isPlaying = true;
  slideInterval = setInterval(nextSlide, interval);
};


let next = function() {
  pauseSlideShow();
  nextSlide();
};

let prev = function() {
  pauseSlideShow();
  previousSlide();
};


let indicate = function(e) {
  let target = e.target;
  if (target.classList.contains('indicator')) {
    pauseSlideShow();
    goToSlide(+target.dataset.slideTo);
  } 
};


let pressKey = function(e) {
if (e.key === LEFT_ARROW) {
  prev();
}
if (e.key === RIGHT_ARROW) {
  next();
}
if (e.key === SPACE) {
  pausePlay();
}
};


let swipeStart = function(e) {
if (e.changedTouches.length === 1) {
  swipeStartX = e.changedTouches[0].pageX;
}
};



let swipeEnd = function(e) {
  if (e.changedTouches.length === 1) {
    swipeEndX = e.changedTouches[0].pageX;
    if(swipeStartX - swipeEndX < 0) {
      prev();
    }
    if(swipeStartX - swipeEndX > 0) {
      next();
    }
  }
};



pauseButton.addEventListener('click', pausePlay);
nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);
indicatorsContainer.addEventListener('click', indicate);

carousel.addEventListener('touchstart', swipeStart);
carousel.addEventListener('touchend', swipeEnd);

document.addEventListener('keydown', pressKey);

slideInterval = setInterval(nextSlide, interval);

