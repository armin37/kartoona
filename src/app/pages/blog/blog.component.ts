import {Component, OnInit} from '@angular/core';
import {BlogService} from 'src/app/services/blog.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  data = [];
  suggested = [];
  favouriteTags = [];
  currentPage = 1;
  pageCount = 0;
  tagSlug;
  categorySlug;

  constructor(private blogService: BlogService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.tagSlug = this.activatedRoute.snapshot.paramMap.get('tag-slug');
    this.categorySlug = this.activatedRoute.snapshot.paramMap.get('category-slug');
    this.currentPage = this.activatedRoute.snapshot.paramMap.get('page') ?
      parseInt(this.activatedRoute.snapshot.paramMap.get('page')) : 1;
    //slider-top(suggested)
    this.loadSuggestedPosts();
    this.loadFavouriteTags();

    if (!this.tagSlug && !this.categorySlug) {
      this.loadBlogPosts();
    } else if (this.tagSlug && !this.categorySlug) {
      this.loadBlogPostsByTag();
    } else if (!this.tagSlug && this.categorySlug) {
      this.loadBlogPostsByCategory();
    }
  }

  loadBlogPosts = async () => {
    const res = await this.blogService.allPosts(this.currentPage);
    if (res) {
      this.data = this.data = res.data;
      this.pageCount = res.pageCount;
    }
  };

  loadBlogPostsByTag = async () => {
    console.log('aaaa');
    const res = await this.blogService.loadPostsByTag(this.tagSlug, this.currentPage);
    console.log(res);
    if (res) {
      this.data = this.data = res.data;
      this.pageCount = res.pageCount;
    }
  };

  loadBlogPostsByCategory = async () => {
    const res = await this.blogService.loadPostsByCategory(this.categorySlug, this.currentPage);
    console.log(res);
    if (res) {
      this.data = this.data = res.data;
      this.pageCount = res.pageCount;
    }
  };

  loadFavouriteTags = async () => {
    const res = await this.blogService.loadFavouriteTags();
    console.log(res);
    if (res) {
      this.favouriteTags = res;
    }
  };

  loadSuggestedPosts = async () => {
    const res = await this.blogService.allSuggetedPosts();
    if (res) {
      this.suggested = this.suggested.concat(res);
    }
  };


  changePage = (index) => {
    this.currentPage = index;
    if (!this.tagSlug && !this.categorySlug) {
      this.loadBlogPosts();
    } else if (this.tagSlug && !this.categorySlug) {
      console.log('1');
      this.loadBlogPostsByTag();
    } else if (!this.tagSlug && this.categorySlug) {
      console.log('2');
      this.loadBlogPostsByCategory();
    }
  };
}
