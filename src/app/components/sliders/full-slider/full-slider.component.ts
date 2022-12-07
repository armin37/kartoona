import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'full-slider-component',
  templateUrl: './full-slider.component.html',
  styleUrls: ['./full-slider.component.scss']
})
export class FullSliderComponent implements OnInit {
  @Input() data = [];
  @Input() config = {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 7000
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
