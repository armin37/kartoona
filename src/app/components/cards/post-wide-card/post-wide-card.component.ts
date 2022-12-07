import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'post-wide-card-component',
  templateUrl: './post-wide-card.component.html',
  styleUrls: ['./post-wide-card.component.scss']
})
export class PostWideCardComponent implements OnInit {
  @Input() data;
  @Input() background;
  @Input() rowClass = "odd";

  constructor() { }

  ngOnInit(): void {
  }

}
