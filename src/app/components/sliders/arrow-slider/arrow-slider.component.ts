import {Component, OnInit, Input} from '@angular/core';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'arrow-slider-component',
  templateUrl: './arrow-slider.component.html',
  styleUrls: ['./arrow-slider.component.scss']
})
export class ArrowSliderComponent implements OnInit {
  @Input() id: string;
  @Input() cardType = 1;//1=info-image-top-card 2=info-image-right-card
  @Input() data = [];
  @Input() config;
  localConfig;

  constructor() {
  }

  ngOnInit(): void {
    this.localConfig = cloneDeep(this.config);

    this.localConfig.navigation = {
      nextEl: '#' + this.id + 'Prev',
      prevEl: '#' + this.id + 'Next',
    };
  }
}
