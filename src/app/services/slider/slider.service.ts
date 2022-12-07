import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  slider1 = {
    slidesPerView: 1,
    spaceBetween: 0,
    allowTouchMove: false,
    breakpoints: {
      // when window width is >= 320px
      0: {
        slidesPerView: 1,
      }
    }
  };

  sliderMd4 = {
    slidesPerView: 7,
    spaceBetween: 30,
    allowTouchMove: true,
    breakpoints: {
      // when window width is >= 320px
      0: {
        slidesPerView: 1.6,
      },
      // when window width is >= 576px
      576: {
        slidesPerView: 2,
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 3,
      },
      // when window width is >= 992px
      992: {
        slidesPerView: 4,
      },
      // when window width is >= 1200px
      1200: {
        slidesPerView: 4,
      },
      // when window width is >= 1400px
      1400: {
        slidesPerView: 5,
      },
      // when window width is >= 1920px
      1920: {
        slidesPerView: 5,
      },
      // when window width is >= 3840
      3840: {
        slidesPerView: 6,
      }
    }
  };
  sliderMd3 = {
    slidesPerView: 7,
    spaceBetween: 30,
    allowTouchMove: true,
    breakpoints: {
      // when window width is >= 320px
      0: {
        slidesPerView: 1.5,
      },
      // when window width is >= 576px
      576: {
        slidesPerView: 2,
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 3,
      },
      // when window width is >= 992px
      992: {
        slidesPerView: 3,
      },
      // when window width is >= 1200px
      1200: {
        slidesPerView: 3,
      },
      // when window width is >= 1400px
      1400: {
        slidesPerView: 3,
      },
      // when window width is >= 1920px
      1920: {
        slidesPerView: 3,
      },
      // when window width is >= 3840
      3840: {
        slidesPerView: 5,
      }
    }
  };

  sliderMd6 = {
    slidesPerView: 7,
    spaceBetween: 20,
    allowTouchMove: true,
    breakpoints: {
      // when window width is >= 320px
      0: {
        slidesPerView: 1.6,
      },
      // when window width is >= 576px
      576: {
        slidesPerView: 3,
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 4,
      },
      // when window width is >= 992px
      992: {
        slidesPerView: 6,
      },
      // when window width is >= 1200px
      1200: {
        slidesPerView: 6,
      },
      // when window width is >= 1400px
      1400: {
        slidesPerView: 7,
      },
      // when window width is >= 1920px
      1920: {
        slidesPerView: 8,
      },
      // when window width is >= 3840
      3840: {
        slidesPerView: 10,
      }
    }
  };
  sliderMd5 = {
    slidesPerView: 5,
    spaceBetween: 20,
    allowTouchMove: true,
    breakpoints: {
      // when window width is >= 320px
      0: {
        slidesPerView: 1.5,
      },
      // when window width is >= 576px
      576: {
        slidesPerView: 3,
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 4,
      },
      // when window width is >= 992px
      992: {
        slidesPerView: 5,
      },
      // when window width is >= 1200px
      1200: {
        slidesPerView: 5,
      },
      // when window width is >= 1400px
      1400: {
        slidesPerView: 6,
      },
      // when window width is >= 1920px
      1920: {
        slidesPerView: 7,
      },
      // when window width is >= 3840
      3840: {
        slidesPerView: 9,
      }
    }
  };

  constructor() { }
}
