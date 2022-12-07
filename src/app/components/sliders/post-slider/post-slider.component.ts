import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'post-slider-component',
  templateUrl: './post-slider.component.html',
  styleUrls: ['./post-slider.component.scss']
})
export class PostSliderComponent implements OnInit {
  @Input() data = [];
  @Input() config = {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 5000
    },
    pagination: true,
  }

  constructor() { }

  ngOnInit(): void {
  }

}
