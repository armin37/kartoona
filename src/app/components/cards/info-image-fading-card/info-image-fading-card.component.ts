import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'info-image-fading-card-component',
  templateUrl: './info-image-fading-card.component.html',
  styleUrls: ['./info-image-fading-card.component.scss']
})
export class InfoImageFadingCardComponent implements OnInit {
  @Input() data;

  constructor() {
  }

  ngOnInit(): void {
  }

}
