import {Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import {BlogService} from 'src/app/services/blog.service';
import {ActivatedRoute} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {SnackbarService} from '../../services/snackbar.service';
import {SliderService} from '../../services/slider/slider.service';
import {HeaderVariablesService} from '../../services/header-variables.service';

declare const window: any;

@Component({
  selector: 'app-blog-single',
  templateUrl: './blog-single.component.html',
  styleUrls: ['./blog-single.component.scss']
})
export class BlogSingleComponent implements OnInit {
  data;
  commentForm: FormGroup;
  commentList = [];
  suggestionsList = [];

  constructor(private blogService: BlogService,
              @Inject(PLATFORM_ID) private platformId: Object,
              private snackBar: SnackbarService,
              public userService: UserService,
              public sliderService: SliderService,
              private formBuilder: FormBuilder,
              private headerVariablesService: HeaderVariablesService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const slug = this.activatedRoute.snapshot.paramMap.get('slug');
    if (slug) {
      this.loadData(slug);
    }

    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required],
      name: ['', Validators.required],
      email: [''],
      itemId: ['', Validators.required],
    });

    setTimeout(() => this.renderShare(), 3000);

  }

  loadData = async (slug) => {
    this.data = await this.blogService.getPostBySlug(slug);
    if (this.data) {
      this.headerVariablesService.setMetaTags(this.data);
      this.loadComments();
      this.loadSuggestedMovies();
    }
  };

  renderShare = () => {
    if (isPlatformBrowser(this.platformId)) {
      window.__sharethis__.initialize();
    }
  };

  loadComments = async () => {
    this.commentList = [];
    this.commentList = await this.blogService.loadCommentsByPostId(this.data.postId);
  };

  savecomment = async () => {
    if (this.userService.user && this.userService.userLoaded) {
      this.commentForm.controls.name.setValue(this.userService.user.first_name + ' ' + this.userService.user.last_name);
    }

    this.commentForm.controls.itemId.setValue(this.data.postId);

    if (this.commentForm.valid) {
      const body = {...this.commentForm.value};
      const res = await this.userService.savePostComment(body);
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

  loadSuggestedMovies = async () => {
    this.suggestionsList = [];
    this.suggestionsList = await this.blogService.loadPostSuggestedMovies(this.data.slug);
  };
}
