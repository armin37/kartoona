import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-info-full-width-card',
  templateUrl: './info-full-width-card.component.html',
  styleUrls: ['./info-full-width-card.component.scss']
})
export class InfoFullWidthCardComponent implements OnInit {
  @Input() data;

  constructor() {
  }

  ngOnInit(): void {
  }

}
