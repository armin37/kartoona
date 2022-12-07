import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-pg',
  templateUrl: './pg.component.html',
  styleUrls: ['./pg.component.scss']
})
export class PgComponent implements OnInit {
  data = [];
  pg;
  current = 1;
  pageCount = 0;
  slug;

  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    let slug = this.activatedRoute.snapshot.paramMap.get('slug');
    this.current = this.activatedRoute.snapshot.paramMap.get('page') ?
      parseInt(this.activatedRoute.snapshot.paramMap.get('page')) : 1;
    if (!this.activatedRoute.snapshot.paramMap.get('page')) {
      this.router.navigateByUrl(this.router.url + '/' + this.current);
    }else
      this.getPgInfo(slug);
  }

  getPgInfo = async (slug) => {
    this.data = [];
    this.pg = null;
    const res_pg = await this.apiService.sendRequest('GET', 'movie/findPgsBySlug/' + slug);
    if (res_pg && res_pg.status === 200) {
      this.pg = res_pg.body;
      if (this.pg) {
        this.getPgMovie();
      }
    }
  }
  getPgMovie = async () => {
    const res = await this.apiService.sendRequest('GET', 'movie/allMoviesByPgsSlugByPage/' + this.pg.slug + '/' + this.current);
    if (res) {
      this.data = res.body.movies;
      this.pageCount = res.body.pageCount;
    }
  }

  changePage = (index) => {
    this.current = index;
    this.getPgMovie();
  }
}
