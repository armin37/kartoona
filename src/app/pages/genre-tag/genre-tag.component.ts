import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-genre-tag',
  templateUrl: './genre-tag.component.html',
  styleUrls: ['./genre-tag.component.scss']
})
export class GenreTagComponent implements OnInit {
  movies = [];
  slug;
  type;
  info;
  categories = {
    popular: {
      name: 'جدیدترین ها',
      urls: [
        'movie/allCinemaMoviesByView',
        'movie/allSeriesByView',
      ]
    },
    newest: {
      name: 'محبوب ترین ها',
      urls: [
        'movie/allNewestCinemaMovies',
        'movie/allNewestSeries'
      ]
    },
    series: {
      name: 'سریال ها',
      urls: [
        'movie/allSeries'
      ]
    },
    cinema: {
      name: 'سینمایی ها',
      urls: [
        'movie/allCinemaMovies'
      ]
    }
  };

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.type = this.route.snapshot.paramMap.get('type');
    if (this.slug && this.type) {
      this.getGenreTagMovie();
    } else {
      this.getCategories(this.categories[this.route.snapshot.paramMap.get('category')]);
    }
  }

  getCategories = async (category: any) => {
    // console.log(this.type, this.slug)
    if (category) {
      this.info = {...category};
      this.movies = [];
      let movies = [];
      for (let i = 0; i < category.urls.length; i++) {
        const res = await this.apiService.sendRequest('GET', category.urls[i]);
        if (res && res.status === 200 && Array.isArray(res.body)) {
          movies = movies.concat(res.body);
        }
      }
      this.movies = [].concat(movies);
    }
  }
  getGenreTagMovie = async () => {
    // console.log(this.type, this.slug)
    const res = await this.apiService.sendRequest('GET', (this.type === 'tag' ? 'movie/allMoviesByTagSlug/' : 'movie/allMoviesByGenreSlug/') + this.slug + '/500');
    if (res && res.status === 200) {
      const movies = res.body;
      movies[0].genres.map(genre => {
        if (genre.slug === this.slug) {
          this.info = genre;
        }
      })
      this.movies = movies;
    }
  }
}
