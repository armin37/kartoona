import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'comment-card-component',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {
  @Input() comment;
  constructor() { }

  ngOnInit(): void {
  }

}
