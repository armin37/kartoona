import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {MovieService} from '../../services/movie.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  data = [];
  filter = {
    slug: '',
    name: ''
  };
  currentPage = 1;
  pageCount = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private apiService: ApiService,
              private movieService: MovieService,
              private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    const slug = this.activatedRoute.snapshot.paramMap.get('slug');
    this.filter.slug = slug;
    if (slug === 'newest') {
      this.filter.name = 'جدیدترین کارتون ها';
    }
    if (slug === 'most-seen') {
      this.filter.name = 'محبوب ترین کارتون ها';
    }
    if (slug === 'imdb') {
      this.filter.name = 'بالاترین امتیاز';
    }

    this.currentPage = this.activatedRoute.snapshot.paramMap.get('page') ?
      parseInt(this.activatedRoute.snapshot.paramMap.get('page')) : 1;

    this.getFilterMovies();
  }

  getFilterMovies = async () => {
    const res = await this.movieService.filterMovies(this.filter.slug, this.currentPage);
    if (res) {
      this.data = res.movies;
      this.pageCount = res.pageCount;
    }
  };

  changePage = (index) => {
    this.currentPage = index;
    this.getFilterMovies();
  };
}
