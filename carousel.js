class Carousel {
constructor(sett) {
  let settings = this._initConfig(sett);
  this.carousel = document.querySelector(settings.containerID);
  this.slides = this.carousel.querySelectorAll(settings.slideID);
  this.interval = settings.interval;
}

_initConfig(obj) {
let settings = {
  containerID: '#carousel',
  slideID: '.slide',
  interval: 2000
};
return {...settings, ...obj};
}

_initProps() {
        this.currentSlide = 0;
        this.slidesCount = this.slides.length;
        this.isPlaying = true;
    
        this.ACTIVE = 'active';
        this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
        this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
        this.FA_PREV = '<i class="fas fa-angle-left"></i>';
        this.FA_NEXT = '<i class="fas fa-angle-right"></i>';
        this.SPACE = ' ';
        this.LEFT_ARROW = 'ArrowLeft';
        this.RIGHT_ARROW = 'ArrowRight';
      }

      _initIndicators() {
      const indicators = document.createElement('ol');
  
      indicators.setAttribute('class', 'indicators');
      indicators.setAttribute('id', 'indicators-container');
      
      for (let i = 0; i < this.slidesCount; i++) {
        const indicator = document.createElement('li');
        indicator.setAttribute('class', 'indicator');
        indicator.innerHTML = `Step ${i + 1}`;
        if (i === 0) indicator.classList.add('active');
        indicator.dataset.slideTo = `${i}`;
        indicators.appendChild(indicator);
      }
      
      this.carousel.appendChild(indicators);
      this.indicatorsContainer = this.carousel.querySelector('#indicators-container');
      this.indicators = this.indicatorsContainer.querySelectorAll('.indicator');
    }
  
  _initControls() {
  const controls = document.createElement('div');
  
  const PAUSE = `<span class="control controls-pause" id="pause-btn">${this.FA_PAUSE}</span>`;
  const PREV = `<span class="control controls-previous" id="previous-btn">${this.FA_PREV}</span>`;
  const NEXT = `<span class="control controls-next" id="next-btn">${this.FA_NEXT}</span>`;
  
  controls.setAttribute('class', 'controls');
  controls.setAttribute('id', 'controls-container');
  
  controls.innerHTML = PAUSE + PREV + NEXT;
  
  this.carousel.appendChild(controls);
  
  this.pauseBtn = this.carousel.querySelector('#pause-btn');
  this.nextBtn = this.carousel.querySelector('#next-btn');
  this.prevBtn = this.carousel.querySelector('#previous-btn');
    }
  
  _initListeners() {
      this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
      this.nextBtn.addEventListener('click', this.next.bind(this));
      this.prevBtn.addEventListener('click', this.prev.bind(this));
      this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
      document.addEventListener('keydown', this._pressKey.bind(this));
    }
  
    _indicate(e) {
      let target = e.target;
      if (target.classList.contains('indicator')) {
        this.pauseSlideShow();
        this.goToSlide(+target.dataset.slideTo);
      } 
    }
  
    _pressKey(e) {
      if (e.key === this.LEFT_ARROW) this.prev();
      if (e.key === this.RIGHT_ARROW) this.next();
      if (e.key === this.SPACE) this.pausePlay();
      }
      
      goToSlide(n) {
      this.slides[this.currentSlide].classList.toggle(this.ACTIVE);
      this.indicators[this.currentSlide].classList.toggle(this.ACTIVE);
      this.currentSlide = (n + this.slidesCount) % this.slidesCount;
      this.slides[this.currentSlide].classList.toggle(this.ACTIVE);
      this.indicators[this.currentSlide].classList.toggle(this.ACTIVE); 
      }
      
      goToNextSlide() {
        this.goToSlide(this.currentSlide + 1);
      }
      
      goToPreviousSlide() {
        this.goToSlide(this.currentSlide - 1);
      }
  
      pauseSlideShow() {
        this.pauseBtn.innerHTML = this.FA_PLAY;
        this.isPlaying = false;
        clearInterval(this.slideInterval);
      }
      
      playSlideShow() {
        this.pauseBtn.innerHTML = this.FA_PAUSE;
        this.isPlaying = true;
        this.slideInterval = setInterval(() => this.goToNextSlide(), this.interval);
      }
  
      pausePlay() {
        this.isPlaying ? this.pauseSlideShow() : this.playSlideShow();
      }

      next() {
        this.pauseSlideShow();
        this.goToNextSlide();
      }
      
      prev() {
        this.pauseSlideShow();
        this.goToPreviousSlide();
      }
  
      init() {
        this._initProps();
        this._initIndicators();
        this._initControls();
        this._initListeners();

        this.slideInterval = setInterval(() => this.goToNextSlide(), this.interval);
      }
  }


class SwipeCarousel extends Carousel {

  _initListeners() {
    super._initListeners();
    this.carousel.addEventListener('touchstart', this._swipeStart.bind(this));
    this.carousel.addEventListener('touchend', this._swipeEnd.bind(this));
  }

  _swipeStart(e) {
    if (e.changedTouches.length === 1) this.swipeStartX = e.changedTouches[0].pageX;
    }

    _swipeEnd(e) {
      if (e.changedTouches.length === 1) {
        this.swipeEndX = e.changedTouches[0].pageX;
        if (this.swipeStartX - this.swipeEndX < 0) this.prev();
        if (this.swipeStartX - this.swipeEndX > 0) this.next();
      }
    }
}


  
  


  

  

  
  
   