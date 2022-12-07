import {Injectable} from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private apiService: ApiService) {
  }

  allPosts = async (page) => {
    const res: any = await this.apiService.sendRequest('GET', 'basic/posts/' + page);
    if (res && res.status === 200) {
      return res.body;
    }
    return null;
  };

  allSuggetedPosts = async () => {
    const res: any = await this.apiService.sendRequest('GET', 'basic/suggestedPosts/100');
    if (res && res.status === 200) {
      return res.body;
    }
    return null;
  };

  getPostBySlug = async (slug) => {
    const res: any = await this.apiService.sendRequest('GET', 'basic/post/' + slug);
    if (res && res.status === 200) {
      return res.body;
    }
    return null;
  };

  loadCommentsByPostId = async (id) => {
    const res: any = await this.apiService.sendRequest('GET', 'basic/post/loadComments/' + id);
    if (res && res.status === 200) {
      return res.body;
    }
    return null;
  };

  loadPostsByTag = async (slug, page) => {
    const res: any = await this.apiService.sendRequest('GET', 'basic/posts/tag/' + slug + '/' + page);
    if (res && res.status === 200) {
      return res.body;
    }
    return null;
  };

  loadPostsByCategory = async (slug, page) => {
    const res: any = await this.apiService.sendRequest('GET', 'basic/posts/category/' + slug + '/' + page);
    if (res && res.status === 200) {
      return res.body;
    }
    return null;
  };

  loadFavouriteTags = async () => {
    const res: any = await this.apiService.sendRequest('GET', 'basic/posts/favouriteTags');
    if (res && res.status === 200) {
      return res.body;
    }
    return null;
  };

  loadPostSuggestedMovies = async (slug) => {
    const res: any = await this.apiService.sendRequest('GET', 'basic/post/suggestedMovies/' + slug);
    if (res && res.status === 200) {
      return res.body;
    }
    return [];
  };
}
