import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'info-image-right-card-component',
  templateUrl: './info-image-right-card.component.html',
  styleUrls: ['./info-image-right-card.component.scss']
})
export class InfoImageRightCardComponent implements OnInit {
  @Input() data;
  constructor() { }

  ngOnInit(): void {
  }

}
