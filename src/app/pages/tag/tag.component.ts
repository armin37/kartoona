import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {MovieService} from '../../services/movie.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit, OnDestroy {
  data = [];
  tag;
  current = 1;
  pageCount = 0;
  slug;
  routerSub;

  constructor(private activatedRoute: ActivatedRoute,
              private apiService: ApiService,
              private movieService: MovieService,
              private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.routerSub = router.events.subscribe((route) => {
    //   if (route instanceof NavigationEnd) {
    //     this.ngOnInit();
    //   }
    // });
  }

  ngOnDestroy() {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    let slug = this.activatedRoute.snapshot.paramMap.get('slug');
    this.current = this.activatedRoute.snapshot.paramMap.get('page') ?
      parseInt(this.activatedRoute.snapshot.paramMap.get('page')) : 1;
    this.getTagInfo(slug);
  }

  getTagInfo = async (slug) => {
    //avval tag load she agar 200 bood va tag ro bargardoond berizesh to moteghayere tag baed filmash load beshe va too data rikhte beshe
    this.data = [];
    this.tag = null;
    const res_tag = await this.apiService.sendRequest('GET', 'movie/findTagBySlug/' + slug);
    if (res_tag && res_tag.status === 200) {
      this.tag = res_tag.body;
      if (this.tag) {
        this.getTagMovie();
      }
    }
  };
  getTagMovie = async () => {
    const res = await this.apiService.sendRequest('GET', 'movie/allMoviesByTagSlugByPage/' + this.tag.slug + '/' + this.current);
    if (res) {
      this.data = res.body.movies;
      this.pageCount = res.body.pageCount;
    }
  };
  changePage = (index) => {
    this.current = index;
    this.getTagMovie();
  };

}
