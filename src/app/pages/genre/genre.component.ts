import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  data = [];
  genre;
  current = 1;
  pageCount = 0;
  slug;

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.slug = this.activatedRoute.snapshot.paramMap.get('slug');
    this.current = this.activatedRoute.snapshot.paramMap.get('page') ?
      parseInt(this.activatedRoute.snapshot.paramMap.get('page')) : 1;
    this.getSlugInfo();
  }

  getSlugInfo = async () => {
    this.data = [];
    this.genre = null;
    const res_genre = await this.apiService.sendRequest('GET', 'movie/findGenreBySlug/' + this.slug);
    if (res_genre && res_genre.status === 200) {
      this.genre = res_genre.body;
      if (this.genre) {
        this.getGenreMovie();
      }
    }
  };
  getGenreMovie = async () => {
    const res = await this.apiService.sendRequest('GET', 'movie/allMoviesByGenreSlugByPage/' + this.genre.slug + '/' + this.current);
    if (res) {
      this.data = res.body.movies;
      this.pageCount = res.body.pageCount;
    }
  };

  changePage = (index) => {
    this.current = index;
    this.getGenreMovie();
  };

}
