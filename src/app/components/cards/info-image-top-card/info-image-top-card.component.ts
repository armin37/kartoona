import {Component, OnInit, Input} from '@angular/core';
import {MovieService} from '../../../services/movie.service';

@Component({
  selector: 'info-image-top-card-component',
  templateUrl: './info-image-top-card.component.html',
  styleUrls: ['./info-image-top-card.component.scss']
})
export class InfoImageTopCardComponent implements OnInit {
  @Input() data;
  @Input() showFavorite: boolean = false;
  @Input() showConsole: boolean = false;
  @Input() imageType = 1; //1.thumbnail 2.cover
  bookmark = true;
  images;

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    if(this.showConsole)
    console.log(this.data)
    //tasavir ro mirizim to images baraye kootah shodane code check kardane tasvir dar html
    if (this.data.images && this.data.images.thumbnails[0]?.sizes) {
      this.images = this.data.images.thumbnails[0]?.sizes;
    }
  }

  addToFavorites = async () => {
    this.bookmark = !this.bookmark;
    const fav = await this.movieService.addToFavorites({
      movieId: this.data.id
    });
  };

}
