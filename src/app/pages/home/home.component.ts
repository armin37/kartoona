import {Component, OnInit} from '@angular/core';
import {SliderService} from 'src/app/services/slider/slider.service';
import {MovieService} from 'src/app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  slider = [];
  sections = [];
  sectionCounts: number = 0;

  constructor(public sliderService: SliderService, public movieService: MovieService) {
  }

  ngOnInit(): void {
    this.getSlider();
    this.loadSectionsAltogether();
  }

  getSlider = async () => {
    const res = await this.movieService.loadSliderMovies();
    this.slider = res;
  };

  countPageMovies = async () => {
    this.sectionCounts = await this.movieService.countPageMovies('1');
    if (this.sectionCounts > 0) {
      this.loadAllSections();
    }
  };

  loadAllSections = async () => {
    this.sections = new Array<number>(this.sectionCounts);
    for (let i = 0; i < this.sectionCounts; i++) {
      this.loadOneSectionMovies(i);
    }
  };

  loadOneSectionMovies = async (index: number) => {
    let res = await this.movieService.loadMoviesByPageIdAndSortNumber(1, index + 1);
    this.sections[index] = res;
  };

  loadSectionsAltogether = async () => {
    this.sections = await this.movieService.loadSectionById(1);
  };
}
