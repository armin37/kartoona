import {
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnChanges, OnDestroy, OnInit, PLATFORM_ID, QueryList, ViewChild,
  ViewChildren
} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SnackbarService} from 'src/app/services/snackbar.service';
import {UserService} from 'src/app/services/user.service';
import {SliderService} from 'src/app/services/slider/slider.service';
import {MovieService} from 'src/app/services/movie.service';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {isPlatformBrowser} from '@angular/common';
import {HeaderVariablesService} from 'src/app/services/header-variables.service';


declare const document: any;
declare const window: any;
declare var jwplayer: any;

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, AfterViewInit, OnDestroy {
  isps = [
    {
      src: './assets/img/isp/shatel.png',
      name: 'شاتل'
    }, {
      src: './assets/img/isp/asiatech.png',
      name: 'آسیاتک'
    }, {
      src: './assets/img/isp/download-3.png',
      name: 'حلما گستر'
    }, {
      src: '/assets/img/isp/fanava.png',
      name: 'فناوا'
    }, {
      src: '/assets/img/isp/hamrah.png',
      name: 'همراه اول'
    }, {
      src: '/assets/img/isp/hiweb.png',
      name: 'های وب'
    }, {
      src: '/assets/img/isp/mobinnet.png',
      name: 'مبین نت'
    }, {
      src: '/assets/img/isp/mtn.png',
      name: 'ایرانسل'
    }, {
      src: '/assets/img/isp/ol.png',
      name: 'shatel'
    }, {
      src: '/assets/img/isp/parsonline.png',
      name: 'پارس آنلاین'
    }, {
      src: '/assets/img/isp/pishgaman.png',
      name: 'پیشگامان'
    }, {
      src: '/assets/img/isp/rightel.png',
      name: 'رایتل'
    }
  ];
  movie: any;
  tags: any;
  comment: string;
  slug;
  episode;
  episodeSlug;
  commentList = [];
  suggestionsList = [];
  similarMovies = [];
  commentForm: FormGroup;
  rateForm: FormGroup;
  rate: number = 0;
  ipAddress: any;
  tvUrls = [];
  routerSub;
  showTrailers = false;
  hidePlayer = false;
  @ViewChildren('mainList') mainList: QueryList<ElementRef>;
  current = 10;
  count = 10;
  bookmark = false;

  constructor(private movieService: MovieService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              public userService: UserService,
              public apiService: ApiService,
              private snackBar: SnackbarService,
              public sliderService: SliderService,
              public sanitizer: DomSanitizer,
              private router: Router,
              private cd: ChangeDetectorRef,
              private titleService: Title,
              private headerVariablesService: HeaderVariablesService,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.routerSub = router.events.subscribe((route) => {
      if (route instanceof NavigationEnd) {
        this.slug = '';
        this.setUrl();
      }
    });
  }

  ngOnDestroy() {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.episode = this.route.snapshot.paramMap.get('episode');
    this.episodeSlug = this.route.snapshot.paramMap.get('episode');
    this.getMovieInfo();
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required],
      name: ['', Validators.required],
      email: [''],
      movieId: ['', Validators.required],
      episodeId: ['']
    });
  }

  lastratebyipandmovieid = async () => {
    const body = {
      'rate': this.rate,
      'movieid': this.movie.id,
      'ipAddress': this.ipAddress
    };
    this.rate = await this.movieService.getRateByMovieAndIp(body);
  };

  changePage = (index) => {
    this.current = index;
  };

  ngAfterViewInit(): void {
    // setTimeout(() => this.renderShare(), 3000);
  }

  addToFavorites = async () => {
    this.bookmark = !this.bookmark;
    const fav = await this.movieService.addToFavorites({
      movieId: this.movie.id
    });
  };

  renderShare = () => {
    // if (isPlatformBrowser(this.platformId)) {
    //   window.__sharethis__.initialize();
    //   this.setUrl();
    // }
  };

  setUrl = () => {
    if (isPlatformBrowser(this.platformId)) {
      const buttons = document.getElementsByClassName('sharethis-inline-share-buttons');
      if (buttons && buttons[0]) {
        buttons[0].setAttribute('data-url', window.location.href);
      }
    }
  };

  ngOnChanges() {
  }

  getMovieInfo = async () => {
    this.showTrailers = false;
    let movie = await this.movieService.getMovieBySlug(this.slug);
    let episodeRes;
    if (movie) {
      if (!this.episode && movie.series && movie.seasonsList.length > 0) {
        this.episode = movie.seasonsList[0].data[0].slug;
      }
      if (this.episode) {
        episodeRes = await this.movieService.getEpisode(this.slug, this.episode);
      }
      this.headerVariablesService.setMetaTags(movie);
      this.titleService.setTitle(movie.persian_name);
      const writers = [];
      const directors = [];
      const actors = [];
      movie.movieParticipants.map(person => {
        if (person.movieRoles.slug === 'director') {
          directors.push(person.casts.name);
        }
        if (person.movieRoles.slug === 'writer') {
          writers.push(person.casts.name);
        }
        if (person.movieRoles.slug === 'actor') {
          actors.push(person.casts.name);
        }
      });
      this.bookmark = movie.favorite === 1;
      movie.actors = actors.join(' , ');
      movie.writers = writers.join(' , ');
      movie.directors = directors.join(' , ');
      if (isPlatformBrowser(this.platformId)) {
        movie.url = window.location.href.replace('http://localhost:4200', 'https://kartoona.com');
      }
      // movie.genres = movie.genres.filterFiled('name').join(' , ');
      if (movie.kartoonaRate == 0) {
        movie.kartoonaRateShow = 1;
      }
      //movie.rate = 3;
      // this.tags = movie.tags.filterFiled('name').join(',');
      this.movie = movie;
      if (episodeRes) {
        this.episode = {...episodeRes};
        this.tvUrls = this.episode.urls ? [this.episode.urls] : [];
      } else {
        if (movie.series) {
          this.hidePlayer = true;
        }
        if (movie.urls.mains && movie.urls.mains.length > 0) {
          this.tvUrls = movie.urls.mains && movie.urls.mains.length > 0 ? [movie.urls.mains[0]] : [];
        } else if (movie.urls.trailers && movie.urls.trailers.length > 0) {
          this.showTrailers = true;
          movie.urls.mains = [null];
          this.tvUrls = movie.urls.trailers && movie.urls.trailers.length > 0 ? [movie.urls.trailers[0]] : [];
        } else {
          this.tvUrls = [];
        }
        // this.tvUrls = movie.urls.mains && movie.urls.mains.length > 0 ? movie.urls.mains : [];
        // this.tvUrls = movie.urls.trailers && movie.urls.trailers.length > 0 ? movie.urls.trailers : [];
      }
      this.getSuggestions();
      this.getSimilarMovies();
      this.getComments();
      this.lastratebyipandmovieid();
    }
  };

  getIndex(i) {
    return Number(i + 1).toString();
  }

  changeTVurl = async (url = null) => {
    if (url) {
      this.tvUrls = [url];
    } else {
      if (!this.userService.user) {
        this.router.navigateByUrl('auth?callback=' + this.router.url);//, 2000);
      } else if (!this.movie.urls.mains) {
        this.router.navigateByUrl('pricing?callback=' + this.router.url);//, 2000);
      } else {
        this.tvUrls = this.movie.urls.mains && this.movie.urls.mains.length > 0 ? [this.movie.urls.mains[0]] : [];
      }
    }
  };

  getComments = async () => {
    this.commentList = [];
    this.commentList = await this.movieService.getMovieCommentsBySlug(this.slug, this.episodeSlug);
  };

  getSuggestions = async () => {
    this.suggestionsList = [];
    this.suggestionsList = await this.movieService.getMovieSuggestionBySlug(this.movie.slug);
  };

  getSimilarMovies = async () => {
    this.similarMovies = [];
    this.similarMovies = await this.movieService.getMovieSimilarMoviesBySlug(this.movie.slug);
  };

  savecomment = async () => {
    if (this.userService.user && this.userService.userLoaded) {
      this.commentForm.controls.name.setValue(this.userService.user.first_name + ' ' + this.userService.user.last_name);
    }

    this.commentForm.controls.movieId.setValue(this.movie.id);

    if (this.episodeSlug) {
      this.commentForm.controls.episodeId.setValue(this.episode.id);
    }

    if (this.commentForm.valid) {
      const body = {...this.commentForm.value};
      const res = await this.userService.saveComment(body);
      if (res) {
        this.commentForm.controls.comment.setValue('');
        this.commentForm.controls.email.setValue('');
        this.commentForm.controls.name.setValue('');
        this.snackBar.show('نظر شما با موفقیت ثبت شد و پس از تایید مدیر در سایت قرار خواهد گرفت', '', '', 2000);
      }
    } else {
      this.snackBar.show('وارد کردن نام اجباری است', '', '', 2000);
    }
  };

  saveRate = async () => {
    const body = {
      'rate': this.rate,
      'movieId': this.movie.id
    };
    const res = await this.movieService.saveRate(body);
    if (res) {
      this.snackBar.show('با موفقیت ثبت شد.', '', '', 4000);
    }
  };

  likeDislike = async (action) => {
    const body = {
      'movieId': this.movie.id,
      'action': action,
      'uuid': '5616-6615-6615-1165',
      'seasonId': this.episode?.id ? this.episode.id : '',
    };
    const res = await this.movieService.likeDislike(body);
    if (res) {
      this.snackBar.show('با موفقیت ثبت شد.', '', '', 4000);
    }
  };
}
