import {Injectable, Inject, PLATFORM_ID} from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private apiService: ApiService,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }


  getMovieBySlug = async (slug) => {
    const res: any = await this.apiService.sendRequest('POST', 'movie/' + slug);
    if (res && res.status === 200) {
      return res.body;
    }
    return null;
  };

  getEpisode = async (slug, episode) => {
    const res: any = await this.apiService.sendRequest('POST', 'movie/' + slug + '/' + episode);
    if (res && res.status === 200) {
      return res.body;
    }
    return null;
  };

  getMovieCommentsBySlug = async (slug, episode) => {
    let url = '';
    if (episode) {
      url = 'movie/allCommentsByMovieSlug/' + slug + '/' + episode;
    } else {
      url = 'movie/allCommentsByMovieSlug/' + slug;
    }
    const res: any = await this.apiService.sendRequest('GET', url);
    if (res && res.status === 200) {
      return res.body;
    }
    return null;
  };

  getMovieSuggestionBySlug = async (slug) => {
    const res: any = await this.apiService.sendRequest('GET', 'movie/allSuggestionsByMovieSlug/' + slug);
    if (res && res.status === 200) {
      return res.body;
    }
    return null;
  };

  getMovieSimilarMoviesBySlug = async (slug) => {
    const res: any = await this.apiService.sendRequest('GET', 'movie/allSimilarMoviesByMovieSlug/' + slug);
    if (res && res.status === 200) {
      return res.body;
    }
    return null;
  };

  saveRate = async (body) => {
    const res: any = await this.apiService.sendRequest('POST', 'movie/saveRate', body);
    if (res && res.status === 200) {
      return true;
    }
    return false;
  };

  getRateByMovieAndIp = async (body) => {
    const res: any = await this.apiService.sendRequest('POST', 'movie/lastratebyipandmovieid', body);
    if (res && res.status === 200) {
      return res.body.rate;
    }
    return 1;
  };

  loadAllPgs = async () => {
    const res: any = await this.apiService.sendRequest('GET', 'movie/allPgs');
    if (res && res.status === 200) {
      return res.body;
    }
    return [];
  };

  loadSliderMovies = async () => {
    const res: any = await this.apiService.sendRequest('GET', 'movie/sliderMovies');
    if (res && res.status === 200) {
      return res.body;
    }
    return [];
  };

  countPageMovies = async (pageId) => {
    const res: any = await this.apiService.sendRequest('GET', 'movie/countSectionsByPageId/' + pageId);
    if (res && res.status === 200) {
      return res.body.count;
    }
    return 0;
  };

  loadMoviesByPageIdAndSortNumber = async (pageId, sortNumber) => {
    const res: any = await this.apiService.sendRequest('GET', 'movie/loadMoviesByPageIdAndSortNumber/' + pageId + '/' + sortNumber);
    if (res && res.status === 200) {
      return res.body;
    }
    return null;
  };

  loadSectionById = async (id) => {
    const res: any = await this.apiService.sendRequest('GET', 'movie/section/' + id);
    if (res && res.status === 200) {
      return res.body;
    }
    return null;
  };

  addToFavorites = async (body) => {
    const res: any = await this.apiService.sendRequest('POST', 'movie/saveFavorites', body);
    if (res && res.status === 200) {
      return res.body;
    }
    return null;
  };

  filterMovies = async (filter, page) => {
    const res: any = await this.apiService.sendRequest('GET', 'movie/allMoviesByFilter/' + filter + '/' + page);
    if (res && res.status === 200) {
      return res.body;
    }
    return null;
  };

  likeDislike = async (body) => {
    const res: any = await this.apiService.sendRequest('POST', 'movie/likeDislike', body);
    if (res && res.status === 200) {
      return res.body;
    }
    return null;
  };
}
