import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'episode-card-component',
  templateUrl: './episode-card.component.html',
  styleUrls: ['./episode-card.component.scss']
})
export class EpisodeCardComponent implements OnInit {
  @Input() data;
  @Input() img;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.data)
  }

}
