import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'genre-tag-pg-header-component',
  templateUrl: './genre-tag-pg-header.component.html',
  styleUrls: ['./genre-tag-pg-header.component.scss']
})
export class GenreTagPgHeaderComponent implements OnInit {
  @Input() image;
  @Input() title;

  constructor() { }

  ngOnInit(): void {
  }

}
